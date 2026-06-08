# OSS Health Checker — Frontend (web app)

React + Vite single-page app for the OSS Health Checker. 사용자가 GitHub 레포지토리
URL을 입력하면 백엔드 분석 API를 호출해 오픈소스 건강도(종합 점수 · 5개 차원 ·
강점/위험 신호 · AI 리포트)를 대시보드로 보여줍니다.

> 프로젝트 전체 소개 · 기능 · 화면 구성은 상위 [`../README.md`](../README.md)를 참고하세요.

## 실행

```bash
npm install
npm run dev        # 개발 서버 → http://localhost:5173
npm run build      # 프로덕션 빌드 → dist/
npm run lint       # ESLint
```

## 환경 변수

`.env.example`를 `.env`로 복사해 사용합니다.

| 변수 | 설명 | 예시 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | 백엔드 API 주소. 빈 문자열이면 same-origin(`/api`)으로 호출해 nginx가 프록시 | `http://localhost:8000` |

## 구조

```
src/
├── main.jsx             # 엔트리 (공유 링크 ?share=<id> 처리, 테마 적용)
├── MainPage.jsx         # 메인 + 5개 차원 소개 + 분석 진입
├── AnalyzePage.jsx      # URL 입력 → 진단 API 호출 → 로딩/에러 → 결과
├── pages/ResultPage.jsx # 결과 대시보드 (레이더 차트·차원 카드·개선 TOP3·AI 리포트·QR·PDF)
├── api/ossHealthApi.js  # 백엔드 통신 (diagnose / result)
└── index.css, theme.css, *.css   # 디자인 토큰 + 라이트/다크 테마
```

## 기술 스택

React 19 · Vite · Chart.js (react-chartjs-2) · qrcode.react · Fetch API ·
Docker + nginx (정적 서빙 + `/api` 리버스 프록시).
