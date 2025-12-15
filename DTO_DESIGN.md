# DTO 설계 문서

## 설계 원칙

- **요청과 응답은 모두 JSON 형식**
- **Entity를 직접 반환하지 않고 DTO만 사용**
- **회원(Member), 게시글(Post) 각각에 대해 DTO 분리**
- **요청(Request)과 응답(Response) DTO 분리**

---

## 1. 회원 관련 DTO 목록

### 1.1 회원가입 요청 DTO (SignupRequest)

**용도**: 회원가입 시 클라이언트에서 서버로 전송하는 데이터

**필드 목록:**

| 필드명 | 타입 | 제약조건 | 필수 여부 | 역할 |
|--------|------|----------|-----------|------|
| `username` | String | 3자 이상, 영문/숫자/언더스코어만 | 필수 | 사용자명 (고유값, 변경 불가) |
| `email` | String | 이메일 형식 | 필수 | 이메일 주소 (고유값) |
| `password` | String | 6자 이상 | 필수 | 비밀번호 |
| `passwordConfirm` | String | - | 필수 | 비밀번호 확인 (password와 일치해야 함) |
| `nickname` | String | 2자 이상 | 필수 | 닉네임 (표시용 이름) |

**JSON 예시:**
```json
{
  "username": "minji_kim",
  "email": "minji@example.com",
  "password": "123456",
  "passwordConfirm": "123456",
  "nickname": "민지"
}
```

**유효성 검증:**
- `username`: 영문, 숫자, 언더스코어만 허용 (`^[a-zA-Z0-9_]+$`)
- `email`: 이메일 형식 검증
- `password`: 최소 6자 이상
- `passwordConfirm`: `password`와 일치 여부 확인 (서버 측 검증)

---

### 1.2 로그인 요청 DTO (LoginRequest)

**용도**: 로그인 시 클라이언트에서 서버로 전송하는 데이터

**필드 목록:**

| 필드명 | 타입 | 제약조건 | 필수 여부 | 역할 |
|--------|------|----------|-----------|------|
| `email` | String | 이메일 형식 | 필수 | 로그인할 이메일 주소 |
| `password` | String | - | 필수 | 로그인할 비밀번호 |

**JSON 예시:**
```json
{
  "email": "minji@example.com",
  "password": "123456"
}
```

**유효성 검증:**
- `email`: 이메일 형식 검증
- `password`: 비어있지 않아야 함

---

### 1.3 회원 응답 DTO

#### 1.3.1 인증 응답 DTO (AuthResponse)

**용도**: 회원가입 또는 로그인 성공 시 반환하는 데이터 (토큰 포함)

**필드 목록:**

| 필드명 | 타입 | 필수 여부 | 역할 |
|--------|------|----------|------|
| `id` | Long | 필수 | 회원 고유 ID |
| `username` | String | 필수 | 사용자명 |
| `email` | String | 필수 | 이메일 주소 |
| `nickname` | String | 필수 | 닉네임 |
| `createdAt` | LocalDateTime | 필수 | 회원가입 일시 |
| `token` | String | 필수 | 인증 토큰 (클라이언트에서 세션 관리용) |

**JSON 예시:**
```json
{
  "id": 1,
  "username": "minji_kim",
  "email": "minji@example.com",
  "nickname": "민지",
  "createdAt": "2024-01-01T10:00:00",
  "token": "token_550e8400-e29b-41d4-a716-446655440000"
}
```

**주의사항:**
- `password`는 보안상 응답에 포함하지 않음
- `token`은 클라이언트에서 세션 관리에 사용 (실제 인증 로직은 제외)

---

#### 1.3.2 회원 정보 응답 DTO (UserResponse)

**용도**: 회원 정보 조회 시 반환하는 데이터 (토큰 제외)

**필드 목록:**

