---
title: Rust 라이브러리에서 오류 구현하기
description: Rust는 독특한 오류 처리 시스템을 가지고 있습니다. Rust 라이브러리 에서는 어떤 방식으로 오류를 설계해야 할까요? rusaint를 만들면서 배운 Rust 라이브러리 오류 구현의 Best practice를 알아봅니다.
category: rust
pubDate: 2024-06-24T13:05:00+09:00
hidden: true
topics:
  - Rust
  - Error
  - rusaint
---

**Rust 언어에서는 언어의 논리를 따라 다른 언어와 다른 방식의 오류 구현을 채택하고 있습니다. 이를 보완하기 위해 `thiserror`나 `anyhow`와 같은 오류 처리의 편리함을 더해주는 라이브러리들이 존재하는데요. 이런 라이브러리들은 쉽게 오류를 처리할 때 유용하지만, 외부에 배포하기 위한 API가 포함된 라이브러리의 경우엔 어떤 방식으로 오류를 구현하고, 처리해야 할까요? [rusaint](https://github.com/eatsteak/rusaint)를 개발하면서 얻은 시행착오와 함께, 러스트 오류 구현의 모범 답안은 무엇인지 함께 알아봅시다.**

## Rust의 오류 처리
러스트의 오류 처리는 기존 언어들이 주로 채택하는 `try-catch-finally`문으로 대표되는 예외 처리를 통하지 않고, `panic!` 매크로와 `Result<T, E>`라는 열거형의 반환을 통해 이루어집니다. 이는 치명적인 오류가 아닌 함수의 오류 또한 반환 값의 타입으로 강제하여 함수의 반환 값 뿐만 아니라 