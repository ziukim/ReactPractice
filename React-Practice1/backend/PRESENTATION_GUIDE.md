# REST API 서버 설계 설명 가이드

면접 및 발표를 위한 설계 의도 및 기술적 선택 근거 정리

---

## 1. 왜 REST API 서버로 설계했는가

### 설명 문장

"이 프로젝트를 REST API 서버로 설계한 이유는 **프론트엔드와 백엔드의 완전한 분리**를 통해 각 계층의 독립성을 확보하고, **확장성과 유지보수성**을 높이기 위함입니다."

### 주요 근거

**1. 관심사의 분리 (Separation of Concerns)**
- 프론트엔드(React SPA)와 백엔드(Spring Boot)를 완전히 분리하여 각각 독립적으로 개발, 배포, 확장 가능
- 프론트엔드 변경 시 백엔드에 영향 없음 (예: React → Vue 전환 시 API만 유지)
- 백엔드 로직 변경 시 프론트엔드에 영향 최소화

**2. 다양한 클라이언트 지원**
- REST API는 HTTP 표준 프로토콜을 사용하므로 웹, 모바일 앱, 데스크톱 앱 등 다양한 클라이언트에서 동일한 API 활용 가능
- 향후 React Native, Flutter 등 모바일 앱 개발 시 동일한 백엔드 API 재사용 가능

**3. 표준화된 통신 방식**
- REST는 널리 알려진 표준이므로 개발자 간 소통이 용이
- HTTP 메서드(GET, POST, PUT, DELETE)로 의도가 명확히 전달됨
- JSON 형식으로 데이터 교환하여 언어 독립적

**4. 캐싱 및 성능 최적화**
- HTTP의 캐싱 메커니즘 활용 가능 (Cache-Control 헤더 등)
- CDN을 통한 정적 리소스 배포 가능
- 프론트엔드와 백엔드 서버를 분리하여 각각 최적화 가능

**5. 마이크로서비스 아키텍처로의 확장성**
- REST API는 마이크로서비스 간 통신의 표준 방식
- 향후 서비스 분리 시에도 REST API를 통해 통신 가능

---

## 2. RESTful URI 설계에서 신경 쓴 부분

### 설명 문장

"RESTful URI 설계에서 **리소스 중심의 명확한 구조**, **HTTP 메서드의 적절한 활용**, **확장 가능한 계층 구조**를 중점적으로 고려했습니다."

### 주요 설계 포인트

**1. 리소스 중심의 URI 설계**

**복수형 명사 사용:**
```
✅ /api/posts          (게시글 리소스)
✅ /api/users          (사용자 리소스)
❌ /api/post           (단수형 - 비표준)
❌ /api/getPosts       (동사 포함 - 비RESTful)
```

**설명:**
- URI는 리소스를 나타내는 명사로 구성
- 복수형을 사용하여 컬렉션임을 명확히 표현
- 동사는 HTTP 메서드로 표현하므로 URI에 포함하지 않음

**2. HTTP 메서드의 의미론적 사용**

**CRUD 작업과 HTTP 메서드 매핑:**
```
GET    /api/posts          → 조회 (Read)
POST   /api/posts          → 생성 (Create)
PUT    /api/posts/{id}     → 전체 수정 (Update)
PATCH  /api/posts/{id}     → 부분 수정 (Update)
DELETE /api/posts/{id}     → 삭제 (Delete)
```

**설명:**
- 각 HTTP 메서드의 의미를 정확히 반영
- PUT: 전체 리소스 교체 (모든 필드 필요)
- PATCH: 부분 리소스 수정 (수정할 필드만 필요)
- GET은 멱등성(idempotent) 보장, POST는 부작용(side effect) 허용

**3. 계층 구조를 통한 관계 표현**

**회원과 게시글의 관계:**
```
/api/members/{memberId}/posts    → 특정 회원의 게시글 목록
/api/members/me/posts            → 현재 로그인한 사용자의 게시글
```

**설명:**
- 리소스 간 관계를 URI 계층 구조로 명확히 표현
- `/api/members/{memberId}/posts`는 "회원의 게시글"이라는 의미를 직관적으로 전달
- 향후 확장 시 `/api/members/{memberId}/posts/{postId}`로 특정 게시글 조회 가능

**4. 일관된 네이밍 규칙**

**도메인별 일관성:**
```
/api/auth/signup        → 인증 관련 (동사 허용 - 특수 케이스)
/api/users/me           → 현재 사용자 (특수 리소스)
/api/posts/{id}         → 특정 게시글
```

**설명:**
- 인증(`/api/auth`)은 동작을 나타내는 특수 케이스로 허용
- `me`는 현재 로그인한 사용자를 나타내는 관용적 표현
- 모든 리소스는 동일한 네이밍 규칙 적용

**5. 쿼리 파라미터의 적절한 사용**