| 필드명 | 타입 | 필수 여부 | 역할 |
|--------|------|----------|------|
| `id` | Long | 필수 | 회원 고유 ID |
| `username` | String | 필수 | 사용자명 (변경 불가) |
| `email` | String | 필수 | 이메일 주소 |
| `nickname` | String | 필수 | 닉네임 |
| `createdAt` | LocalDateTime | 필수 | 회원가입 일시 |

**JSON 예시:**
```json
{
  "id": 1,
  "username": "minji_kim",
  "email": "minji@example.com",
  "nickname": "민지",
  "createdAt": "2024-01-01T10:00:00"
}
```

**사용 시나리오:**
- `GET /api/members/me` - 내 정보 조회
- `PUT /api/members/me` - 내 정보 수정 후 응답
- `PATCH /api/members/me` - 내 정보 수정 후 응답

---

#### 1.3.3 회원 정보 수정 요청 DTO (UserUpdateRequest)

**용도**: 회원 정보 수정 시 클라이언트에서 서버로 전송하는 데이터

**필드 목록:**

| 필드명 | 타입 | 제약조건 | 필수 여부 | 역할 |
|--------|------|----------|-----------|------|
| `nickname` | String | 2자 이상 | 필수 | 수정할 닉네임 |
| `email` | String | 이메일 형식 | 필수 | 수정할 이메일 주소 |
| `currentPassword` | String | - | 선택 | 현재 비밀번호 (비밀번호 변경 시 필수) |
| `newPassword` | String | 6자 이상 | 선택 | 새 비밀번호 (비밀번호 변경 시 필수) |
| `newPasswordConfirm` | String | - | 선택 | 새 비밀번호 확인 (비밀번호 변경 시 필수) |

**JSON 예시 (닉네임과 이메일만 수정):**
```json
{
  "nickname": "민지수정",
  "email": "minji_new@example.com"
}
```

**JSON 예시 (비밀번호 변경 포함):**
```json
{
  "nickname": "민지",
  "email": "minji@example.com",
  "currentPassword": "123456",
  "newPassword": "newpassword123",
  "newPasswordConfirm": "newpassword123"
}
```

**유효성 검증:**
- `nickname`: 최소 2자 이상
- `email`: 이메일 형식 검증
- 비밀번호 변경 시:
  - `currentPassword` 필수
  - `newPassword` 최소 6자 이상
  - `newPassword`와 `newPasswordConfirm` 일치 확인 (서버 측 검증)

**주의사항:**
- `username`은 변경 불가이므로 요청에 포함하지 않음
- 비밀번호 변경은 선택사항 (필드가 없으면 비밀번호 변경하지 않음)

---

## 2. 게시글 관련 DTO 목록

### 2.1 게시글 생성 요청 DTO (PostCreateRequest)

**용도**: 게시글 작성 시 클라이언트에서 서버로 전송하는 데이터

**필드 목록:**

| 필드명 | 타입 | 제약조건 | 필수 여부 | 역할 |
|--------|------|----------|-----------|------|
| `title` | String | 2자 이상 | 필수 | 게시글 제목 |
| `content` | String | 10자 이상 | 필수 | 게시글 내용 |
| `price` | Long | 0 이상 | 선택 | 판매 가격 (원 단위) |
| `location` | String | - | 선택 | 거래 희망 지역 |
| `image` | String | URL 형식 | 선택 | 상품 이미지 URL |

**JSON 예시:**
```json
{
  "title": "맥북 에어 M2 13인치 판매",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다.\n\n스펙:\n- 칩: Apple M2\n- 메모리: 8GB\n- 저장공간: 256GB\n\n2023년 6월 구매했고, 중고급 개발용으로만 사용했습니다.\n상태 매우 양호합니다.",
  "price": 1300000,
  "location": "서울시 서초구",
  "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"
}
```

**JSON 예시 (최소 필수 필드만):**
```json
{
  "title": "아이폰 판매",
  "content": "아이폰 13 프로 맥스 판매합니다. 상태 좋습니다."
}
```

