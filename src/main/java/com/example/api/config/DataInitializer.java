package com.example.api.config;

import com.example.api.entity.Post;
import com.example.api.entity.User;
import com.example.api.repository.PostRepository;
import com.example.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    
    @Override
    @Transactional
    public void run(String... args) {
        // 이미 데이터가 있으면 초기화하지 않음
        if (userRepository.count() > 0) {
            log.info("이미 데이터가 존재합니다. 샘플 데이터를 초기화하지 않습니다.");
            return;
        }
        
        log.info("샘플 데이터 초기화를 시작합니다...");
        
        // 샘플 사용자 생성
        List<User> users = createSampleUsers();
        userRepository.saveAll(users);
        log.info("샘플 사용자 {}명이 생성되었습니다.", users.size());
        
        // 샘플 게시글 생성
        List<Post> posts = createSamplePosts(users);
        postRepository.saveAll(posts);
        log.info("샘플 게시글 {}개가 생성되었습니다.", posts.size());
        
        log.info("샘플 데이터 초기화가 완료되었습니다.");
    }
    
    private List<User> createSampleUsers() {
        LocalDateTime baseDate = LocalDateTime.now().minusDays(30);
        
        List<User> users = new ArrayList<>();
        
        users.add(User.builder()
                .username("minji_kim")
                .email("minji@example.com")
                .password("123456")
                .nickname("민지")
                .createdAt(baseDate.plusDays(1))
                .build());
        
        users.add(User.builder()
                .username("seungwoo")
                .email("seungwoo@example.com")
                .password("123456")
                .nickname("승우")
                .createdAt(baseDate.plusDays(3))
                .build());
        
        users.add(User.builder()
                .username("soyeon")
                .email("soyeon@example.com")
                .password("123456")
                .nickname("소연")
                .createdAt(baseDate.plusDays(5))
                .build());
        
        users.add(User.builder()
                .username("donghyun")
                .email("donghyun@example.com")
                .password("123456")
                .nickname("동현")
                .createdAt(baseDate.plusDays(7))
                .build());
        
        users.add(User.builder()
                .username("yuna")
                .email("yuna@example.com")
                .password("123456")
                .nickname("유나")
                .createdAt(baseDate.plusDays(10))
                .build());
        
        return users;
    }
    
    private List<Post> createSamplePosts(List<User> users) {
        LocalDateTime baseDate = LocalDateTime.now();
        List<Post> posts = new ArrayList<>();
        
        // Post 1
        posts.add(Post.builder()
                .title("아이폰 13 프로 맥스 판매합니다")
                .content("아이폰 13 프로 맥스 256GB 파우 퍼셀 색상입니다.\n\n구매일: 2023년 3월\n용량: 256GB\n색상: 파우 퍼셀\n배터리 효율: 88%\n\n사용감이 있지만 전반적으로 상태 좋습니다.\n케이스와 필름 모두 끼워서 사용했어요.\n박스, 충전기, 케이블 모두 포함입니다.\n\n직거래 희망 지역: 서울 강남구\n가격 협상 가능합니다.")
                .price(850000L)
                .location("서울시 강남구")
                .image("https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500")
                .author(users.get(0).getId())
                .authorName(users.get(0).getNickname())
                .createdAt(baseDate.minusDays(2).minusHours(3))
                .build());
        
        // Post 2
        posts.add(Post.builder()
                .title("맥북 에어 M2 13인치 판매")
                .content("맥북 에어 M2 13인치 스페이스 그레이 판매합니다.\n\n스펙:\n- 칩: Apple M2\n- 메모리: 8GB\n- 저장공간: 256GB\n- 배터리 사이클: 약 120회\n\n2023년 6월 구매했고, 중고급 개발용으로만 사용했습니다.\n상태 매우 양호합니다. 스크래치나 압흔 없어요.\n\n포함 사항:\n- 본체\n- 충전기\n- 박스 및 설명서\n\n가격: 1,300,000원 (협상 가능)\n직거래: 서울시 서초구")
                .price(1300000L)
                .location("서울시 서초구")
                .image("https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500")
                .author(users.get(1).getId())
                .authorName(users.get(1).getNickname())
                .createdAt(baseDate.minusDays(1).minusHours(5))
                .build());
        
        // Post 3
        posts.add(Post.builder()
                .title("나이키 에어맥스 신발 판매")
                .content("나이키 에어맥스 270 사이즈 270mm 판매합니다.\n\n구매일: 2023년 10월\n사이즈: 270mm\n색상: 블랙/화이트\n착용 횟수: 약 10회 정도\n\n사용감 거의 없고 상태 좋습니다.\n박스 포함되어 있어요.\n\n직거래: 경기도 성남시 분당구\n택배 배송도 가능합니다.")
                .price(80000L)
                .location("경기도 성남시 분당구")
                .image("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500")
                .author(users.get(2).getId())
                .authorName(users.get(2).getNickname())
                .createdAt(baseDate.minusHours(5))
                .build());
        
        // Post 4
        posts.add(Post.builder()
                .title("삼성 갤럭시 버즈2 프로")
                .content("삼성 갤럭시 버즈2 프로 새제품 급 판매합니다.\n\n구매일: 2024년 1월\n사용 기간: 약 2개월\n색상: 라벤더\n\n거의 안 쓰고 방치해두었습니다.\n액정 필름, 케이스 모두 포함입니다.\n박스, 설명서, 충전기 모두 있어요.\n\n직거래: 인천시 연수구\n택배 가능합니다.")
                .price(180000L)
                .location("인천시 연수구")
                .image("https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500")
                .author(users.get(3).getId())
                .authorName(users.get(3).getNickname())
                .createdAt(baseDate.minusHours(12))
                .build());
        
        // Post 5
        posts.add(Post.builder()
                .title("무신사 스탠다드 후드 집업")
                .content("무신사 스탠다드 후드집업 M사이즈 판매합니다.\n\n색상: 네이비\n사이즈: M\n구매일: 2023년 11월\n\n한두 번 정도만 입었어요.\n상태 매우 좋습니다.\n세탁 후 보관 중입니다.\n\n직거래: 서울시 마포구\n가격 협상 가능합니다.")
                .price(45000L)
                .location("서울시 마포구")
                .image("https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500")
                .author(users.get(4).getId())
                .authorName(users.get(4).getNickname())
                .createdAt(baseDate.minusHours(20))
                .build());
        
        // Post 6
        posts.add(Post.builder()
                .title("다이슨 V15 무선 청소기")
                .content("다이슨 V15 디텍트 무선 청소기 판매합니다.\n\n구매일: 2023년 5월\n사용 기간: 약 8개월\n상태: 매우 양호\n\n집이 작아서 거의 안 썼어요.\n모든 부속품 포함입니다.\n배터리 상태 좋습니다.\n\n직거래: 서울시 송파구\n택배 배송 가능합니다.")
                .price(450000L)
                .location("서울시 송파구")
                .image("https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500")
                .author(users.get(0).getId())
                .authorName(users.get(0).getNickname())
                .createdAt(baseDate.minusDays(3).plusHours(2))
                .build());
        
        // Post 7
        posts.add(Post.builder()
                .title("닌텐도 스위치 OLED 모델")
                .content("닌텐도 스위치 OLED 모델 화이트 판매합니다.\n\n구매일: 2023년 9월\n상태: 매우 양호\n\n게임 거의 안 해서 사용감 적습니다.\n스크린에 스크래치 없어요.\n조이콘 두 개 모두 포함입니다.\n충전기, HDMI 케이블, 박스 모두 있어요.\n\n포함 게임:\n- 젤다의 전설: 티어스 오브 더 킹덤\n- 마리오 카트 8 디럭스\n\n직거래: 부산시 해운대구\n택배 가능합니다.")
                .price(320000L)
                .location("부산시 해운대구")
                .image("https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500")
                .author(users.get(1).getId())
                .authorName(users.get(1).getNickname())
                .createdAt(baseDate.minusDays(4).minusHours(1))
                .build());
        
        // Post 8
        posts.add(Post.builder()
                .title("에어팟 프로 2세대")
                .content("에어팟 프로 2세대 판매합니다.\n\n구매일: 2023년 12월\n사용 기간: 약 3개월\n색상: 화이트\n\n거의 새 제품 수준입니다.\n케이스, 충전 케이블 포함입니다.\n박스와 설명서 모두 있어요.\n\n직거래: 서울시 강동구\n택배 배송 가능합니다.")
                .price(250000L)
                .location("서울시 강동구")
                .image("https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500")
                .author(users.get(2).getId())
                .authorName(users.get(2).getNickname())
                .createdAt(baseDate.minusDays(6).plusHours(8))
                .build());
        
        // Post 9
        posts.add(Post.builder()
                .title("코치 크로스백 판매")
                .content("코치 시그니처 크로스백 판매합니다.\n\n구매일: 2023년 8월\n색상: 브라운\n상태: 매우 양호\n\n사용감 적고 상태 좋습니다.\n더스트백 포함되어 있어요.\n정품 보증서 있습니다.\n\n직거래: 경기도 고양시 일산동구\n택배 배송 가능합니다.")
                .price(180000L)
                .location("경기도 고양시 일산동구")
                .image("https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500")
                .author(users.get(3).getId())
                .authorName(users.get(3).getNickname())
                .createdAt(baseDate.minusDays(7).minusHours(4))
                .build());
        
        // Post 10
        posts.add(Post.builder()
                .title("레고 스타워즈 밀레니엄 팔콘")
                .content("레고 스타워즈 밀레니엄 팔콘 UCS 판매합니다.\n\n상태: 완전히 조립되어 있음\n박스와 설명서 모두 포함\n부품 누락 없음\n\n거실에 전시용으로만 놓아뒀어요.\n먼지 좀 있지만 상태는 좋습니다.\n\n직거래: 서울시 노원구\n크기가 커서 택배는 어려울 것 같아요.")
                .price(450000L)
                .location("서울시 노원구")
                .image("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500")
                .author(users.get(4).getId())
                .authorName(users.get(4).getNickname())
                .createdAt(baseDate.minusDays(8).plusHours(6))
                .build());
        
        // Post 11
        posts.add(Post.builder()
                .title("자전거 판매 (로드바이크)")
                .content("로드바이크 판매합니다.\n\n브랜드: 자이언트\n모델: TCR ADVANCED 2\n사이즈: M (52cm)\n구매일: 2022년 5월\n\n주행거리 약 2000km 정도입니다.\n정기적으로 점검받았어요.\n헬멧, 장갑, 펌프 함께 드립니다.\n\n직거래: 경기도 수원시 영통구\n직접 와서 타보고 거래 가능합니다.")
                .price(1200000L)
                .location("경기도 수원시 영통구")
                .image("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500")
                .author(users.get(0).getId())
                .authorName(users.get(0).getNickname())
                .createdAt(baseDate.minusDays(10).minusHours(2))
                .build());
        
        // Post 12
        posts.add(Post.builder()
                .title("에어프라이어 판매 (5.5L)")
                .content("쿠쿠 에어프라이어 5.5L 판매합니다.\n\n구매일: 2023년 7월\n사용 기간: 약 6개월\n상태: 매우 양호\n\n사용감 적습니다. 정기적으로 세척했어요.\n모든 부속품, 설명서 포함입니다.\n박스도 있어요.\n\n직거래: 대전시 유성구\n택배 배송 가능합니다.")
                .price(80000L)
                .location("대전시 유성구")
                .image("https://images.unsplash.com/photo-1556911220-e4b4bbef0543?w=500")
                .author(users.get(1).getId())
                .authorName(users.get(1).getNickname())
                .createdAt(baseDate.minusDays(5).plusHours(10))
                .build());
        
        return posts;
    }
}

