---
title: 숭실대 u-saint 파싱하기 - 기본 구조 파악하기
description: 숭실대 u-saint를 파싱하는 효율적인 방법은 무엇일까요? 직접 u-saint를 뜯으면서 알아봅시다.
category: web
pubDate: 2024-08-20 01:41:58
hidden: true
topics:
  - ssu
  - u-saint
  - html
  - parsing
  - scraping
---
**숭실대 u-saint 학사 시스템은 SAP에서 제작한 솔루션을 사용하고 있습니다. u-saint가 가진 불편함(반응형 미지원, 느린 속도, 이상한 스크롤 등...) 때문에 많은 학생들이 이를 쉽게 열람하기 위해 파싱하고자 하였고, 최근 들어 [SSUrade](https://github.com/nnnlog/ssurade)나 [숨쉴때 성적표](https://apps.apple.com/kr/app/%EC%88%A8%EC%89%B4%EB%95%8C-%EC%84%B1%EC%A0%81%ED%91%9C/id1601044486) 등 그 결과물이 학생들에게 실제로 도움이 되는 형태로 나타나고 있습니다. 이 글에선 [rusaint](https://github.com/eatsteak/rusaint)를 개발하며 알아낸 u-saint 구조를 공유하고자 합니다. 이를 토대로 앞으로 많은 학우들이 숭실대 학교 생활에 필요한 서비스를 만들어내길 기대하겠습니다.**

## u-saint 페이지의 실체 알아내기
숭실대학교 [u-saint](https://saint.ssu.ac.kr) 페이지는 어떤 웹 페이지일까요? 뭐가 되었든 굉장히 불편하다는 점은 확실합니다. 몇가지 예를 들어 봅시다:

![[double-scroll.png]]