**유효성 검증:**
- `title`: 최소 2자 이상
- `content`: 최소 10자 이상
- `price`: 숫자이고 0 이상 (null 허용)
- `image`: URL 형식 (null 허용)

**주의사항:**
- `author`와 `authorName`은 서버에서 자동 설정 (요청에 포함하지 않음)
- `createdAt`과 `updatedAt`은 서버에서 자동 설정

---

### 2.2 게시글 수정 요청 DTO (PostUpdateRequest)

**용도**: 게시글 수정 시 클라이언트에서 서버로 전송하는 데이터

**필드 목록:**

| 필드명 | 타입 | 제약조건 | 필수 여부 | 역할 |
|--------|------|----------|-----------|------|
| `title` | String | 2자 이상 | 필수 | 수정할 게시글 제목 |
| `content` | String | 10자 이상 | 필수 | 수정할 게시글 내용 |
| `price` | Long | 0 이상 | 선택 | 수정할 판매 가격 (원 단위, null 가능) |
| `location` | String | - | 선택 | 수정할 거래 희망 지역 (null 가능) |
| `image` | String | URL 형식 | 선택 | 수정할 상품 이미지 URL (null 가능) |

**JSON 예시 (전체 필드 수정 - PUT):**
```json
{
  "title": "맥북 에어 M2 13인치 판매 (가격 인하)",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다.\n\n가격을 인하했습니다.\n\n스펙:\n- 칩: Apple M2\n- 메모리: 8GB\n- 저장공간: 256GB",
  "price": 1200000,
  "location": "서울시 서초구",
  "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"
}
```

**JSON 예시 (일부 필드만 수정 - PATCH):**
```json
{
  "price": 1100000
}
```

**JSON 예시 (가격을 null로 설정):**
```json
{
  "title": "맥북 에어 M2 13인치 판매",
  "content": "맥북 에어 M2 13인치 스페이스 그레이 판매합니다.",
  "price": null,
  "location": "서울시 서초구",
  "image": null
}
```

**유효성 검증:**
- `title`: 최소 2자 이상
- `content`: 최소 10자 이상
- `price`: 숫자이고 0 이상 (null 허용)
- `image`: URL 형식 (null 허용)

**주의사항:**
- PUT 요청 시: 모든 필수 필드(`title`, `content`) 포함 필요
- PATCH 요청 시: 수정할 필드만 포함 가능
- `author`와 `authorName`은 수정 불가 (요청에 포함하지 않음)
- `updatedAt`은 서버에서 자동 업데이트

---

### 2.3 게시글 응답 DTO (PostResponse)

**용도**: 게시글 조회 시 서버에서 클라이언트로 반환하는 데이터

**필드 목록:**

| 필드명 | 타입 | 필수 여부 | 역할 |
|--------|------|----------|------|
| `id` | Long | 필수 | 게시글 고유 ID |
| `title` | String | 필수 | 게시글 제목 |
| `content` | String | 필수 | 게시글 내용 |
| `price` | Long | 선택 | 판매 가격 (원 단위, null 가능) |
| `location` | String | 선택 | 거래 희망 지역 (null 가능) |
| `image` | String | 선택 | 상품 이미지 URL (null 가능) |
| `author` | Long | 필수 | 작성자 회원 ID |
| `authorName` | String | 필수 | 작성자 닉네임 (조회 성능 최적화) |
| `createdAt` | LocalDateTime | 필수 | 게시글 작성 일시 |
| `updatedAt` | LocalDateTime | 필수 | 게시글 수정 일시 |