**필터링과 정렬:**
```
GET /api/posts?search=아이폰&sort=latest
GET /api/posts?sort=priceLow
```

**설명:**
- 리소스 식별은 경로 변수(`{id}`)로, 필터링/정렬은 쿼리 파라미터로 구분
- 쿼리 파라미터는 선택적(optional)이며, 없어도 기본 동작 수행
- RESTful 원칙에 맞게 리소스 상태를 변경하지 않는 GET 요청에만 사용

---

## 3. Entity 대신 DTO를 사용한 이유

### 설명 문장

"Entity 대신 DTO를 사용한 이유는 **계층 간 책임 분리**, **API 계약의 안정성**, **보안 강화**, **유연한 데이터 변환**을 위함입니다."

### 주요 이유

**1. 계층 간 책임 분리 (Layered Architecture)**

**Entity의 역할:**
- 데이터베이스 테이블과 매핑
- JPA 영속성 관리
- 비즈니스 로직과 무관한 데이터 구조

**DTO의 역할:**
- API 계약 정의 (클라이언트와의 약속)
- 요청/응답 데이터 구조
- 유효성 검증 (Bean Validation)

**설명:**
- Entity는 데이터베이스 구조에 종속적 (예: `@Entity`, `@Table` 등 JPA 어노테이션)
- DTO는 API 계약에 종속적 (예: 클라이언트가 필요한 필드만 포함)
- 각 계층이 자신의 책임만 수행하도록 분리

**2. API 계약의 안정성**

**문제 상황 (Entity 직접 사용 시):**
```java
// Entity에 필드 추가 시
@Entity
public class User {
    private Long id;
    private String username;
    private String password;  // 보안 문제!
    private String internalStatus;  // 클라이언트에 노출되면 안 됨
}
```

**해결 (DTO 사용 시):**
```java
// DTO는 필요한 필드만 노출
public class UserResponse {
    private Long id;
    private String username;
    private String nickname;
    // password, internalStatus는 제외
}
```

**설명:**
- Entity 구조 변경 시 클라이언트에 영향 없음
- DTO는 API 버전 관리가 용이 (예: `UserResponseV1`, `UserResponseV2`)
- 클라이언트와의 계약을 명확히 정의

**3. 보안 강화**

**민감 정보 보호:**
```java
// Entity에는 비밀번호 포함
@Entity
public class User {
    private String password;  // 데이터베이스에 저장 필요
}

// DTO에는 비밀번호 제외
public class UserResponse {
    // password 필드 없음 - 응답에 포함되지 않음
}
```

**설명:**
- 비밀번호, 내부 상태 등 민감 정보는 Entity에만 존재
- DTO를 통해 노출할 필드를 명시적으로 제어
- 실수로 민감 정보가 노출되는 것을 방지

**4. 유효성 검증의 명확성**

**요청 데이터 검증:**
```java
public class SignupRequest {
    @NotBlank(message = "사용자명을 입력해주세요.")
    @Size(min = 3, message = "사용자명은 3자 이상이어야 합니다.")
    private String username;
    
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;
}
```

**설명:**
- DTO에 Bean Validation 어노테이션을 명확히 정의
- API 계약의 일부로 유효성 검증 규칙이 명시됨
- Entity는 데이터베이스 제약조건에 집중, DTO는 API 제약조건에 집중

**5. 유연한 데이터 변환**

**필드명 매핑:**
```java
// Entity: 데이터베이스 컬럼명
@Entity
public class Post {
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

// DTO: API 응답 필드명 (camelCase)
public class PostResponse {
    private LocalDateTime createdAt;  // 동일하지만 필요시 다르게 매핑 가능
}
```

**설명:**
- Entity와 API 응답의 필드명이 다를 수 있음
- DTO를 통해 자유롭게 변환 가능
- 클라이언트 요구사항에 맞춰 필드 추가/제거 용이

**6. 순환 참조 방지**

**문제 상황:**
```java
@Entity
public class User {
    @OneToMany
    private List<Post> posts;  // Post가 User를 참조하면 순환 참조 발생
}

@Entity
public class Post {
    @ManyToOne
    private User author;  // 순환 참조!
}
```

**해결:**
```java
// DTO는 필요한 정보만 포함
public class PostResponse {
    private Long author;        // ID만 포함
    private String authorName;  // 필요한 정보만 포함
    // User 전체 객체는 포함하지 않음
}
```

**설명:**
- Entity 간 양방향 참조 시 JSON 직렬화 시 순환 참조 발생 가능
- DTO는 필요한 정보만 포함하여 순환 참조 방지
- 응답 크기도 최적화

---

## 4. 인증을 제외한 이유와 장점

### 설명 문장

"인증 로직을 제외한 이유는 **프로젝트의 핵심 목표에 집중**하고, **REST API 설계와 구현에 집중**하기 위함입니다. 이는 오히려 **명확한 책임 분리**와 **학습 효과**를 높이는 장점이 있습니다."

### 제외한 이유

