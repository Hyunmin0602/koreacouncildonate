# DonateDS - 후원 인증서 조회 시스템

대한학생회 후원 인증서를 안전하게 조회할 수 있는 Next.js 애플리케이션입니다.

## 주요 기능

- 🔍 후원 인증번호로 인증서 조회
- 🔐 암호화된 URL로 보안 강화
- 📊 Google Sheets 연동
- 📱 반응형 디자인
- 🎨 QR 코드 생성

## 기술 스택

- Next.js 16.1.0 (App Router)
- TypeScript
- Tailwind CSS
- Google Sheets API
- AES-256 암호화

## 환경 설정

1. `.env.example` 파일을 복사하여 `.env.local` 생성:
   ```bash
   cp .env.example .env.local
   ```

2. `.env.local` 파일에 실제 값 입력:
   - `GOOGLE_SHEET_ID`: Google Sheets 문서 ID
   - `GOOGLE_CLIENT_EMAIL`: 서비스 계정 이메일
   - `GOOGLE_PRIVATE_KEY`: 서비스 계정 비공개 키
   - `ENCRYPTION_KEY`: 암호화 키 (32자 이상)

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 포트 지정 실행
npm run dev -- -p 3001
```

개발 서버: http://localhost:3000 (또는 지정한 포트)

## Vercel 배포

1. GitHub 저장소에 푸시
2. Vercel에서 프로젝트 import
3. Environment Variables에 `.env.local`의 변수들 추가
4. Deploy 버튼 클릭

## Google Sheets 설정

인증서 데이터는 다음 형식으로 Google Sheets에 저장되어야 합니다:

| A (인증서 코드) | B (이름) | C (내용) | D (후원구분) | E (발급기관) | F (후원일) |
|----------------|---------|---------|-------------|-------------|-----------|
| 1              | 홍길동   | ...     | 개인        | 대한학생회   | 2024-12-19 |

- 시트 이름: **시트1** (한글)
- 범위: A:F

## 보안

- 인증번호는 AES-256-CBC로 암호화되어 URL에 표시됩니다
- `.env.local` 파일은 절대 Git에 커밋하지 않습니다
- Vercel의 Environment Variables를 사용하여 안전하게 배포합니다

## 라이선스

Private - 대한학생회
