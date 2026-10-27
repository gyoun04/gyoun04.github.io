# 임가연 디자인 포트폴리오

제공된 `임가연.48P.pdf`의 페이지를 원본 순서대로 보여주는 정적 포트폴리오입니다. 현재 원본은 빈 두 번째 페이지가 빠진 47페이지 버전입니다. HTML·CSS·JavaScript만 사용하며 빌드나 외부 라이브러리는 필요하지 않습니다.

## 보기

`index.html`을 브라우저로 열거나 프로젝트 폴더에서 다음을 실행합니다.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

http://localhost:8000 에서 확인할 수 있습니다. 페이지 선택 메뉴로 원하는 페이지로 이동하고, ‘맨 위로’로 처음으로 돌아갑니다. JavaScript를 꺼도 모든 작품을 스크롤해서 볼 수 있습니다.

## 구성

- `index.html`: 순서대로 배치한 47페이지와 페이지 이동 메뉴
- `css/style.css`: 원본 비율 유지, 화면 너비 대응, 동작 줄이기 지원
- `js/main.js`: 페이지 이동과 현재 페이지 표시
- `images/portfolio/`: 페이지별 960px·1920px·2880px JPEG와 페이지 정보
- `scripts/render-portfolio.swift`: macOS의 PDFKit을 이용한 이미지 변환 도구

첫 페이지는 우선 로딩하고 나머지는 브라우저의 지연 로딩을 사용합니다. 각 이미지에 크기를 지정해 로딩 전에도 공간을 확보합니다. 모바일에서 작은 글씨는 브라우저 확대 기능으로 볼 수 있습니다. PDF의 문자는 이미지에 포함되므로 웹에서 텍스트 검색·선택은 지원하지 않습니다.

화면 너비와 픽셀 밀도에 맞는 이미지를 선택하며, 최대 2880px로 변환하고 JPEG 품질을 96%로 설정해 변환 과정의 손실을 줄였습니다. 원본 페이지의 구도·비율·여백은 유지합니다. PDF에 이미 낮은 해상도로 포함된 사진의 세부 정보는 고해상도 변환만으로 복원되지 않습니다. 사진 개선에는 고해상도 사진이 포함된 PDF가 필요합니다.

## PDF 교체

원본 PDF는 로컬에 보관하며 Git에서 제외합니다. macOS에서 프로젝트 폴더를 연 뒤 아래를 실행하면 이미지를 다시 만들 수 있습니다.

```sh
CLANG_MODULE_CACHE_PATH=/tmp/portfolio-swift-cache swift -module-cache-path /tmp/portfolio-swift-cache scripts/render-portfolio.swift '임가연.48P.pdf'
```

페이지 수나 비율이 달라지면 `index.html`의 이미지 목록·크기·페이지 선택 메뉴도 함께 수정하세요. PDF 변환은 갱신 시 한 번만 필요하며 GitHub Pages에서는 별도 빌드를 하지 않습니다.

## 배포

저장소: https://github.com/gyoun04/gyoun04.github.io

GitHub Pages 주소: https://gyoun04.github.io/

저장소 Settings → Pages에서 main 브랜치의 /(root)를 배포하도록 설정합니다. 모든 리소스는 상대 경로를 사용합니다.
