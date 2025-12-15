# 패키지 구조 설계 문서

## 설계 원칙

- **계층 분리**: Controller, Service, Repository 계층 명확히 분리
- **도메인 중심**: 도메인별로 패키지 구조화
- **관심사 분리**: 각 패키지의 역할과 책임 명확히 정의
- **확장성 고려**: 향후 기능 추가 시 구조 변경 최소화

---

## 1. 전체 패키지 구조 트리

```
com.example.api
│
├── ApiApplication.java                    # Spring Boot 메인 클래스
│
├── config/                                 # 설정 클래스
│   ├── CorsConfig.java                     # CORS 설정
│   └── DataInitializer.java                # 샘플 데이터 초기화
│
├── controller/                             # 컨트롤러 계층 (REST API 엔드포인트)
│   ├── AuthController.java                 # 인증 관련 API
│   ├── UserController.java                 # 회원 관련 API
│   └── PostController.java                # 게시글 관련 API
│
├── service/                                # 서비스 계층 (비즈니스 로직)
│   ├── UserService.java                    # 회원 비즈니스 로직
│   └── PostService.java                    # 게시글 비즈니스 로직
│
├── repository/                             # 리포지토리 계층 (데이터 접근)
│   ├── UserRepository.java                 # 회원 데이터 접근
│   └── PostRepository.java                # 게시글 데이터 접근
│
├── entity/                                 # 엔티티 클래스 (JPA)
│   ├── User.java                           # 회원 엔티티
│   └── Post.java                           # 게시글 엔티티
│
├── dto/                                    # 데이터 전송 객체
│   ├── ApiResponse.java                    # 공통 응답 래퍼
│   │
│   ├── auth/                               # 인증 관련 DTO
│   │   ├── SignupRequest.java              # 회원가입 요청
│   │   ├── LoginRequest.java               # 로그인 요청
│   │   └── AuthResponse.java               # 인증 응답
│   │
│   ├── user/                               # 회원 관련 DTO
│   │   ├── UserResponse.java               # 회원 정보 응답
│   │   └── UserUpdateRequest.java          # 회원 정보 수정 요청
│   │
│   └── post/                               # 게시글 관련 DTO
│       ├── PostCreateRequest.java          # 게시글 생성 요청
│       ├── PostUpdateRequest.java          # 게시글 수정 요청
│       └── PostResponse.java               # 게시글 응답
│
└── exception/                              # 예외 처리
    ├── BadRequestException.java            # 잘못된 요청 예외
    ├── ResourceNotFoundException.java      # 리소스 없음 예외
    └── GlobalExceptionHandler.java         # 전역 예외 처리 핸들러
```

---

## 2. 각 패키지의 역할

### 2.1 루트 패키지 (`com.example.api`)

**역할**: 애플리케이션의 진입점과 기본 설정

**포함 클래스:**
- `ApiApplication.java`: Spring Boot 메인 클래스
  - `@SpringBootApplication` 어노테이션으로 애플리케이션 시작점 정의
  - 컴포넌트 스캔의 기준점

**책임:**
- 애플리케이션 초기화 및 실행
- 자동 설정 및 컴포넌트 스캔 범위 정의

---

### 2.2 config 패키지 (`com.example.api.config`)

**역할**: 애플리케이션 전역 설정 및 구성 클래스

**포함 클래스:**
- `CorsConfig.java`: CORS(Cross-Origin Resource Sharing) 설정
  - 프론트엔드와의 통신을 위한 CORS 정책 정의
- `DataInitializer.java`: 샘플 데이터 초기화
  - 애플리케이션 시작 시 샘플 데이터 자동 생성

**책임:**
- 전역 설정 관리
- 외부 시스템 연동 설정
- 초기 데이터 설정

**설계 원칙:**
- `@Configuration` 어노테이션 사용
- `@Bean` 메서드로 설정 객체 생성
- 재사용 가능한 설정 컴포넌트화

---

