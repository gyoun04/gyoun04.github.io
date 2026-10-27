# gyon04.github.io

gyoun04의 디자인 포트폴리오. 현재 첫 작업물로 제공된 Figma의 **링커리어 메인 화면**을 HTML · CSS · JavaScript로 구현했습니다. 빌드, 백엔드, DB, 외부 라이브러리 없이 실행됩니다.

## 실행

프로젝트의 `index.html`을 브라우저로 열면 됩니다. 서버가 필요한 경우 프로젝트 폴더에서 다음 명령을 실행합니다.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

그다음 http://localhost:8000 으로 접속합니다.

## 파일 구성

- `index.html`: 검색 헤더, 공고, 일정 달력, 비교 표 구조
- `css/style.css`: Figma 색상·간격·테두리 및 모바일 대응
- `js/main.js`: 시안 예시 데이터와 동작
- `images/`: 추후 원본 로고와 작품 이미지를 넣는 폴더
- `reference/figma-export.css`: 로컬에 보관한 추출 원본. 실행용 CSS가 아닙니다.

## 구현 범위

제공된 1440 × 2966px 메인 프레임의 흰 배경, 하늘색 `#38BDF8`, 연한 배경 `#F4FAFE`, 보라색 `#7C3AED`, 검색창, 마감 공고 5개, MY 패널, 5주 달력, 저장 공고 및 비교 표를 반영했습니다. 작은 화면에서는 일부 영역이 세로로 재배치되고 카드·달력·비교 표는 영역 안에서 가로로 스크롤됩니다.

검색은 화면의 예시 공고를 필터링합니다. 공고 정렬, 스크랩 토글, 달력 접기, 차이점만 보기, 비교 필터 초기화, 메뉴 펼치기를 지원합니다. 로그인·지원·자소서 등 실제 서비스가 필요한 버튼은 시연 안내만 표시합니다. 입력값은 공고 HTML에 삽입하지 않습니다.

공고·날짜·활동 개수는 디자인 예시이며 실제 채용 정보가 아닙니다. 원본 로고·아이콘 이미지와 Pretendard 폰트 파일은 제공되지 않아 텍스트·SVG 및 시스템 글꼴로 대체했습니다. 웹폰트를 별도로 요청하지 않습니다. 원본 이미지가 생기면 `images/`에 넣고 로고 요소를 `img`로 바꿀 수 있습니다. 이미지에는 실제 `width`, `height`, 설명 `alt`를 넣고 `max-width:100%;height:auto`로 비율을 유지하세요.

## 수정

- 색상: `css/style.css`의 `:root` 변수
- 상단 공고: `js/main.js`의 `deadlineJobs`
- 달력 메모: `events` (키는 시안 달력의 칸 번호)
- 저장 공고: `savedJobs`
- 비교 표: `comparisonRows`
- 새 작품: 별도 HTML 페이지를 추가하고 `index.html`에서 상대 경로로 연결할 수 있습니다.

`figma.css`는 원래 맥 클립보드의 binary plist 형식으로 저장된 파일입니다. 로컬 원본은 보존하며 배포 파일에는 포함하지 않습니다. UTF-8로 추출한 참고본도 로컬에 보관합니다.

## GitHub Pages

저장소: https://github.com/gyoun04/gyon04.github.io

현재 저장소 이름은 계정 이름 `gyoun04`와 달리 `gyon04.github.io`입니다. 이 이름을 유지하면 프로젝트 Pages 주소는 **https://gyoun04.github.io/gyon04.github.io/** 입니다. 루트 주소 `https://gyoun04.github.io/`를 쓰려면 저장소 이름을 `gyoun04.github.io`로 변경해야 합니다.

Pages를 켜려면 저장소 **Settings → Pages → Deploy from a branch → main → /(root)** 를 선택합니다. 코드 푸시와 Pages 활성화는 별도이며, 이 작업에서는 저장소 이름과 Pages 설정을 변경하지 않습니다. 모든 정적 리소스는 상대 경로를 사용합니다.
