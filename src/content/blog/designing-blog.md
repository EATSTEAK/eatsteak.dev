---
title: 블로그 구축하기 - 디자인 결정
description: 이 블로그를 구축하면서 고려했던 디자인적 결정에 대해 이야기 나눠 봅니다.
category: web
pubDate: 2024-06-15T17:05:00+09:00
hidden: true
topics:
  - Blog
  - Metaposting
  - Design
  - UX
  - CSS
  - Typography
---
**[앞의 글](/post/constructing-blog)에서 어떤 기술 스택으로 블로그를 만들지 결정했으니, 이젠 어떤 모습의 블로그를 만들지 결정해야 합니다. 사실 제 닉네임이 EATSTEAK(스테이크 먹기)인 만큼 블로그 컨셉을 생각하기는 쉬웠는데요. 하지만 모든 디자인이 예쁘기만 하다고 다 되는 것이 아니듯, 단순한 UI나 컨셉 뿐만 아니라 블로그 본연의 역할에 충실하도록 여러 고려를 하고자 노력했습니다.**

## 디자인 컨셉: 불판
처음에 제 블로그에 대한 구상을 시작했을 때, 제 활동명이 고기인 만큼 고기를 굽는 불판을 모티브로 디자인하고자 노력했습니다. 그 모티브를 바탕으로 Figma를 통해 간단한 목업을 구상했고, 이를 가지고 실제 블로그 웹 사이트를 퍼블리싱하였습니다.

<img src="/images/designing-blog/prototype.png" alt="블로그 디자인 프로토타입" />

> _최초로 피그마에서 완성한 프로토타입입니다. 두가지 시안 중 고민하다 현재의 디자인으로 결정했습니다._

처음에 잡은 *불판*이라는 컨셉이 프로그램하고는 잘 연결되지 않는 편이라, 불판(정확히는 석쇠)의 형태를 가져와 격자와 각진 이미지의 UI 엘리먼트를 디자인했습니다.

개인적으로 조금 더 모티브를 활용해 디자인하였다면 좋지 않을까 싶은데, 당장은 큰 아이디어가 떠오르지 않네요.

