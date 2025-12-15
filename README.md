# 🥕 중고거래 플랫폼 (React + Spring Boot)

React SPA 프론트엔드와 Spring Boot REST API 백엔드로 구성된 풀스택 중고거래 플랫폼 프로젝트입니다.

---

## 📋 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [주요 기능](#4-주요-기능)
5. [실행 방법](#5-실행-방법)
6. [API 명세](#6-api-명세)
7. [샘플 데이터](#7-샘플-데이터)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 목표

- **프론트엔드**: React의 주요 개념(Hooks, Props, Routing 등)을 학습하고 완성도 있는 SPA 구현
- **백엔드**: RESTful API 설계 원칙을 학습하고 Spring Boot 기반 REST API 서버 구현
- **풀스택 연동**: 프론트엔드와 백엔드의 완전한 분리 및 연동

### 1.2 주요 특징

- ✅ **RESTful API 설계**: 리소스 중심의 URI, HTTP 메서드 적절한 활용
- ✅ **계층 분리 아키텍처**: Controller → Service → Repository
- ✅ **Entity와 DTO 분리**: 안전한 데이터 전송 및 API 계약 안정성
- ✅ **일관된 에러 처리**: 통일된 응답 형식 및 HTTP 상태 코드
- ✅ **프론트엔드/백엔드 분리**: 독립적 개발, 배포, 확장 가능

---

## 2. 기술 스택

### 2.1 프론트엔드

| 분류 | 기술 | 버전 |
|------|------|------|
| **프레임워크** | React | 19.2.0 |
| **라우팅** | React Router DOM | 7.10.1 |
| **스타일링** | Styled Components | 6.1.19 |
| **상태 관리** | Zustand | 5.0.2 |
| **빌드 도구** | Vite | 7.2.4 |
| **린터** | ESLint | 9.39.1 |

### 2.2 백엔드

| 분류 | 기술 | 버전 |
|------|------|------|
| **언어** | Java | 17 |
| **프레임워크** | Spring Boot | 3.2.0 |
| **데이터베이스** | H2 Database | (인메모리) |
| **ORM** | Spring Data JPA | - |
| **빌드 도구** | Maven | - |
| **유틸리티** | Lombok | - |
| **검증** | Bean Validation | - |

---

## 3. 프로젝트 구조

```
ReactPractice/
│
├── 📁 React-Practice1/                  # 메인 프로젝트 폴더
│   │
│   ├── 📁 backend/                      # Spring Boot REST API 서버
│   │   ├── 📁 src/main/java/com/example/api/
│   │   │   ├── ApiApplication.java          # Spring Boot 메인 클래스
│   │   │   ├── 📁 config/                   # 설정 클래스
│   │   │   ├── 📁 controller/               # REST API 컨트롤러
│   │   │   ├── 📁 service/                   # 비즈니스 로직
│   │   │   ├── 📁 repository/               # 데이터 접근 계층
│   │   │   ├── 📁 entity/                    # JPA 엔티티
│   │   │   ├── 📁 dto/                       # 데이터 전송 객체
│   │   │   └── 📁 exception/                 # 예외 처리
│   │   ├── 📁 src/main/resources/
│   │   │   └── application.yml               # Spring Boot 설정
│   │   ├── pom.xml                           # Maven 의존성
│   │   └── 📄 설계 문서들/                    # API, 도메인, DTO 등 설계 문서
│   │
│   ├── 📁 src/                            # React 프론트엔드 소스
│   │   ├── main.jsx                       # React 진입점
│   │   ├── App.jsx                        # 메인 앱 컴포넌트
│   │   ├── 📁 pages/                      # 페이지 컴포넌트
│   │   ├── 📁 components/                 # 공통 컴포넌트
│   │   ├── 📁 context/                    # React Context
│   │   ├── 📁 hooks/                      # 커스텀 훅
│   │   ├── 📁 store/                      # Zustand 상태 관리
│   │   ├── 📁 utils/                      # 유틸리티 함수
│   │   └── 📁 styles/                      # 전역 스타일
│   │
│   ├── 📁 public/                         # 정적 파일
│   ├── package.json                       # npm 의존성
│   ├── vite.config.js                     # Vite 설정
│   └── eslint.config.js                   # ESLint 설정
│
└── README.md                              # 프로젝트 README (현재 파일)
```

### 3.1 백엔드 구조 (React-Practice1/backend/)

**계층 분리:**
- **Controller**: HTTP 요청/응답 처리, DTO 변환
- **Service**: 비즈니스 로직, 트랜잭션 관리
- **Repository**: 데이터베이스 접근, 쿼리 실행
- **Entity**: 데이터베이스 테이블 매핑
- **DTO**: API 요청/응답 데이터 전송

### 3.2 프론트엔드 구조 (React-Practice1/src/)

**컴포넌트 구조:**
- **pages/**: 라우트별 페이지 컴포넌트
- **components/**: 재사용 가능한 공통 컴포넌트
- **context/**: 전역 상태 관리 (Context API)
- **store/**: 상태 관리 (Zustand)
- **utils/**: 유틸리티 함수

---

## 4. 주요 기능

### 4.1 회원 관리

- ✅ 회원가입 (사용자명, 이메일, 비밀번호, 닉네임)
- ✅ 로그인/로그아웃
- ✅ 내 정보 조회 및 수정
- ✅ 이메일/사용자명 중복 검증

### 4.2 게시글 관리

- ✅ 게시글 목록 조회 (검색, 정렬)
- ✅ 게시글 상세 조회
- ✅ 게시글 작성/수정/삭제
- ✅ 작성자 권한 검증

---

## 5. 실행 방법

### 5.1 사전 요구사항

- **프론트엔드**: Node.js 18 이상, npm 또는 yarn
- **백엔드**: Java 17 이상, Maven 3.6 이상

### 5.2 백엔드 실행

**1. 백엔드 디렉토리로 이동**
```bash
cd React-Practice1/backend
```

**2. Maven 빌드**
```bash
mvn clean install
```

**3. Spring Boot 애플리케이션 실행**
```bash
mvn spring-boot:run
```

**4. 서버 접속 확인**
- API 서버: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (비어있음)

### 5.3 프론트엔드 실행

**1. 프론트엔드 디렉토리로 이동**
```bash
cd React-Practice1
```

**2. 의존성 설치**
```bash
npm install
```

**3. 개발 서버 실행**
```bash
npm run dev
```

**4. 브라우저 접속**
- 프론트엔드: `http://localhost:5173` (Vite 기본 포트)

---

## 6. API 명세

### 공통 응답 형식

모든 API는 다음 형식으로 응답합니다:

**성공 응답:**
```json
{
  "success": true,
  "message": "성공 메시지 (선택사항)",
  "data": { ... }
}
```

**에러 응답:**
```json
{
  "success": false,
  "message": "에러 메시지",
  "data": null
}
```

---

### 6.1 회원 관련 API

#### 회원가입
- **Method**: `POST`
- **URL**: `/api/auth/signup`
- **HTTP 상태 코드**: `201 Created`

**Request Body:**
```json
{
  "username": "minji_kim",
  "email": "minji@example.com",
  "password": "123456",
  "passwordConfirm": "123456",
  "nickname": "민지"
}
```

**Response:**
```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다!",
  "data": {
    "id": 1,
    "username": "minji_kim",
    "email": "minji@example.com",
    "nickname": "민지",
    "createdAt": "2024-01-01T10:00:00",
    "token": "token_xxx"
  }
}
```

---

#### 로그인
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **HTTP 상태 코드**: `200 OK`

**Request Body:**
```json
{
  "email": "minji@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "로그인되었습니다!",
  "data": {
    "id": 1,
    "username": "minji_kim",
    "email": "minji@example.com",
    "nickname": "민지",
    "createdAt": "2024-01-01T10:00:00",
    "token": "token_xxx"
  }
}
```

---

#### 내 정보 조회
- **Method**: `GET`
- **URL**: `/api/users/me`
- **HTTP 상태 코드**: `200 OK`
- **Headers**: `X-User-Id: 1` (필수)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "minji_kim",
    "email": "minji@example.com",
    "nickname": "민지",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

---

#### 내 정보 수정
- **Method**: `PUT`
- **URL**: `/api/users/me`
- **HTTP 상태 코드**: `200 OK`
- **Headers**: `X-User-Id: 1` (필수)

**Request Body:**
```json
{
  "nickname": "민지수정",
  "email": "minji_new@example.com",
  "currentPassword": "123456",
  "newPassword": "newpassword123",
  "newPasswordConfirm": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "정보가 수정되었습니다!",
  "data": {
    "id": 1,
    "username": "minji_kim",
    "email": "minji_new@example.com",
    "nickname": "민지수정",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

---

### 6.2 게시글 관련 API

#### 게시글 목록 조회
- **Method**: `GET`
- **URL**: `/api/posts`
- **HTTP 상태 코드**: `200 OK`
- **Query Parameters**:
  - `search` (optional): 검색어 (제목, 내용)
  - `sort` (optional): 정렬 방식 (`latest`, `oldest`, `priceHigh`, `priceLow`)

**예시:**
- `GET /api/posts`
- `GET /api/posts?search=아이폰&sort=latest`
- `GET /api/posts?sort=priceLow`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "아이폰 13 프로 맥스 판매합니다",
      "content": "아이폰 13 프로 맥스 256GB...",
      "price": 850000,
      "location": "서울시 강남구",
      "image": "https://images.unsplash.com/...",
      "author": 1,
      "authorName": "민지",
      "createdAt": "2024-01-01T10:00:00",
      "updatedAt": "2024-01-01T10:00:00"
    }
  ]
}
```

---

#### 게시글 상세 조회
- **Method**: `GET`
- **URL**: `/api/posts/{id}`
- **HTTP 상태 코드**: `200 OK`

**예시:** `GET /api/posts/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "아이폰 13 프로 맥스 판매합니다",
    "content": "아이폰 13 프로 맥스 256GB 파우 퍼셀 색상입니다...",
    "price": 850000,
    "location": "서울시 강남구",
    "image": "https://images.unsplash.com/...",
    "author": 1,
    "authorName": "민지",
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
}
```

---

#### 게시글 작성
- **Method**: `POST`
- **URL**: `/api/posts`
- **HTTP 상태 코드**: `201 Created`
- **Headers**: `X-User-Id: 1` (필수)

**Request Body:**
```json
{
  "title": "맥북 에어 M2 13인치 판매",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다.\n\n스펙:\n- 칩: Apple M2\n- 메모리: 8GB",
  "price": 1300000,
  "location": "서울시 서초구",
  "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"
}
```

**Response:**
```json
{
  "success": true,
  "message": "게시글이 등록되었습니다!",
  "data": {
    "id": 2,
    "title": "맥북 에어 M2 13인치 판매",
    "content": "맥북 에어 M2 13인치...",
    "price": 1300000,
    "location": "서울시 서초구",
    "image": "https://images.unsplash.com/...",
    "author": 1,
    "authorName": "민지",
    "createdAt": "2024-01-02T10:00:00",
    "updatedAt": "2024-01-02T10:00:00"
  }
}
```

---

#### 게시글 수정
- **Method**: `PUT`
- **URL**: `/api/posts/{id}`
- **HTTP 상태 코드**: `200 OK`
- **Headers**: `X-User-Id: 1` (필수)

**예시:** `PUT /api/posts/1`

**Request Body:**
```json
{
  "title": "맥북 에어 M2 13인치 판매 (가격 인하)",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다.\n\n가격을 인하했습니다.",
  "price": 1200000,
  "location": "서울시 서초구",
  "image": "https://images.unsplash.com/..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "게시글이 수정되었습니다!",
  "data": {
    "id": 1,
    "title": "맥북 에어 M2 13인치 판매 (가격 인하)",
    "content": "맥북 에어 M2 13인치...",
    "price": 1200000,
    "location": "서울시 서초구",
    "image": "https://images.unsplash.com/...",
    "author": 1,
    "authorName": "민지",
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-02T11:00:00"
  }
}
```

---

#### 게시글 삭제
- **Method**: `DELETE`
- **URL**: `/api/posts/{id}`
- **HTTP 상태 코드**: `200 OK`
- **Headers**: `X-User-Id: 1` (필수)

**예시:** `DELETE /api/posts/1`

**Response:**
```json
{
  "success": true,
  "message": "게시글이 삭제되었습니다!",
  "data": null
}
```

---

## 7. 샘플 데이터

### 7.1 백엔드 샘플 데이터

Spring Boot 애플리케이션 시작 시 자동으로 샘플 데이터가 초기화됩니다:

- **사용자 5명**: 민지, 승우, 소연, 동현, 유나
- **게시글 12개**: 다양한 중고거래 게시글

### 7.2 테스트 계정

다음 계정으로 로그인하여 테스트할 수 있습니다:

| 닉네임 | 이메일 | 비밀번호 |
|--------|--------|----------|
| 민지 | minji@example.com | 123456 |
| 승우 | seungwoo@example.com | 123456 |
| 소연 | soyeon@example.com | 123456 |
| 동현 | donghyun@example.com | 123456 |
| 유나 | yuna@example.com | 123456 |

---

## 8. HTTP 상태 코드

| HTTP 상태 코드 | 의미 | 사용 시나리오 |
|---------------|------|--------------|
| **200 OK** | 성공 | 조회, 수정, 삭제 성공 |
| **201 Created** | 생성 성공 | 리소스 생성 성공 (회원가입, 게시글 작성) |
| **400 Bad Request** | 잘못된 요청 | 유효성 검사 실패, 비즈니스 로직 오류 |
| **404 Not Found** | 리소스를 찾을 수 없음 | 존재하지 않는 ID로 조회 |
| **500 Internal Server Error** | 서버 내부 오류 | 예상치 못한 서버 오류 |

---

## 9. RESTful 설계 원칙

본 프로젝트는 다음 RESTful 설계 원칙을 준수합니다:

1. **리소스 중심 URL**: `/api/posts`, `/api/users` (복수형 명사)
2. **HTTP 메서드 활용**: GET(조회), POST(생성), PUT(수정), DELETE(삭제)
3. **계층 구조**: `/api/members/{memberId}/posts` (회원별 게시글 조회 확장 가능)
4. **일관된 응답 형식**: `ApiResponse<T>` 래퍼로 통일
5. **적절한 HTTP 상태 코드**: 200(성공), 201(생성), 400(잘못된 요청), 404(없음)

---

## 10. 참고사항

### 인증 방식
- 현재는 `X-User-Id` 헤더로 사용자 식별 (실제 인증 로직 제외)
- 향후 JWT 또는 세션 기반 인증으로 확장 가능

### 데이터베이스
- H2 인메모리 DB 사용 (재시작 시 데이터 초기화)
- 개발/테스트 목적으로 사용

### CORS 설정
- 프론트엔드 개발 서버(`http://localhost:5173`, `http://localhost:3000`) 허용
- 프로덕션 환경에서는 도메인별로 설정 필요

---

## 11. 추가 문서

백엔드 설계 관련 상세 문서는 `React-Practice1/backend/` 폴더 내에 있습니다:

- `React-Practice1/backend/API_DESIGN.md`: RESTful API 설계 문서
- `React-Practice1/backend/DOMAIN_DESIGN.md`: 도메인 설계 문서
- `React-Practice1/backend/DTO_DESIGN.md`: DTO 설계 문서
- `React-Practice1/backend/HTTP_STATUS_CODE_DESIGN.md`: HTTP 상태 코드 및 에러 처리
- `React-Practice1/backend/PACKAGE_STRUCTURE_DESIGN.md`: 패키지 구조 설계 문서
- `React-Practice1/backend/PRESENTATION_GUIDE.md`: 면접/발표용 설명 가이드

---

## 12. 개발 단계

이 프로젝트는 단계별로 기능을 구현하며 체계적인 Git 커밋을 통해 진행됩니다.

**백엔드 개발 단계:**
1. Spring Boot 프로젝트 초기 설정
2. 엔티티 및 DTO 클래스 구현
3. Repository 레이어 구현
4. Service 레이어 구현
5. Controller 레이어 구현
6. 예외 처리 및 응답 형식 통일
7. 샘플 데이터 초기화

**프론트엔드 개발 단계:**
1. 기본 페이지 구조 및 라우팅
2. 회원가입/로그인 기능
3. 게시판 CRUD 기능
4. 마이페이지 기능
5. 스타일링 및 UI 개선

---

## 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
