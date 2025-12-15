# RESTful API 설계 문서

## 설계 원칙

- **URI는 복수형 명사 사용**: `/api/members`, `/api/posts`
- **동사는 URI에 포함하지 않음**: HTTP 메서드로 표현
- **HTTP 메서드 적절한 사용**: GET, POST, PUT, PATCH, DELETE
- **계층 구조 고려**: 확장 가능한 리소스 구조

---

## 1. 회원 관련 API 목록

### 1.1 회원가입
- **Method**: `POST`
- **URL**: `/api/members`
- **설명**: 새로운 회원을 등록합니다. 사용자명, 이메일, 비밀번호, 닉네임을 입력받아 회원을 생성합니다.

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

### 1.2 로그인
- **Method**: `POST`
- **URL**: `/api/members/auth/login`
- **설명**: 이메일과 비밀번호로 로그인을 검증하고, 사용자 정보와 토큰을 반환합니다.

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

**설계 고려사항:**
- `/api/members/auth/login` 구조는 인증 관련 기능을 회원 도메인 하위에 배치하여 확장성을 고려했습니다.
- 향후 로그아웃(`/api/members/auth/logout`), 토큰 갱신(`/api/members/auth/refresh`) 등을 추가할 수 있습니다.

---

### 1.3 내 정보 조회
- **Method**: `GET`
- **URL**: `/api/members/me`
- **설명**: 현재 로그인한 사용자의 정보를 조회합니다. 비밀번호는 응답에서 제외됩니다.

**Headers:**
```
X-User-Id: 1
```

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

### 1.4 내 정보 전체 수정
- **Method**: `PUT`
- **URL**: `/api/members/me`
- **설명**: 현재 로그인한 사용자의 정보를 전체 수정합니다. 모든 필드를 포함해야 합니다.

**Headers:**
```
X-User-Id: 1
```

