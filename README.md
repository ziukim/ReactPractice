# REST API Server

React SPA와 연동하기 위한 Spring Boot 기반 REST API 서버입니다.

## 기술 스택

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (인메모리)
- Lombok
- Maven

## 실행 방법

### 1. Maven 빌드

```bash
mvn clean install
```

### 2. 애플리케이션 실행

```bash
mvn spring-boot:run
```

또는

```bash
java -jar target/api-0.0.1-SNAPSHOT.jar
```

서버는 기본적으로 `http://localhost:8080`에서 실행됩니다.

## API 엔드포인트

### 인증 (Authentication)

- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인

### 사용자 (User)

- `GET /api/users/me` - 내 정보 조회
- `PUT /api/users/me` - 내 정보 수정

**주의**: 사용자 관련 API는 `X-User-Id` 헤더에 사용자 ID를 포함해야 합니다.

### 게시글 (Post)

- `GET /api/posts` - 게시글 목록 조회 (검색, 정렬 지원)
  - Query Parameters:
    - `search`: 검색어 (제목, 내용)
    - `sort`: 정렬 방식 (`latest`, `oldest`, `priceHigh`, `priceLow`)
- `GET /api/posts/{id}` - 게시글 상세 조회
- `POST /api/posts` - 게시글 작성
- `PUT /api/posts/{id}` - 게시글 수정
- `DELETE /api/posts/{id}` - 게시글 삭제

**주의**: 게시글 작성/수정/삭제 API는 `X-User-Id` 헤더에 사용자 ID를 포함해야 합니다.

## 응답 형식

모든 API는 다음 형식으로 응답합니다:

```json
{
  "success": true,
  "message": "성공 메시지 (선택사항)",
  "data": { ... }
}
```

에러 응답:

```json
{
  "success": false,
  "message": "에러 메시지",
  "data": null
}
```

## 샘플 데이터

애플리케이션 시작 시 자동으로 샘플 데이터가 초기화됩니다:

- 사용자 5명 (민지, 승우, 소연, 동현, 유나)
- 게시글 12개

모든 샘플 사용자의 비밀번호는 `123456`입니다.

## CORS 설정

프론트엔드 개발 서버(`http://localhost:5173`, `http://localhost:3000`)에서의 요청을 허용하도록 설정되어 있습니다.

## H2 Console

개발 중 데이터베이스 상태를 확인하려면:

1. 애플리케이션 실행 후 `http://localhost:8080/h2-console` 접속
2. JDBC URL: `jdbc:h2:mem:testdb`
3. Username: `sa`
4. Password: (비어있음)

## 주의사항

- 현재 인증/인가는 구현되지 않았습니다. 사용자 ID는 `X-User-Id` 헤더로 전달됩니다.
- 비밀번호는 평문으로 저장됩니다. 실제 프로덕션 환경에서는 해시화가 필요합니다.
- H2 인메모리 데이터베이스를 사용하므로 애플리케이션 재시작 시 모든 데이터가 초기화됩니다.

