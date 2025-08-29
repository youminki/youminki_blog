# Youminki Blog - Web

TypeScript + Vite + React + Tailwind CSS로 구축된 현대적인 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📦 설치 및 실행

### 의존성 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

### 프로덕션 빌드

```bash
yarn build
```

### 빌드 미리보기

```bash
yarn preview
```

### 코드 품질 관리

```bash
yarn lint          # ESLint로 코드 검사
yarn lint:fix      # ESLint 오류 자동 수정
yarn format        # Prettier로 코드 포맷팅
yarn format:check  # Prettier 포맷팅 검사
yarn type-check    # TypeScript 타입 검사
```

## 🎨 주요 기능

- **현대적인 UI**: Tailwind CSS를 활용한 반응형 디자인
- **TypeScript**: 타입 안전성을 보장하는 개발 환경
- **Hot Module Replacement**: 빠른 개발 경험
- **Vercel 배포**: 간편한 클라우드 배포

## 🌐 배포

이 프로젝트는 Vercel에 최적화되어 있습니다. GitHub 저장소를 Vercel에 연결하면 자동으로 배포됩니다.

## 📁 프로젝트 구조

```
web/
├── src/
│   ├── App.tsx          # 메인 애플리케이션 컴포넌트
│   ├── main.tsx         # 애플리케이션 진입점
│   ├── index.css        # Tailwind CSS 스타일
│   └── assets/          # 정적 자산
├── public/               # 공개 정적 파일
├── tailwind.config.js    # Tailwind CSS 설정
├── postcss.config.js     # PostCSS 설정
├── vercel.json          # Vercel 배포 설정
└── package.json         # 프로젝트 의존성
```

## 🔧 개발 팁

- `src/App.tsx`를 수정하여 UI를 커스터마이징할 수 있습니다
- Tailwind CSS 클래스를 사용하여 스타일링을 빠르게 적용할 수 있습니다
- TypeScript를 활용하여 타입 안전성을 확보하세요

## �� 라이선스

MIT License