**JSON 예시:**
```json
{
  "id": 1,
  "title": "아이폰 13 프로 맥스 판매합니다",
  "content": "아이폰 13 프로 맥스 256GB 파우 퍼셀 색상입니다.\n\n구매일: 2023년 3월\n용량: 256GB\n색상: 파우 퍼셀\n배터리 효율: 88%\n\n사용감이 있지만 전반적으로 상태 좋습니다.",
  "price": 850000,
  "location": "서울시 강남구",
  "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
  "author": 1,
  "authorName": "민지",
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

**JSON 예시 (가격/지역/이미지 없는 경우):**
```json
{
  "id": 2,
  "title": "무료 나눔합니다",
  "content": "사용하지 않는 물건을 나눔합니다. 관심 있으신 분 연락주세요.",
  "price": null,
  "location": null,
  "image": null,
  "author": 2,
  "authorName": "승우",
  "createdAt": "2024-01-02T10:00:00",
  "updatedAt": "2024-01-02T10:00:00"
}
```

**사용 시나리오:**
- `GET /api/posts` - 게시글 목록 조회 (배열로 반환)
- `GET /api/posts/{id}` - 게시글 상세 조회
- `POST /api/posts` - 게시글 작성 후 응답
- `PUT /api/posts/{id}` - 게시글 수정 후 응답
- `PATCH /api/posts/{id}` - 게시글 수정 후 응답
- `GET /api/members/{memberId}/posts` - 회원별 게시글 목록 조회

**주의사항:**
- `author`는 회원 ID만 포함 (회원 전체 정보는 별도 조회 필요)
- `authorName`은 조회 성능 최적화를 위해 포함 (JOIN 없이 바로 표시 가능)
- `price`, `location`, `image`는 선택 필드이므로 null 가능

---

## DTO 사용 흐름도

### 회원 관련 API 흐름

```
회원가입:
클라이언트 → SignupRequest → 서버 → AuthResponse → 클라이언트

로그인:
클라이언트 → LoginRequest → 서버 → AuthResponse → 클라이언트

내 정보 조회:
클라이언트 → (헤더: X-User-Id) → 서버 → UserResponse → 클라이언트

내 정보 수정:
클라이언트 → UserUpdateRequest → 서버 → UserResponse → 클라이언트
```

### 게시글 관련 API 흐름

```
게시글 작성:
클라이언트 → PostCreateRequest → 서버 → PostResponse → 클라이언트

게시글 목록 조회:
클라이언트 → (Query: search, sort) → 서버 → PostResponse[] → 클라이언트

게시글 상세 조회:
클라이언트 → (Path: {id}) → 서버 → PostResponse → 클라이언트

게시글 수정:
클라이언트 → PostUpdateRequest → 서버 → PostResponse → 클라이언트

게시글 삭제:
클라이언트 → (Path: {id}) → 서버 → (성공 메시지) → 클라이언트
```

---

## 공통 응답 형식 (ApiResponse)

모든 API 응답은 `ApiResponse<T>` 래퍼로 감싸서 반환합니다.

**구조:**
```json
{
  "success": boolean,
  "message": String (optional),
  "data": T (DTO 객체 또는 배열)
}
```

**성공 응답 예시:**
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

**에러 응답 예시:**
```json
{
  "success": false,
  "message": "이미 사용 중인 이메일입니다.",
  "data": null
}
```

**유효성 검증 실패 응답 예시:**
```json
{
  "success": false,
  "message": "유효성 검사 실패",
  "data": {
    "email": "올바른 이메일 형식이 아닙니다.",
    "password": "비밀번호는 6자 이상이어야 합니다."
  }
}
```

---

## DTO 설계 원칙 요약

1. **Entity와 DTO 분리**: Entity는 데이터베이스 구조, DTO는 API 계약
2. **요청/응답 분리**: Request DTO와 Response DTO 명확히 구분
3. **도메인별 분리**: 회원(Member)과 게시글(Post) DTO 분리
4. **유효성 검증**: Bean Validation을 활용한 입력 데이터 검증
5. **보안**: 비밀번호 등 민감 정보는 응답에서 제외
6. **확장성**: 선택 필드는 null 허용으로 유연한 구조