### 2.3 controller 패키지 (`com.example.api.controller`)

**역할**: HTTP 요청을 받아 처리하고 응답을 반환하는 REST API 엔드포인트

**포함 클래스:**
- `AuthController.java`: 인증 관련 API
  - `POST /api/members` - 회원가입
  - `POST /api/members/auth/login` - 로그인
- `UserController.java`: 회원 관련 API
  - `GET /api/members/me` - 내 정보 조회
  - `PUT /api/members/me` - 내 정보 수정
  - `PATCH /api/members/me` - 내 정보 부분 수정
- `PostController.java`: 게시글 관련 API
  - `GET /api/posts` - 게시글 목록 조회
  - `GET /api/posts/{id}` - 게시글 상세 조회
  - `POST /api/posts` - 게시글 작성
  - `PUT /api/posts/{id}` - 게시글 수정
  - `PATCH /api/posts/{id}` - 게시글 부분 수정
  - `DELETE /api/posts/{id}` - 게시글 삭제

**책임:**
- HTTP 요청/응답 처리
- 요청 데이터 검증 (Bean Validation)
- DTO 변환 (Request → Service, Service → Response)
- HTTP 상태 코드 설정
- 예외 발생 시 GlobalExceptionHandler로 위임

**설계 원칙:**
- `@RestController` 어노테이션 사용
- `@RequestMapping`으로 기본 경로 설정
- 비즈니스 로직은 Service 계층에 위임
- DTO만 사용 (Entity 직접 사용 금지)

---

### 2.4 service 패키지 (`com.example.api.service`)

**역할**: 비즈니스 로직 처리 및 트랜잭션 관리

**포함 클래스:**
- `UserService.java`: 회원 관련 비즈니스 로직
  - 회원가입 처리 및 중복 검증
  - 로그인 검증
  - 회원 정보 조회 및 수정
- `PostService.java`: 게시글 관련 비즈니스 로직
  - 게시글 CRUD 처리
  - 검색 및 정렬 로직
  - 작성자 권한 검증

**책임:**
- 비즈니스 규칙 구현
- 트랜잭션 관리 (`@Transactional`)
- Repository 계층 호출
- 예외 처리 및 변환
- DTO와 Entity 간 변환

**설계 원칙:**
- `@Service` 어노테이션 사용
- `@Transactional`로 트랜잭션 관리
- 하나의 메서드는 하나의 비즈니스 작업 수행
- 예외는 적절한 커스텀 예외로 변환

---

### 2.5 repository 패키지 (`com.example.api.repository`)

**역할**: 데이터베이스 접근 및 데이터 영속성 관리

**포함 클래스:**
- `UserRepository.java`: 회원 데이터 접근
  - JPA Repository 인터페이스
  - 이메일/사용자명으로 조회
  - 중복 체크 메서드
- `PostRepository.java`: 게시글 데이터 접근
  - JPA Repository 인터페이스
  - 검색 및 정렬 쿼리
  - 작성자별 조회

**책임:**
- 데이터베이스 CRUD 작업
- 쿼리 메서드 정의
- 데이터 영속성 관리

**설계 원칙:**
- `@Repository` 어노테이션 사용 (선택사항, JPA Repository는 자동 인식)
- `JpaRepository<T, ID>` 인터페이스 상속
- 복잡한 쿼리는 `@Query` 어노테이션 사용
- 메서드명으로 쿼리 자동 생성 활용

---

### 2.6 entity 패키지 (`com.example.api.entity`)

**역할**: 데이터베이스 테이블과 매핑되는 엔티티 클래스

**포함 클래스:**
- `User.java`: 회원 엔티티
  - 사용자명, 이메일, 비밀번호, 닉네임 등
  - JPA 어노테이션으로 테이블 매핑
- `Post.java`: 게시글 엔티티
  - 제목, 내용, 가격, 지역, 이미지 등
  - 작성자 정보 포함