## 서체 선택
이 블로그에서는 세가지 서체를 사용합니다. 라틴 제목용 글꼴인 [Jost](https://fonts.google.com/specimen/Jost)와, 본문용 글꼴인 [Noto Sans KR(Korean)](https://fonts.google.com/noto/specimen/Noto+Sans+KR), 그리고 고정폭, 일부 UI 엘리먼트에 사용되는 글꼴인 [Monoplex KR](https://github.com/y-kim/monoplex)입니다.

### 모던함을 더한 Jost

`Jost` 서체는 1920년대 독일에서 만들어진 [Futura](https://en.wikipedia.org/wiki/Futura_(typeface))에 영감을 받아 만들어진 서체입니다. 영화감독 스탠리 큐브릭이 자주 사용했기로 유명하기도 하고, 모던함의 시초가 되는 Typeface인데, 앞서 말한 불판과 프로그래밍의 연결 고리가 약하단 점을 좀 더 모던한 이미지를 통해 보강하기 위해 선택했습니다. 제가 큐브릭 영화들을 좋아하는 것도 조금은 있고요.

![2001: A Space Odyssey 포스터에서 사용된 Futura 서체](/images/designing-blog/space-odyssey.png)

> 스탠리 큐브릭 감독의 1968년작 영화 _2001: A Space Odyssey_ 의 메인 포스터에 사용된 Futura 서체. <sup>[출처](https://en.wikipedia.org/wiki/File:2001_A_Space_Odyssey_(1968).png)</sup>

다만 Jost 서체의 형태가 대문자 `J`가 소문자처럼 디센더로 디자인되어 있거나, 너무 높은 weight에 가면 `V`와 같은 예리한 각도의 글자체들이 너무 날카롭게 디자인되어 있다 보니 베이스라인이 정렬되어 있지 않아 보이는 경우가 있습니다. 그래서 제목용 서체나 디자인적인 요소에만 주로 이 서체를 이용하고, 가독성이 요구되는(글 본문 혹은 글자가 주 정보 전달원인 UI 요소) 요소의 경우 다른 서체를 이용하고자 했습니다.

### 국밥같은 Noto Sans
본문 서체로 선택한 `Noto Sans KR`은 굳이 채용한 이유를 묻지 않아도 알 것입니다. 다만 _왜 않 Pretendard임?_ 라고 묻는 사람이 있을 것 같아서, 이에 대한 부연을 조금 하고자 합니다.

![Noto Sans KR의 예시 문장](/images/designing-blog/notokr.png)
> _16px 기준 `Noto Sans KR`로 본 예시 문장._

![Pretendard의 예시 문장](/images/designing-blog/pretendard.png)
> _16px 기준 `Pretendard`로 본 예시 문장._ 어떤 폰트가 더 읽기 편해 보이는가요?

조금 뒤에서도 설명하겠지만, 보통 웹페이지의 내용을 읽을 때 좋은 크기인 16px 기준으로 두 폰트의 예시 문장([Pretendard 소개 웹사이트](https://cactus.tistory.com/306)에서 발췌)을 비교해 보았을 때, 개인적인 느낌으로는 Pretendard보다는 Noto Sans KR이 읽기 측면에서 조금 더 낫다고 판단했습니다.

Pretendard의 경우 전체적인 글리프의 균일성을 중시한다고 생각합니다. 자간과 글리프 크기도 Noto Sans KR에 비해 좁고 작게 설정되어 있으니까요.

> 본고딕의 한글 크기가 대부분의 한글 글꼴들과 비슷하게 다국어 타이포그래피 환경에서는 조금 크게 자리잡아 라틴 글자와 섞어쓸 때 글자 비율을 어느정도 조정해서 쓰는 점이 제품을 만드는 데 어느정도 부채가 쌓이는 상황이라 보았고, 이처럼 적합하지 않은 글꼴로부터 생기는 추가적인 소요를 줄이자는 데에서 이 프로젝트를 2020년 11월부터 천천히 다듬어왔다. 
> - [Pretendard 소개](https://cactus.tistory.com/306)에서.

그러다 보니 Pretendard는 UI 측면에서는 꽤나 훌륭한 글꼴이지만, 균일된 글리프 크기가 읽기 중심의 블로그에는 답답한 느낌이 계속 들었습니다.

그래서 개인적으로는 가독성을 위한 선택이라면 _Noto가 맞지 않나?_ 라는 생각이 들었고, 최종적으로 Pretendard 대신 Noto Sans KR을 선택한 것입니다.


### 포인트 서체, Monoplex KR
`Monoplex KR` 서체는 `IBM Plex Sans KR`의 한글 글리프에 `IBM Plex Mono`의 고정폭 라틴 글리프를 조합하고 조정한 오픈 소스 폰트입니다. 제가 코딩할 때 주로 애용하는 폰트인 만큼, 제 블로그에도 적용하기로 했습니다(_코딩할 때 어떤 고정폭 폰트가 좋냐_ 라는 논쟁엔 끼지 않겠습니다).

이 폰트는 마치 컬러 시스템의 액센트 컬러처럼 UI 엘리먼트 사이의 차별점을 주고, 텍스트 위주의 엘리먼트(토픽 태그, 다크 모드 스위치 라벨 등)에 주로 사용함으로써 포인트 서체처럼 활용하고자 했습니다. 물론 코드 블록에서도 고정폭 글꼴로써 본래 역할을 하기도 합니다.

## 로고 디자인
<img src="/images/logo.png" style="background-color: #ddd; padding: 16px;" alt="블로그 로고"/>

> _블로그 로고입니다. 왼쪽 상단에서 항상 볼 수 있습니다._

로고는 앞서 말한 석쇠를 형상화하고, 블로그 주소(eatsteak.dev)를 같이 담았습니다. 글자가 마치 불판 위에 떠있는 느낌을 주려고 했는데, 잘 되었는지 모르겠네요.

## 가장 중요한 것: 가독성
블로그는 내가 쓴 글을 읽게 만들기 위한 사이트입니다. 따라서 잘 읽히는 것이 무엇보다 중요합니다. 
가독성을 위해서는 타이포그라피부터 레이아웃까지 사소하지만 신경써야 할 것들이 있습니다.

### 가독성을 위한 타이포그라피
웹 디자인에서 글꼴과 문단 배치는 가장 기본적인 것이면서도 중요한 것입니다. 몇줄의 CSS만 있으면 쉽게 글의 가독성을 향상시킬 수 있습니다.
```css
// 글꼴 크기 및 줄 간격 설정
font-size: clamp(1rem, 0.957rem + 0.217vw, 1.125rem);
line-height: clamp(1.5, 1.413 + 0.435vw, 1.75);
// 문장 길이를 위한 최대 길이 설정
max-width: 75ch;

// 합자
text-rendering: optimizeLegibility;

// 폰트 안티엘리어싱
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

// (한국어)단어 줄 넘김 방지
word-break: keep-all;
```

#### 글꼴 크기와 줄 간격: `font-size`와 `line-height`
글꼴 크기는 가독성의 가장 중요한 요소 중 하나입니다. 브라우저의 기본 글꼴 크기는 `16px`인데요. 일반적으로 16px는 데스크톱 환경에서 읽기에 권장되는 글꼴 크기의 마지노선으로 여겨지고 있습니다.[^1]

대부분의 읽기 중심 사이트에서는 16-20px 범위 내에서 글꼴 크기를 크게 설정하는 것을 권장하고 있고,[^2] 글꼴의 종류, 기기에 따라 적절히 읽기 편한 크기를 설정하는 것이 좋다고 이야기합니다.

또한 줄 간격(`line-height`)는 데스크톱 기준 `1.5`에서 `2`사이의 간격을 설정하여(모바일에서는 `1.3`에서 `1.5` 정도가 적당합니다) 너무 간격이 넓어 글이 눈에 잘 들어오지 않도록 하거나, 너무 좁아 답답해 보이지 않도록 하는 것이 좋습니다.

사실 이 글꼴 크기와 줄 간격만 잘 설정하면 가독성을 위한 대부분의 작업은 끝났다고 생각하면 됩니다. 다시 말하면 그만큼 가독성에 중요한 설정이라는 뜻이죠.

#### `clamp()`: 동적 글꼴 크기를 위한 적절한 연산자


[^1]: [PimpMyType, What's the right font size in web design?, 21. Sep 2021](https://pimpmytype.com/font-size/) 등 다양한 사이트, 논문에서 적어도 16px 이상을 데스크톱 웹 사이트의 폰트 크기로 하기를 권장합니다.

[^2]: 각주 [^1]의 웹사이트는 물론이고, [Luz Rello, Martin Pielot and Mari-Carmen Marcos, Make It Big! The Effect of Font Size and Line Spacing on Online Readability, 2016](https://pielot.org/pubs/Rello2016-Fontsize.pdf) 와 같은 논문에서도 18px를 가장 적절한 폰트 크기로 권장하고 있습니다.