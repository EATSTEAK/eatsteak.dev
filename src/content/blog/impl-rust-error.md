---
title: Rust 라이브러리에서 오류 구현하기
description: Rust 라이브러리는 어떤 방식으로 오류를 설계해야 할까요? rusaint를 만들며 배운 Best practice를 알아봅니다.
category: rust
pubDate: 2024-06-24T13:05:00+09:00
hidden: true
topics:
  - Rust
  - Error
  - rusaint
  - anyhow
  - thiserror
internalUpdatedDate: 2024-12-08T01:11:40+09:00
---

**Rust 언어에서는 언어의 논리를 따라 다른 언어와 다른 방식의 오류 구현을 채택하고 있습니다. 이를 보완하기 위해 `thiserror`나 `anyhow`와 같은 오류 처리의 편리함을 더해주는 라이브러리들이 존재하는데요. 이런 라이브러리들은 쉽게 오류를 처리할 때 유용하지만, 외부에 배포하기 위한 API가 포함된 라이브러리의 경우엔 어떤 방식으로 오류를 구현하고, 처리해야 할까요? [rusaint](https://github.com/eatsteak/rusaint)를 개발하면서 얻은 시행착오와 함께, 러스트 오류 구현의 모범 답안은 무엇인지 함께 알아봅시다.**

## Rust의 오류 처리

러스트의 오류 처리는 기존 언어들이 주로 채택하는 `try-catch-finally`문으로 대표되는 예외 처리를 통하지 않고, `panic!` 매크로와 `Result<T, E>`라는 열거형의 반환을 통해 이루어집니다. 이는 치명적인 오류가 아닌 함수의 오류 또한 반환 값의 타입으로 강제하여 함수의 반환 값 뿐만 아니라 오류까지 안전하게 처리할 수 있도록 해 줍니다.

```kotlin
fun im_exceptional(): Int {
  // 오류가 발생하면 이 메소드 바깥에서 `try-catch`문으로 잡을 수 있습니다.
  return "숫자".toInt()
}

fun main() {
  // 메소드에서 오류가 발생할 것이 예상될 경우,
  // 이를 try 문으로 감싸면 함수가 실패해도 계속 구문이 실행됩니다.
  try {
    im_exceptional()
  } catch(e: NumberFormatException) {
    // 예상되는 오류에 대한 적절한 처리를 catch 문으로 작성합니다.
    System.err.println("숫자로 변환할 수 없음")
  }
  im_exceptional()
  // java.lang.NumberFormatException: For input string: "숫자"
}
```

```rust
fn im_result(): Result<i32, ParseIntError> {
  "숫자".parse()
}

fn main() {
  // 치명적이지 않은 오류는 Result 형태로 반환되며,
  // 다양한 방법으로 결과 값을 가져올 수 있습니다.
  let result: Result<i32, ParseIntError> = im_result();
  // if-let 패턴 매칭을 이용해 결과를 가져옵니다.
  if let Ok(success_result) = result {
    println!("{}", success_result);
  } else if let Err(ParseIntError(err)) = result {
    eprintln!("숫자로 변환할 수 없음");
  }
  // 처리하지 않을 오류는 .unwrap()를 사용하여 실패시 Panic을 일으킵니다.
  im_result().unwrap()
  // thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: ParseIntError { kind: InvalidDigit }'
}
```

### 하지만... 너무 복잡한걸요...

이렇게 비교적 안전한 오류 처리는 함수가 반환하는 값 뿐만 아니라 오류 또한 명시적이라는 큰 장점이 있지만, 프로그램을 작성하는 프로그래머의 관점에서는 귀찮은 일일 수 있습니다. 아래의 예를 봅시다.

```rust
fn im_int_result(str: &str): Result<i32, ParseIntError> {
  str.parse()
}

fn im_float_result(str: &str): Result<f32, ParseFloatError> {
  str.parse()
}

// 뭘 반환해야 하지..?
fn multiparse_string(): Result<f32, ??> {
  // `?` 연산자는 Result<T, E>가 Ok일 경우 대상 함수나 변수가 T로 변하고,
  // Err일 경우 E를 반환하고 함수를 종료합니다.
  Ok(im_int_result("숫자")? + im_float_result("숫자.숫자")?)
}
```

이렇게 여러 타입의 오류를 반환해야 하는 경우, 어떤 오류를 반환해야 할까요? 보통 이렇게 합니다:

```rust
pub enum MultiparseError {
  Int,
  Float,
}

// fn im_int_result ...

fn multiparse_string(): Result<f32, MultiparseError> {
  Ok(im_int_result("숫자").map_err(|_e| MultiparseError::Int)? + im_float_result("숫자.숫자").map_err(|_e| MultiparseError::Float)?)
}
```

이렇게 함수에서 반환될 수 있는 오류들을 모두 표현하는 하나의 열거형 오류를 만든 뒤, 이를 반환하는 방법으로 안전하게 오류를 처리할 수 있습니다.

> 사실 위 예시처럼 단순히 열거형 구현만 하는 경우는 거의 없고, 대부분 `std::error::Error`, `std::fmt::Debug` 와 `std::fmt::Display`같은 디버깅에 필요한 트레이트들을 추가로 구현하게 됩니다.

### 구원자: `thiserror`와 `anyhow`

이렇게 직접 오류를 구현하는 일은 많은 불편함을 야기합니다. 오류 열거형을 만들고, 그 안의 추가 정보를 새 오류 열거형으로 옮기고... 귀찮습니다. 그래서 나온 것들이 `anyhow`와 `thiserror`라이브러리 입니다.

```rust
// fn im_int_result ...

fn multiparse_string(): anyhow::Result<f32> {
  Ok(im_int_result("숫자")? + im_float_result("숫자.숫자")?)
}
```

`anyhow`는 모든 오류(`impl Error`인 struct 혹은 enum)을 `anyhow::Error`로 바꾸어 편하게 오류를 처리할 수 있게 해 줍니다.
여러 오류 종류를 구분할 필요가 없는 내부 코드의 경우 간편하게 사용할 수 있습니다.

```rust
#[derive(thiserror::Error)]
pub enum MultiparseError {
  #[error(transparent)]
  Int(#[from] ParseIntError),
  #[error(transparent)]
  Float(#[from] ParseFloatError)
}

fn multiparse_string(): anyhow::Result<f32, MultiparseError> {
  Ok(im_int_result("숫자")? + im_float_result("숫자.숫자")?)
}
```

`thiserror`는 새로운 오류 열거형을 만들 때 기존 오류를 새로운 오류로 변환하는 과정을 편하게 해 줍니다. 굳이 `map_err`와 같은 오류 변환을 하지 않아도, `?` 연산자의 기능을 이용해 자동으로 변환해 주죠.

기본적인 러스트 오류 처리는 프로그래머에게 불편하지만, 안전한 설계라는 이점이 있고, 그리고 이런 불편함을 여러 라이브러리들이 채워주어 `anyhow` 나 `thiserror`와 같은 크레이트는 오류 처리에 필수적인 라이브러리가 되었습니다.

## Rust 라이브러리에서의 오류 처리

그렇다면, 여러분이 라이브러리의 개발자이고, API에서 반환하는 오류를 구성해야 한다고 생각해 봅시다. 우리는 어떤 오류를 어떻게 반환해야 할까요? 그냥 `anyhow`를 쓰면 안 될까요? `anyhow` 크레이트는 오류에 대한 자동 변환, 오류 트레이트 구현, 백트레이스 등 다양한 기능을 지원하지만, 최종 사용자가 개발자와 다른 라이브러리의 경우 정확한 오류 정보를 제공해야 하므로 `thiserror`를 통해 개발자가 직접 정의한 오류를 반환해 주는 것이 바람직합니다.

> Use Anyhow if you don't care what error type your functions return, you just want it to be easy. This is common in application code. Use thiserror if you are a library that wants to design your own dedicated error type(s) so that on failures the caller gets exactly the information that you choose.
>
> - anyhow README, [Comparison to thiserror](https://github.com/dtolnay/anyhow?tab=readme-ov-file#comparison-to-thiserror)

## 나만의 오류 타입 만들기

여러분의 라이브러리엔 어떤 오류가 발생하나요? 원본 오류를 전달한다면, 어떤 형태로 변형해서 전달해야 할까요? 어떤 정보를 포함해야 할까요? 이 점을 염두에 두고, 오류를 구현하면서 유의해야 할 점과 주요 오류 구현 패턴들을 확인해 봅시다.

> 오류의 요구 사항들은 [API Guidelines](https://rust-lang.github.io/api-guidelines/interoperability.html#error-types-are-meaningful-and-well-behaved-c-good-err)의 `C-GOOD-ERR` 단락을 참고하고, 많은 라이브러리에서 채택하고 있는 예시를 결합하여 작성했습니다.

### 명확한 분류의 오류는 `Enum`으로

Rust에서 대부분의 오류는 열거형을 통해 표현됩니다. 대부분 오류는 종류가 있고, 같은 오류의 범주 내이지만 종류에 따라 알리고자(표현하고자)하는 것이 크게 다르기 때문이죠. 위의 예시의 오류 구현을 살펴봅시다.

```rust
#[derive(thiserror::Error)]
pub enum MultiparseError {
  Int(#[from] ParseIntError),
  Float(#[from] ParseFloatError)
}
```

이 오류의 경우는 int와 float에 대한 변환을 하나의 오류 타입으로 처리할 수 있도록 두 분류의 오류가 만들어져 있습니다. 이런 경우처럼 오류가 나는 특정 경우가 정해져 있고, 경우가 서로 겹치지 않는다면 열거형을 활용하여 오류를 표현하는 것이 좋습니다.

### 다양한 오류를 담아야 한다면?

컴파일 타입에서 어떤 오류가 표현될지 알 수 없는 경우가 있습니다. 예를 들어 `Box<dyn Error + Send + Sync>`처럼 동적으로 오류가 담기는 컨테이너를 사용하거나 한다면 위처럼 열거형으로 오류를 표현하는 것이 적절하지 않을 수 있습니다.

```rust
pub enum ErrorKind {
  Unexpected,
  Other,
}
pub struct DynamicError<E> where E: Into<Box<dyn Error + Send + Sync>> {
  kind: ErrorKind,
  error: E
}
```

> 모든 오류를 감싸는 wrapper를 만들고 싶을 때
