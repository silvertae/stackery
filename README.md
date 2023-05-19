# Stackery

## 개요

- 스크랩 하고싶은 웹페이지를 카테고리 별로 분류해서 저장하고 관리할 수 있는 크롬 확장프로그램

- 주요 기능
  - 확장프로그램을 실행 시 현재 열려있는 웹페이지를 저장할 수 있는 팝업이 열립니다.
  - 타이틀과 카테고리 이름을 정해서 페이지들을 저장해 둘 수 있습니다.
  - 메인 페이지에서는 스크랩한 항목들을 카테고리 별로 찾아보고 선택해서 다시 열어볼 수 있습니다.
  - 여러 항목들을 선택해서 한 번에 링크를 복사해두거나 삭제할 수 있고, 또 새 탭에서 열어볼 수 있습니다.

## DEMO

![stackery-live-demo](https://github.com/silvertae/stackery/assets/76121068/1c043988-ade8-4bde-bf5a-a43fb55c2405)

### 스크린샷

![stackery-demo1](https://github.com/silvertae/stackery/assets/76121068/16d8e341-051f-4df3-b5bf-ecd82ab6083f)

![stackery-demo2](https://github.com/silvertae/stackery/assets/76121068/57081d4b-ad6c-4d2b-af3c-69af484a8669)

## 실행방법

![스크린샷 2023-05-19 오후 3 07 12](https://github.com/silvertae/stackery/assets/76121068/0c068175-0869-44de-abd6-ac01089f4c74)

1. **chrome 확장 프로그램 관리에 들어갑니다.**
2. **우측 상단에 개발자 모드 버튼을 클릭하여 개발자 모드를 실행시켜 줍니다.**
3. **좌측 상단 압축해제된 확장 프로그램 로드를 클릭합니다.**
4. **stackery-extension 폴더를 선택해서 업로드 합니다.**
5. **확장 프로그램에 추가 되었는지 확인 합니다.**
6. **추가가 되었다면 stackery확장 프로그램을 실행시켜 웹페이지에서 Test합니다.**

- 확장 프로그램을 처음 실행 하면 title(제목), category(분류) 을(를) 입력할 수 있는 창이 나타납니다.
- **Scrap화면**
  - **Title(제목)**
    - title 입력 창 에는 자동으로 현재 웹페이지의 h1태그(제목)을 가져오고 h1태그가 비어있다면
      현재 웹페이지의 url을 title에 넣어줍니다.
    - title은(는) 사용자가 작성하여 수정이 가능하며 저장 시 수정한 title로 저장 됩니다.
  - **category(분류)**
    - category입력 창 에는 분류하고 싶은 category를 입력 하여 분류합니다.
    - category입력 창이 비었을 시 미분류로 자동 분류됩니다.
  - **저장**
    - 저장 버튼을 누르면 현재 입력된 Title이 제목이 되며, category에 입력 된 category로 분류되어 저장 됩니다.
    - 저장 된 후에는 자동으로 main화면으로 넘어 갑니다.
  - main화면
    - Scrap화면에서 저장 할 때 작성한 category별로 분류되어 표시됩니다.
      - 각 category 안에는 Title(제목)이

## 라이센스
