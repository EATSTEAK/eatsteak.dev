---
title: 숭실대 u-saint 스크래핑 - 이벤트 처리
description: u-saint에서 버튼을 클릭하면 어떤 일이 일어날까요? u-saint의 이벤트 처리 방법을 알아봅니다.
category: web
thumbnail: ../../assets/u-saint-events/sapeventqueue.png
pubDate: 2025-03-31T00:17:59+09:00
hidden: true
topics:
  - ssu
  - u-saint
  - html
  - parsing
  - scraping
  - rusaint
  - sap
  - events
series: u-saint 스크래핑
internalUpdatedDate: 2025-03-31T00:42:38+09:00
---

**이제 u-saint의 특정 부분만 확실하게 가져올 수 있는 `sap-wd-stableids`를 알아냈습니다. 그렇다면 이제 원하는 정보를 입력하려면 어떻게 해야 할까요? WebDynpro에서 이벤트를 처리하는 방법을 알아보고, 이를 해석 & 모방해 봅시다.**

## 눈만 달렸지, 팔다리는 없는

[앞선 글](/post/u-saint-events/)에서는 `sap-wd-stableids`를 통해 내가 원하는 위치에 있는 요소를 곧바로 가져오는 방법을 알아 봤습니다. 덕분에 u-saint의 내부 정보를 쉽게 가져올 수 있게 되었습니다. 야호!

바로 한번 적용해 봅시다.
![강의시간표 페이지](../../assets/u-saint-events/empty-timetables.png)
> ..?

보여지는 페이지에 접속하고, 여기서 데이터를 가져올 수는 있게 되었지만, 아쉽게도 여러분은 브라우저가 아닌 단순 HTTP 요청만 보내고, HTML을 받아올 수밖에 없다는 점을 잊지 맙시다. 그렇다면 여러분이 이 페이지에서 어떤 일을 할 수 있을까요? 안타깝게도 학년도와 학기 정보 정도밖에 가져올 수 없겠네요.

이제부터가 u-saint 정적 스크래핑의 가장 큰 암초입니다. **과연 버튼을 클릭하면 무슨 일이 일어나고, 이 정보를 어떻게 가져올 수 있을까요?** 이 글이 끝났을 시점에는 정답을 알 수 있겠죠?

## 버튼 뒤에서는 무슨 일이 벌어지는가

그렇다면 우리가 다음으로 해야 할 일은, 브라우저 없이 콤보박스와 버튼을 클릭하는 동작을 모방하는 것입니다. 이렇게 말하니 말도 안되는 일 같기도 합니다. 어떻게 브라우저 없이 콤보박스와 버튼을 클릭할까요?