**1. 프로젝트 목표의 명확성**

**핵심 목표:**
- REST API 설계 원칙 이해 및 적용
- 계층 분리 아키텍처 구현
- CRUD 기능 구현 및 비즈니스 로직 처리
- 프론트엔드와의 연동

**설명:**
- 인증/인가는 복잡한 보안 도메인으로 별도의 학습 주제
- REST API 설계와 구현에 집중하기 위해 제외
- 과제 범위를 명확히 하여 평가 기준을 명확히 함

**2. 학습 단계의 적절성**

**학습 순서:**
1. 기본 CRUD 구현 (현재 단계)
2. RESTful 설계 원칙 적용
3. 계층 분리 및 DTO 활용
4. 에러 처리 및 유효성 검증
5. (다음 단계) 인증/인가 구현

**설명:**
- 단계별 학습을 통해 각 개념을 충분히 이해
- 인증은 Spring Security, JWT 등 추가 학습 필요
- 기본기를 탄탄히 한 후 고급 주제로 진행하는 것이 효과적

**3. 평가 관점의 명확성**

**평가 기준:**
- RESTful 설계 원칙 준수
- 계층 분리 아키텍처
- 비즈니스 로직 구현
- 에러 처리 및 유효성 검증

**설명:**
- 인증 로직이 없어도 REST API 설계 능력을 충분히 평가 가능
- 핵심 역량에 집중하여 평가
- 복잡한 보안 로직으로 인한 평가 기준 혼란 방지

### 장점

**1. 명확한 책임 분리**

**인증 로직 제외 시:**
- Controller: HTTP 요청/응답 처리에만 집중
- Service: 비즈니스 로직에만 집중
- Repository: 데이터 접근에만 집중

**설명:**
- 각 계층의 책임이 명확해짐
- 인증 로직이 섞이지 않아 코드 가독성 향상
- 각 계층의 역할을 명확히 이해할 수 있음

**2. 빠른 프로토타이핑**

**개발 속도:**
- 인증 로직 구현 시간 절약
- 핵심 기능 구현에 집중 가능
- 프론트엔드 연동 테스트가 빠름

**설명:**
- `X-User-Id` 헤더로 간단히 사용자 식별
- 복잡한 토큰 검증, 권한 체크 로직 불필요
- 빠르게 프로토타입을 완성하고 핵심 기능 검증 가능

**3. 학습 효과 극대화**

**집중 영역:**
- RESTful 설계 원칙
- 계층 분리 아키텍처
- DTO 활용 및 데이터 변환
- 비즈니스 로직 구현
- 에러 처리 및 유효성 검증

**설명:**
- 인증 로직 없이도 REST API의 핵심 개념을 충분히 학습
- 각 개념을 깊이 있게 이해할 수 있음
- 다음 단계에서 인증을 추가할 때 기반이 탄탄함

**4. 확장성 고려**

**향후 확장:**
```java
// 현재: 간단한 헤더 기반 식별
@RequestHeader("X-User-Id") Long userId

// 향후: 인증 로직 추가 시
@AuthenticationPrincipal UserPrincipal user
// 또는
@PreAuthorize("hasRole('USER')")
```

**설명:**
- 현재 구조는 인증 로직 추가가 용이하도록 설계
- Controller에서 사용자 ID만 받아 Service에 전달하는 구조
- 향후 인증 로직 추가 시 Service 계층 변경 최소화

**5. 실무적 관점**

**실무에서의 분리:**
- 인증/인가는 보안 팀 또는 별도 모듈에서 담당
- API 개발자는 비즈니스 로직에 집중
- 마이크로서비스 환경에서는 인증 서비스를 별도로 분리

**설명:**
- 실무에서도 인증과 비즈니스 로직은 분리되는 경우가 많음
- 현재 구조는 실무 패턴과 유사
- 인증 서비스를 별도로 추가하기 용이한 구조

---

## 종합 정리

### 핵심 메시지

"이 프로젝트는 **REST API 설계의 핵심 원칙**을 학습하고 적용하는 것을 목표로 합니다. 복잡한 인증 로직을 제외함으로써 **명확한 책임 분리**, **학습 효과 극대화**, **빠른 프로토타이핑**을 달성했습니다. Entity와 DTO를 분리하여 **계층 간 독립성**과 **API 계약의 안정성**을 확보했으며, RESTful URI 설계를 통해 **확장 가능하고 직관적인 API**를 구현했습니다."

### 면접/발표 시 강조 포인트

1. **설계 의도가 명확함**: 각 기술 선택의 이유를 설명할 수 있음
2. **표준 준수**: RESTful 원칙을 정확히 이해하고 적용
3. **확장성 고려**: 향후 기능 추가를 고려한 구조 설계
4. **실무적 관점**: 실무에서 사용되는 패턴과 유사한 구조
5. **학습 효과**: 핵심 개념에 집중하여 깊이 있게 이해