**책임:**
- 데이터베이스 테이블 구조 정의
- 엔티티 간 관계 정의
- 자동 생성 필드 관리 (`@PrePersist`, `@PreUpdate`)

**설계 원칙:**
- `@Entity` 어노테이션 사용
- `@Table`로 테이블명 지정
- `@Id`, `@GeneratedValue`로 기본키 설정
- `@Column`으로 컬럼 속성 정의
- Entity는 Controller 계층에서 직접 사용하지 않음

---

### 2.7 dto 패키지 (`com.example.api.dto`)

**역할**: 계층 간 데이터 전송 객체

**구조:**
- `ApiResponse.java`: 공통 응답 래퍼
- `auth/`: 인증 관련 DTO
- `user/`: 회원 관련 DTO
- `post/`: 게시글 관련 DTO

**책임:**
- 요청 데이터 전달 (Request DTO)
- 응답 데이터 전달 (Response DTO)
- 유효성 검증 (Bean Validation)
- Entity와의 변환

**설계 원칙:**
- Request와 Response DTO 분리
- 도메인별로 하위 패키지 분리
- Bean Validation 어노테이션 사용
- Entity와 독립적으로 설계

---

### 2.8 exception 패키지 (`com.example.api.exception`)

**역할**: 예외 처리 및 에러 응답 관리

**포함 클래스:**
- `BadRequestException.java`: 잘못된 요청 예외
  - 비즈니스 로직 검증 실패 시 사용
- `ResourceNotFoundException.java`: 리소스를 찾을 수 없음 예외
  - 존재하지 않는 리소스 조회 시 사용
- `GlobalExceptionHandler.java`: 전역 예외 처리 핸들러
  - 모든 예외를 일관된 형식으로 처리
  - 적절한 HTTP 상태 코드 반환

**책임:**
- 커스텀 예외 정의
- 예외를 HTTP 응답으로 변환
- 일관된 에러 응답 형식 유지

**설계 원칙:**
- `@RestControllerAdvice`로 전역 예외 처리
- 예외별로 적절한 HTTP 상태 코드 반환
- 사용자 친화적인 에러 메시지 제공

---

## 3. Controller, Service, Repository의 책임 분리 기준

### 3.1 Controller 계층의 책임

**주요 책임:**
1. **HTTP 요청/응답 처리**
   - HTTP 메서드 매핑 (`@GetMapping`, `@PostMapping` 등)
   - 요청 파라미터 추출 (`@RequestParam`, `@PathVariable`, `@RequestBody`)
   - HTTP 상태 코드 설정

2. **입력 데이터 검증**
   - Bean Validation 실행 (`@Valid`)
   - 검증 실패 시 자동으로 400 Bad Request 반환

3. **DTO 변환**
   - Request DTO를 Service 메서드 파라미터로 전달
   - Service 반환값을 Response DTO로 변환

4. **예외 처리 위임**
   - 예외 발생 시 GlobalExceptionHandler로 위임
   - 직접 예외 처리하지 않음

**하지 않는 것:**
- ❌ 비즈니스 로직 구현
- ❌ 데이터베이스 직접 접근
- ❌ Entity 직접 사용
- ❌ 복잡한 데이터 변환 로직

**예시 코드:**
```java
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponse>> getPost(@PathVariable Long id) {
        PostResponse post = postService.getPostById(id);
        return ResponseEntity.ok(ApiResponse.success(post));
    }
}
```

---

### 3.2 Service 계층의 책임

**주요 책임:**
1. **비즈니스 로직 구현**
   - 도메인 규칙 적용
   - 데이터 검증 및 변환
   - 복잡한 계산 및 처리

2. **트랜잭션 관리**
   - `@Transactional`로 트랜잭션 경계 설정
   - 데이터 일관성 보장

3. **Repository 계층 호출**
   - Entity 조회 및 저장
   - 여러 Repository 조합 사용

4. **예외 처리**
   - 비즈니스 규칙 위반 시 커스텀 예외 발생
   - Repository 예외를 비즈니스 예외로 변환

