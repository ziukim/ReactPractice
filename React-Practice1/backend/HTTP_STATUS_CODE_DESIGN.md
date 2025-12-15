# HTTP 상태 코드 및 에러 처리 설계 문서

## 설계 원칙

- **RESTful 원칙 준수**: HTTP 상태 코드를 의미에 맞게 사용
- **일관된 응답 형식**: 모든 응답은 `ApiResponse<T>` 형식으로 통일
- **명확한 에러 메시지**: 클라이언트가 문제를 이해하고 해결할 수 있도록 구체적인 메시지 제공
- **보안 고려**: 민감한 정보는 에러 메시지에 포함하지 않음

---

## 1. 정상 조회 / 생성 / 수정 / 삭제

### 1.1 정상 조회 (GET)

**HTTP 상태 코드**: `200 OK`

**사용 시나리오:**
- 리소스 조회 성공 시
- 리소스 목록 조회 성공 시
- 검색/정렬 결과 반환 시

**Response 예시:**

**단일 리소스 조회:**
```json
{
  "success": true,
  "data": {
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
}
```

**리소스 목록 조회:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "아이폰 13 프로 맥스 판매합니다",
      "price": 850000,
      "authorName": "민지",
      "createdAt": "2024-01-01T10:00:00"
    },
    {
      "id": 2,
      "title": "맥북 에어 M2 판매",
      "price": 1300000,
      "authorName": "승우",
      "createdAt": "2024-01-02T10:00:00"
    }
  ]
}
```

**빈 목록 조회:**
```json
{
  "success": true,
  "data": []
}
```

---

### 1.2 정상 생성 (POST)

**HTTP 상태 코드**: `201 Created`

**사용 시나리오:**
- 새로운 리소스 생성 성공 시
- 회원가입 성공 시
- 게시글 작성 성공 시

**Response 예시:**

**회원가입 성공:**
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

**게시글 작성 성공:**
```json
{
  "success": true,
  "message": "게시글이 등록되었습니다!",
  "data": {
    "id": 1,
    "title": "맥북 에어 M2 판매",
    "content": "맥북 에어 M2 13인치...",
    "price": 1300000,
    "location": "서울시 서초구",
    "image": "https://images.unsplash.com/...",
    "author": 1,
    "authorName": "민지",
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2014-01-01T10:00:00"
  }
}
```

---

### 1.3 정상 수정 (PUT / PATCH)

**HTTP 상태 코드**: `200 OK`

**사용 시나리오:**
- 리소스 수정 성공 시
- 전체 수정(PUT) 성공 시
- 부분 수정(PATCH) 성공 시

**Response 예시:**

**회원 정보 수정 성공:**
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

**게시글 수정 성공:**
```json
{
  "success": true,
  "message": "게시글이 수정되었습니다!",
  "data": {
    "id": 1,
    "title": "맥북 에어 M2 판매 (가격 인하)",
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

### 1.4 정상 삭제 (DELETE)

**HTTP 상태 코드**: `200 OK`

**사용 시나리오:**
- 리소스 삭제 성공 시
- 게시글 삭제 성공 시

**Response 예시:**

**게시글 삭제 성공:**
```json
{
  "success": true,
  "message": "게시글이 삭제되었습니다!",
  "data": null
}
```

**참고사항:**
- 일부 REST API 설계에서는 삭제 시 `204 No Content`를 사용하기도 하지만, 
  본 프로젝트에서는 일관된 응답 형식을 위해 `200 OK`와 메시지를 반환합니다.

---

## 2. 요청 데이터 검증 실패

### 2.1 Bean Validation 실패

**HTTP 상태 코드**: `400 Bad Request`

**사용 시나리오:**
- 필수 필드 누락
- 필드 형식 오류 (이메일 형식, 패턴 불일치 등)
- 필드 길이 제한 위반
- 숫자 범위 위반

**Response 예시:**

**단일 필드 오류:**
```json
{
  "success": false,
  "message": "유효성 검사 실패",
  "data": {
    "email": "올바른 이메일 형식이 아닙니다."
  }
}
```

**다중 필드 오류:**
```json
{
  "success": false,
  "message": "유효성 검사 실패",
  "data": {
    "username": "사용자명은 3자 이상이어야 합니다.",
    "email": "올바른 이메일 형식이 아닙니다.",
    "password": "비밀번호는 6자 이상이어야 합니다.",
    "nickname": "닉네임은 2자 이상이어야 합니다."
  }
}
```

**패턴 불일치 오류:**
```json
{
  "success": false,
  "message": "유효성 검사 실패",
  "data": {
    "username": "사용자명은 영문, 숫자, 언더스코어만 사용할 수 있습니다."
  }
}
```

**필수 필드 누락:**
```json
{
  "success": false,
  "message": "유효성 검사 실패",
  "data": {
    "title": "제목을 입력해주세요.",
    "content": "내용을 입력해주세요."
  }
}
```

---

### 2.2 비즈니스 로직 검증 실패

**HTTP 상태 코드**: `400 Bad Request`

**사용 시나리오:**
- 비밀번호와 비밀번호 확인 불일치
- 이메일/사용자명 중복
- 현재 비밀번호 불일치
- 권한 부족 (작성자가 아닌 사용자의 수정/삭제 시도)

**Response 예시:**

**비밀번호 불일치:**
```json
{
  "success": false,
  "message": "비밀번호가 일치하지 않습니다.",
  "data": null
}
```

**이메일 중복:**
```json
{
  "success": false,
  "message": "이미 사용 중인 이메일입니다.",
  "data": null
}
```

**사용자명 중복:**
```json
{
  "success": false,
  "message": "이미 사용 중인 사용자명입니다.",
  "data": null
}
```

**로그인 실패:**
```json
{
  "success": false,
  "message": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "data": null
}
```

**권한 부족:**
```json
{
  "success": false,
  "message": "수정 권한이 없습니다.",
  "data": null
}
```

**현재 비밀번호 불일치:**
```json
{
  "success": false,
  "message": "현재 비밀번호가 올바르지 않습니다.",
  "data": null
}
```

---

## 3. 존재하지 않는 리소스 조회

### 3.1 리소스를 찾을 수 없음

**HTTP 상태 코드**: `404 Not Found`

**사용 시나리오:**
- 존재하지 않는 게시글 ID로 조회 시
- 존재하지 않는 회원 ID로 조회 시
- 삭제된 리소스 조회 시

**Response 예시:**

**게시글을 찾을 수 없음:**
```json
{
  "success": false,
  "message": "게시글을 찾을 수 없습니다.",
  "data": null
}
```

**회원을 찾을 수 없음:**
```json
{
  "success": false,
  "message": "사용자를 찾을 수 없습니다.",
  "data": null
}
```

**경로를 찾을 수 없음:**
```json
{
  "success": false,
  "message": "요청한 리소스를 찾을 수 없습니다.",
  "data": null
}
```

---

## 4. 잘못된 요청 형식

### 4.1 잘못된 JSON 형식

**HTTP 상태 코드**: `400 Bad Request`

**사용 시나리오:**
- JSON 파싱 오류
- JSON 문법 오류
- 필수 필드 타입 불일치

**Response 예시:**

**JSON 파싱 오류:**
```json
{
  "success": false,
  "message": "요청 본문의 JSON 형식이 올바르지 않습니다.",
  "data": null
}
```

**타입 불일치:**
```json
{
  "success": false,
  "message": "유효성 검사 실패",
  "data": {
    "price": "가격은 숫자로 입력해주세요."
  }
}
```

---

### 4.2 잘못된 HTTP 메서드

**HTTP 상태 코드**: `405 Method Not Allowed`

**사용 시나리오:**
- 지원하지 않는 HTTP 메서드 사용 시
- 예: GET 엔드포인트에 POST 요청

**Response 예시:**

**메서드 불일치:**
```json
{
  "success": false,
  "message": "허용되지 않은 HTTP 메서드입니다.",
  "data": null
}
```

---

### 4.3 잘못된 Content-Type

**HTTP 상태 코드**: `415 Unsupported Media Type`

**사용 시나리오:**
- JSON이 아닌 형식으로 요청 시
- Content-Type 헤더 누락 또는 잘못된 값

**Response 예시:**

**Content-Type 오류:**
```json
{
  "success": false,
  "message": "지원하지 않는 미디어 타입입니다. application/json을 사용해주세요.",
  "data": null
}
```

---

### 4.4 필수 헤더 누락

**HTTP 상태 코드**: `400 Bad Request`

**사용 시나리오:**
- `X-User-Id` 헤더 누락 (인증이 필요한 API)
- 필수 헤더 값이 비어있음

**Response 예시:**

**헤더 누락:**
```json
{
  "success": false,
  "message": "X-User-Id 헤더가 필요합니다.",
  "data": null
}
```

---

## 5. 서버 내부 오류

### 5.1 서버 내부 오류

**HTTP 상태 코드**: `500 Internal Server Error`

**사용 시나리오:**
- 예상치 못한 서버 오류
- 데이터베이스 연결 오류
- 처리되지 않은 예외 발생

**Response 예시:**

**서버 오류:**
```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다.",
  "data": null
}
```

**주의사항:**
- 상세한 에러 정보는 클라이언트에 노출하지 않음 (보안)
- 서버 로그에만 상세 정보 기록

---

## HTTP 상태 코드 요약표

| HTTP 상태 코드 | 의미 | 사용 시나리오 |
|---------------|------|--------------|
| **200 OK** | 성공 | 조회, 수정, 삭제 성공 |
| **201 Created** | 생성 성공 | 리소스 생성 성공 (회원가입, 게시글 작성) |
| **400 Bad Request** | 잘못된 요청 | 유효성 검사 실패, 비즈니스 로직 오류, JSON 파싱 오류, 헤더 누락 |
| **404 Not Found** | 리소스를 찾을 수 없음 | 존재하지 않는 ID로 조회, 삭제된 리소스 조회 |
| **405 Method Not Allowed** | 허용되지 않은 메서드 | 지원하지 않는 HTTP 메서드 사용 |
| **415 Unsupported Media Type** | 지원하지 않는 미디어 타입 | 잘못된 Content-Type |
| **500 Internal Server Error** | 서버 내부 오류 | 예상치 못한 서버 오류 |

---

## 에러 처리 흐름도

```
요청 수신
    ↓
[1] HTTP 메서드 검증
    ↓ (실패) → 405 Method Not Allowed
[2] Content-Type 검증
    ↓ (실패) → 415 Unsupported Media Type
[3] JSON 파싱
    ↓ (실패) → 400 Bad Request (JSON 파싱 오류)
[4] Bean Validation
    ↓ (실패) → 400 Bad Request (유효성 검사 실패)
[5] 비즈니스 로직 검증
    ↓ (실패) → 400 Bad Request (비즈니스 로직 오류)
[6] 리소스 존재 확인
    ↓ (실패) → 404 Not Found
[7] 권한 검증
    ↓ (실패) → 400 Bad Request (권한 부족)
[8] 처리 수행
    ↓ (성공) → 200 OK / 201 Created
    ↓ (실패) → 500 Internal Server Error
```

---

## 에러 응답 형식 통일

모든 에러 응답은 다음 형식을 따릅니다:

```json
{
  "success": false,
  "message": "에러 메시지",
  "data": null 또는 { "field": "에러 메시지" }
}
```

**필드 설명:**
- `success`: 항상 `false`
- `message`: 사용자에게 표시할 에러 메시지
- `data`: 
  - `null`: 단일 에러 메시지인 경우
  - 객체: 필드별 에러 메시지인 경우 (유효성 검사 실패)

---

## 예외 처리 구현 예시

### GlobalExceptionHandler 구조

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // 400 Bad Request - 유효성 검사 실패
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(...)
    
    // 400 Bad Request - 비즈니스 로직 오류
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(...)
    
    // 404 Not Found - 리소스를 찾을 수 없음
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(...)
    
    // 500 Internal Server Error - 서버 오류
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(...)
}
```

---

## 클라이언트 측 에러 처리 가이드

### 성공 응답 처리
```javascript
if (response.success) {
  // 성공 처리
  const data = response.data;
}
```

### 에러 응답 처리
```javascript
if (!response.success) {
  // 단일 에러 메시지
  if (!response.data) {
    alert(response.message);
  }
  // 필드별 에러 메시지
  else {
    Object.keys(response.data).forEach(field => {
      console.error(`${field}: ${response.data[field]}`);
    });
  }
}
```

---

## 보안 고려사항

1. **민감한 정보 노출 방지**
   - 데이터베이스 오류 메시지는 클라이언트에 노출하지 않음
   - 스택 트레이스는 서버 로그에만 기록

2. **일관된 에러 메시지**
   - 인증 실패 시 구체적인 정보 제공하지 않음
   - 예: "이메일 또는 비밀번호가 올바르지 않습니다." (어느 것이 틀렸는지 명시하지 않음)

3. **에러 로깅**
   - 모든 에러는 서버 로그에 기록
   - 클라이언트에는 사용자 친화적인 메시지만 제공

---

## 참고사항

- **204 No Content**: 본 프로젝트에서는 사용하지 않음 (일관된 응답 형식을 위해)
- **401 Unauthorized**: 인증 로직이 없으므로 사용하지 않음
- **403 Forbidden**: 권한 부족은 400 Bad Request로 처리
- **409 Conflict**: 중복 리소스는 400 Bad Request로 처리 (비즈니스 로직 오류)