**Request Body:**
```json
{
  "nickname": "민지수정",
  "email": "minji_new@example.com",
  "currentPassword": "123456",
  "newPassword": "newpassword",
  "newPasswordConfirm": "newpassword"
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

### 1.5 내 정보 부분 수정
- **Method**: `PATCH`
- **URL**: `/api/members/me`
- **설명**: 현재 로그인한 사용자의 정보를 부분 수정합니다. 수정할 필드만 포함하면 됩니다.

**Headers:**
```
X-User-Id: 1
```

**Request Body (예시 1 - 닉네임만 수정):**
```json
{
  "nickname": "민지수정"
}
```

**Request Body (예시 2 - 비밀번호만 변경):**
```json
{
  "currentPassword": "123456",
  "newPassword": "newpassword",
  "newPasswordConfirm": "newpassword"
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
    "email": "minji@example.com",
    "nickname": "민지수정",
    "createdAt": "2024-01-01T10:00:00"
  }
}
```

**설계 고려사항:**
- PUT과 PATCH를 구분하여 사용자가 필요에 따라 선택할 수 있도록 했습니다.
- PUT: 전체 필드 수정 (모든 필드 필수)
- PATCH: 부분 필드 수정 (수정할 필드만 선택)

---

## 2. 게시판 관련 API 목록

### 2.1 게시글 목록 조회
- **Method**: `GET`
- **URL**: `/api/posts`
- **설명**: 게시글 목록을 조회합니다. 검색과 정렬 기능을 지원합니다.

**Query Parameters:**
- `search` (optional): 검색어 (제목, 내용에서 검색)
- `sort` (optional): 정렬 방식
  - `latest` (default): 최신순
  - `oldest`: 오래된순
  - `priceHigh`: 가격 높은순
  - `priceLow`: 가격 낮은순

**예시:**
```
GET /api/posts?search=아이폰&sort=latest
GET /api/posts?sort=priceLow
GET /api/posts
```

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

### 2.2 게시글 상세 조회
- **Method**: `GET`
- **URL**: `/api/posts/{id}`
- **설명**: 특정 게시글의 상세 정보를 조회합니다.

**Path Parameters:**
- `id`: 게시글 ID

**예시:**
```
GET /api/posts/1
```

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

### 2.3 게시글 작성
- **Method**: `POST`
- **URL**: `/api/posts`
- **설명**: 새로운 게시글을 작성합니다. 로그인한 사용자만 작성 가능합니다.

**Headers:**
```
X-User-Id: 1
```

**Request Body:**
```json
{
  "title": "맥북 에어 M2 판매",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다...",
  "price": 1300000,
  "location": "서울시 서초구",
  "image": "https://images.unsplash.com/..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "게시글이 등록되었습니다!",
  "data": {
    "id": 2,
    "title": "맥북 에어 M2 판매",
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

### 2.4 게시글 전체 수정
- **Method**: `PUT`
- **URL**: `/api/posts/{id}`
- **설명**: 게시글의 모든 정보를 수정합니다. 작성자만 수정 가능하며, 모든 필드를 포함해야 합니다.

**Headers:**
```
X-User-Id: 1
```

**Path Parameters:**
- `id`: 게시글 ID

**Request Body:**
```json
{
  "title": "맥북 에어 M2 판매 (수정)",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다. 가격 조정했습니다...",
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
    "id": 2,
    "title": "맥북 에어 M2 판매 (수정)",
    "content": "맥북 에어 M2 13인치...",
    "price": 1200000,
    "location": "서울시 서초구",
    "image": "https://images.unsplash.com/...",
    "author": 1,
    "authorName": "민지",
    "createdAt": "2024-01-02T10:00:00",
    "updatedAt": "2024-01-02T11:00:00"
  }
}
```

---

### 2.5 게시글 부분 수정
- **Method**: `PATCH`
- **URL**: `/api/posts/{id}`
- **설명**: 게시글의 일부 정보만 수정합니다. 작성자만 수정 가능하며, 수정할 필드만 포함하면 됩니다.

**Headers:**
```
X-User-Id: 1
```

**Path Parameters:**
- `id`: 게시글 ID

**Request Body (예시 1 - 가격만 수정):**
```json
{
  "price": 1100000
}
```

**Request Body (예시 2 - 제목과 내용만 수정):**
```json
{
  "title": "맥북 에어 M2 판매 (가격 인하)",
  "content": "가격을 인하했습니다..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "게시글이 수정되었습니다!",
  "data": {
    "id": 2,
    "title": "맥북 에어 M2 판매 (가격 인하)",
    "content": "가격을 인하했습니다...",
    "price": 1100000,
    "location": "서울시 서초구",
    "image": "https://images.unsplash.com/...",
    "author": 1,
    "authorName": "민지",
    "createdAt": "2024-01-02T10:00:00",
    "updatedAt": "2024-01-02T12:00:00"
  }
}
```

**설계 고려사항:**
- PUT과 PATCH를 구분하여 사용자가 필요에 따라 선택할 수 있도록 했습니다.
- PUT: 전체 필드 수정 (모든 필드 필수)
- PATCH: 부분 필드 수정 (수정할 필드만 선택)

---

### 2.6 게시글 삭제
- **Method**: `DELETE`
- **URL**: `/api/posts/{id}`
- **설명**: 게시글을 삭제합니다. 작성자만 삭제 가능합니다.

**Headers:**
```
X-User-Id: 1
```

**Path Parameters:**
- `id`: 게시글 ID

**예시:**
```
DELETE /api/posts/2
```

**Response:**
```json
{
  "success": true,
  "message": "게시글이 삭제되었습니다!",
  "data": null
}
```

---

## 3. 회원별 게시글 조회 API 설계

### 3.1 특정 회원의 게시글 목록 조회
- **Method**: `GET`
- **URL**: `/api/members/{memberId}/posts`
- **설명**: 특정 회원이 작성한 게시글 목록을 조회합니다. 검색과 정렬 기능을 지원합니다.

**Path Parameters:**
- `memberId`: 회원 ID

**Query Parameters:**
- `search` (optional): 검색어 (제목, 내용에서 검색)
- `sort` (optional): 정렬 방식
  - `latest` (default): 최신순
  - `oldest`: 오래된순
  - `priceHigh`: 가격 높은순
  - `priceLow`: 가격 낮은순

**예시:**
```
GET /api/members/1/posts
GET /api/members/1/posts?sort=priceHigh
GET /api/members/1/posts?search=맥북&sort=latest
```

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
    },
    {
      "id": 2,
      "title": "맥북 에어 M2 판매",
      "content": "맥북 에어 M2 13인치...",
      "price": 1300000,
      "location": "서울시 서초구",
      "image": "https://images.unsplash.com/...",
      "author": 1,
      "authorName": "민지",
      "createdAt": "2024-01-02T10:00:00",
      "updatedAt": "2024-01-02T10:00:00"
    }
  ]
}
```

**설계 고려사항:**
- 계층 구조를 활용하여 회원과 게시글의 관계를 명확하게 표현했습니다.
- `/api/members/{memberId}/posts` 구조는 "특정 회원의 게시글"이라는 의미를 직관적으로 전달합니다.
- 향후 확장 가능성:
  - `/api/members/{memberId}/posts/{postId}` - 특정 회원의 특정 게시글 조회
  - `/api/members/me/posts` - 내가 작성한 게시글 조회 (현재 로그인한 사용자)

---

### 3.2 내가 작성한 게시글 목록 조회 (추가 제안)
- **Method**: `GET`
- **URL**: `/api/members/me/posts`
- **설명**: 현재 로그인한 사용자가 작성한 게시글 목록을 조회합니다. 검색과 정렬 기능을 지원합니다.

**Headers:**
```
X-User-Id: 1
```

**Query Parameters:**
- `search` (optional): 검색어 (제목, 내용에서 검색)
- `sort` (optional): 정렬 방식

**예시:**
```
GET /api/members/me/posts
GET /api/members/me/posts?sort=priceHigh
```

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

**설계 고려사항:**
- `/api/members/me/posts`는 `/api/members/{memberId}/posts`의 특수 케이스로, 현재 로그인한 사용자의 게시글을 조회합니다.
- `me`를 사용하여 사용자 ID를 명시적으로 전달하지 않아도 됩니다.

---

## API 설계 요약

### 회원 관련 API
| Method | URL | 설명 |
|--------|-----|------|
| POST | `/api/members` | 회원가입 |
| POST | `/api/members/auth/login` | 로그인 |
| GET | `/api/members/me` | 내 정보 조회 |
| PUT | `/api/members/me` | 내 정보 전체 수정 |
| PATCH | `/api/members/me` | 내 정보 부분 수정 |

### 게시판 관련 API
| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/posts` | 게시글 목록 조회 (검색, 정렬) |
| GET | `/api/posts/{id}` | 게시글 상세 조회 |
| POST | `/api/posts` | 게시글 작성 |
| PUT | `/api/posts/{id}` | 게시글 전체 수정 |
| PATCH | `/api/posts/{id}` | 게시글 부분 수정 |
| DELETE | `/api/posts/{id}` | 게시글 삭제 |

### 회원별 게시글 조회 API
| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/members/{memberId}/posts` | 특정 회원의 게시글 목록 조회 |
| GET | `/api/members/me/posts` | 내가 작성한 게시글 목록 조회 |

---

## 확장 가능한 계층 구조

### 현재 구조
```
/api
  /members
    /me
    /{memberId}
      /posts
  /posts
    /{id}
```

### 향후 확장 가능한 구조 예시
```
/api
  /members
    /me
      /posts
      /profile
      /settings
    /{memberId}
      /posts
      /profile
  /posts
    /{id}
      /comments
      /likes
  /auth
    /login
    /logout
    /refresh
```

**설계 원칙:**
- 리소스 중심의 계층 구조
- 복수형 명사 사용
- 동사는 HTTP 메서드로 표현
- 확장 가능한 구조 고려

