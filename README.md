# REST API Server

## 1. 프로젝트 개요

React SPA와 연동하기 위한 Spring Boot 기반 REST API 서버입니다. 중고거래 플랫폼의 회원 관리 및 게시글 관리 기능을 제공합니다.

**주요 특징:**
- RESTful API 설계 원칙 준수
- 계층 분리 아키텍처 (Controller → Service → Repository)
- Entity와 DTO 분리로 안전한 데이터 전송
- 일관된 에러 처리 및 응답 형식

---

## 2. 사용 기술 스택

| 분류 | 기술 |
|------|------|
| **언어** | Java 17 |
| **프레임워크** | Spring Boot 3.2.0 |
| **데이터베이스** | H2 Database (인메모리) |
| **ORM** | Spring Data JPA |
| **빌드 도구** | Maven |
| **유틸리티** | Lombok |
| **검증** | Bean Validation |

---

## 3. 주요 도메인 설명

### 3.1 Member (회원) 도메인

**역할**: 회원 정보 관리 및 인증

**주요 기능:**
- 회원가입 (사용자명, 이메일, 비밀번호, 닉네임)
- 로그인 검증 (이메일/비밀번호)
- 내 정보 조회 및 수정

**특징:**
- 사용자명(username)은 변경 불가 (불변 속성)
- 이메일/사용자명 중복 검증
- 비밀번호는 응답에서 제외

### 3.2 Post (게시글) 도메인

**역할**: 중고거래 게시글 관리

**주요 기능:**
- 게시글 CRUD (생성, 조회, 수정, 삭제)
- 검색 기능 (제목/내용 키워드 검색)
- 정렬 기능 (최신순, 오래된순, 가격 높은순, 가격 낮은순)

**특징:**
- 작성자만 수정/삭제 가능 (권한 검증)
- 작성자 정보 포함 (author, authorName)

---

## 4. API 명세

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

### 4.1 회원 관련 API

#### 4.1.1 회원가입

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
    "token": "token_550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**에러 응답 (400 Bad Request):**
- 이메일/사용자명 중복: `"이미 사용 중인 이메일입니다."` 또는 `"이미 사용 중인 사용자명입니다."`
- 비밀번호 불일치: `"비밀번호가 일치하지 않습니다."`
- 유효성 검사 실패: 필드별 에러 메시지

---

#### 4.1.2 로그인

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
    "token": "token_550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**에러 응답 (400 Bad Request):**
- 로그인 실패: `"이메일 또는 비밀번호가 올바르지 않습니다."`

---

#### 4.1.3 내 정보 조회

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

**에러 응답 (404 Not Found):**
- 사용자 없음: `"사용자를 찾을 수 없습니다."`

---

#### 4.1.4 내 정보 수정

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

**에러 응답 (400 Bad Request):**
- 이메일 중복: `"이미 사용 중인 이메일입니다."`
- 현재 비밀번호 불일치: `"현재 비밀번호가 올바르지 않습니다."`
- 새 비밀번호 불일치: `"새 비밀번호가 일치하지 않습니다."`

---

### 4.2 게시글 관련 API

#### 4.2.1 게시글 목록 조회

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

#### 4.2.2 게시글 상세 조회

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

**에러 응답 (404 Not Found):**
- 게시글 없음: `"게시글을 찾을 수 없습니다."`

---

#### 4.2.3 게시글 작성

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

**에러 응답 (400 Bad Request):**
- 유효성 검사 실패: 필드별 에러 메시지

---

#### 4.2.4 게시글 수정

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

**에러 응답:**
- 404 Not Found: `"게시글을 찾을 수 없습니다."`
- 400 Bad Request: `"수정 권한이 없습니다."` (작성자가 아닌 경우)

---

#### 4.2.5 게시글 삭제

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

**에러 응답:**
- 404 Not Found: `"게시글을 찾을 수 없습니다."`
- 400 Bad Request: `"삭제 권한이 없습니다."` (작성자가 아닌 경우)

---

## 5. 실행 방법

### 5.1 사전 요구사항

- Java 17 이상
- Maven 3.6 이상

### 5.2 빌드 및 실행

**1. 프로젝트 빌드**
```bash
mvn clean install
```

**2. 애플리케이션 실행**
```bash
mvn spring-boot:run
```

또는 JAR 파일 실행:
```bash
java -jar target/api-0.0.1-SNAPSHOT.jar
```

**3. 서버 접속**
- 기본 URL: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (비어있음)

### 5.3 샘플 데이터

애플리케이션 시작 시 자동으로 샘플 데이터가 초기화됩니다:

- **사용자 5명**: 민지, 승우, 소연, 동현, 유나
- **게시글 12개**: 다양한 중고거래 게시글

**샘플 계정 정보:**
- 이메일: `minji@example.com`, `seungwoo@example.com`, `soyeon@example.com`, `donghyun@example.com`, `yuna@example.com`
- 비밀번호: `123456` (모든 계정 동일)

---

## RESTful 설계 원칙

본 프로젝트는 다음 RESTful 설계 원칙을 준수합니다:

1. **리소스 중심 URL**: `/api/posts`, `/api/users` (복수형 명사)
2. **HTTP 메서드 활용**: GET(조회), POST(생성), PUT(수정), DELETE(삭제)
3. **계층 구조**: `/api/members/{memberId}/posts` (회원별 게시글 조회 확장 가능)
4. **일관된 응답 형식**: `ApiResponse<T>` 래퍼로 통일
5. **적절한 HTTP 상태 코드**: 200(성공), 201(생성), 400(잘못된 요청), 404(없음)

---

## 참고사항

- **인증 방식**: 현재는 `X-User-Id` 헤더로 사용자 식별 (실제 인증 로직 제외)
- **데이터베이스**: H2 인메모리 DB 사용 (재시작 시 데이터 초기화)
- **CORS**: 프론트엔드 개발 서버(`http://localhost:5173`, `http://localhost:3000`) 허용