5. **DTO와 Entity 변환**
   - Entity를 DTO로 변환
   - DTO를 Entity로 변환

**하지 않는 것:**
- ❌ HTTP 관련 처리
- ❌ 요청/응답 형식 결정
- ❌ 데이터베이스 쿼리 직접 작성 (복잡한 쿼리 제외)

**예시 코드:**
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public PostResponse createPost(Long authorId, PostCreateRequest request) {
        // 비즈니스 로직: 작성자 존재 확인
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        
        // Entity 생성
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(authorId)
                .authorName(author.getNickname())
                .build();
        
        // 저장
        post = postRepository.save(post);
        
        // DTO로 변환하여 반환
        return convertToResponse(post);
    }
}
```

---

### 3.3 Repository 계층의 책임

**주요 책임:**
1. **데이터베이스 접근**
   - CRUD 작업 수행
   - 쿼리 실행

2. **쿼리 메서드 정의**
   - 메서드명으로 쿼리 자동 생성
   - `@Query`로 커스텀 쿼리 정의

3. **데이터 영속성 관리**
   - Entity 저장, 조회, 수정, 삭제
   - 영속성 컨텍스트 관리

**하지 않는 것:**
- ❌ 비즈니스 로직 구현
- ❌ 트랜잭션 관리 (Service 계층에서 처리)
- ❌ DTO 변환
- ❌ 예외 처리 (예외는 그대로 전파)

**예시 코드:**
```java
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    @Query("SELECT p FROM Post p WHERE " +
           "(:searchTerm IS NULL OR :searchTerm = '' OR " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Post> findAllWithSearch(@Param("searchTerm") String searchTerm);
    
    List<Post> findByAuthor(Long author);
}
```

---

## 계층 간 데이터 흐름

```
[클라이언트]
    ↓ HTTP Request
[Controller]
    ↓ Request DTO
[Service]
    ↓ Entity
[Repository]
    ↓ SQL Query
[데이터베이스]
    ↓
[Repository]
    ↓ Entity
[Service]
    ↓ Response DTO
[Controller]
    ↓ HTTP Response
[클라이언트]
```

**데이터 변환 흐름:**
1. **요청**: HTTP Request → Request DTO → Entity
2. **응답**: Entity → Response DTO → HTTP Response

---

## 패키지 구조 설계 원칙 요약

1. **계층 분리**: Controller → Service → Repository 순서로 의존성 방향 고정
2. **도메인 중심**: 도메인별로 DTO 하위 패키지 분리
3. **단일 책임**: 각 패키지는 하나의 명확한 역할만 담당
4. **확장성**: 새로운 도메인 추가 시 동일한 구조로 확장 가능
5. **표준 준수**: Spring Boot 표준 패키지 구조 준수

---

## 향후 확장 시 고려사항

### 새로운 도메인 추가 시
```
com.example.api
├── controller/
│   └── [NewDomain]Controller.java
├── service/
│   └── [NewDomain]Service.java
├── repository/
│   └── [NewDomain]Repository.java
├── entity/
│   └── [NewDomain].java
└── dto/
    └── [newdomain]/
        ├── [NewDomain]CreateRequest.java
        ├── [NewDomain]UpdateRequest.java
        └── [NewDomain]Response.java
```

### 공통 기능 추가 시
```
com.example.api
├── common/                    # 공통 유틸리티
│   ├── util/                  # 유틸리티 클래스
│   └── constant/              # 상수 정의
└── dto/
    └── common/                # 공통 DTO
```

---

## 패키지 네이밍 규칙

- **소문자 사용**: 패키지명은 모두 소문자
- **단수형 사용**: 컬렉션이 아닌 단일 개념은 단수형 (`user`, `post`)
- **명확한 이름**: 패키지명만으로 역할을 알 수 있도록
- **계층 명시**: `controller`, `service`, `repository` 등 계층명 명확히 표시

