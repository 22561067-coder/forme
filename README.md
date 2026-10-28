# FORME

사진 없이 형태와 움직임으로 구성한 순수 HTML/CSS/JavaScript 사이트입니다. React와 외부 JavaScript 라이브러리는 사용하지 않습니다.

## 실행

`index.html`을 브라우저로 열거나, 이 폴더에서 `npm run dev` 실행 후 http://127.0.0.1:5176 접속.
설치할 라이브러리는 없습니다.

## 기능

- 두 줄의 반대 방향 무한 포스터 트랙 (호버/키보드 포커스 시 정지)
- 스크롤 등장, 숫자 카운터, 고정된 아트 프리뷰 전환
- 가로 무드 카드와 이전/다음 컨트롤
- 단일 펼침 FAQ, 반응형 메뉴
- 색상/문구/회전 애니메이션을 조절하는 포스터 스튜디오
- 선택한 포스터 SVG 저장
- 키보드 접근성과 모션 줄이기 설정 대응

Google Fonts가 로드되지 않으면 시스템 폰트를 사용합니다. Squarespace 레퍼런스의 섹션 순서와 인터랙션 배치를 참고하고 독자적인 그래픽과 문구로 구성했습니다.

## GitHub Pages

Repository: https://github.com/22561067-coder/forme

In Settings → Pages, set Source to **GitHub Actions**.
Pushing to `main` automatically publishes the three website files.
No package installation or framework build is required.

Website: https://22561067-coder.github.io/forme/
