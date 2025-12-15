// 샘플 데이터 생성 유틸리티

export const generateSampleUsers = () => {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 30); // 30일 전부터 시작

  return [
    {
      id: 'user1',
      username: 'minji_kim',
      email: 'minji@example.com',
      password: '123456',
      nickname: '민지',
      createdAt: new Date(baseDate.getTime() + 1 * 86400000).toISOString(),
    },
    {
      id: 'user2',
      username: 'seungwoo',
      email: 'seungwoo@example.com',
      password: '123456',
      nickname: '승우',
      createdAt: new Date(baseDate.getTime() + 3 * 86400000).toISOString(),
    },
    {
      id: 'user3',
      username: 'soyeon',
      email: 'soyeon@example.com',
      password: '123456',
      nickname: '소연',
      createdAt: new Date(baseDate.getTime() + 5 * 86400000).toISOString(),
    },
    {
      id: 'user4',
      username: 'donghyun',
      email: 'donghyun@example.com',
      password: '123456',
      nickname: '동현',
      createdAt: new Date(baseDate.getTime() + 7 * 86400000).toISOString(),
    },
    {
      id: 'user5',
      username: 'yuna',
      email: 'yuna@example.com',
      password: '123456',
      nickname: '유나',
      createdAt: new Date(baseDate.getTime() + 10 * 86400000).toISOString(),
    },
  ];
};

export const generateSamplePosts = () => {
  const users = generateSampleUsers();
  const baseDate = new Date();

  return [
    {
      id: 'post1',
      title: '아이폰 13 프로 맥스 판매합니다',
      content: `아이폰 13 프로 맥스 256GB 파우 퍼셀 색상입니다.
      
구매일: 2023년 3월
용량: 256GB
색상: 파우 퍼셀
배터리 효율: 88%

사용감이 있지만 전반적으로 상태 좋습니다.
케이스와 필름 모두 끼워서 사용했어요.
박스, 충전기, 케이블 모두 포함입니다.

직거래 희망 지역: 서울 강남구
가격 협상 가능합니다.`,
      price: 850000,
      location: '서울시 강남구',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      author: users[0].id,
      authorName: users[0].nickname,
      createdAt: new Date(baseDate.getTime() - 2 * 86400000 - 3 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 2 * 86400000 - 3 * 3600000).toISOString(),
    },
    {
      id: 'post2',
      title: '맥북 에어 M2 13인치 판매',
      content: `맥북 에어 M2 13인치 스페이스 그레이 판매합니다.

스펙:
- 칩: Apple M2
- 메모리: 8GB
- 저장공간: 256GB
- 배터리 사이클: 약 120회

2023년 6월 구매했고, 중고급 개발용으로만 사용했습니다.
상태 매우 양호합니다. 스크래치나 압흔 없어요.

포함 사항:
- 본체
- 충전기
- 박스 및 설명서

가격: 1,300,000원 (협상 가능)
직거래: 서울시 서초구`,
      price: 1300000,
      location: '서울시 서초구',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
      author: users[1].id,
      authorName: users[1].nickname,
      createdAt: new Date(baseDate.getTime() - 1 * 86400000 - 5 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 1 * 86400000 - 5 * 3600000).toISOString(),
    },
    {
      id: 'post3',
      title: '나이키 에어맥스 신발 판매',
      content: `나이키 에어맥스 270 사이즈 270mm 판매합니다.

구매일: 2023년 10월
사이즈: 270mm
색상: 블랙/화이트
착용 횟수: 약 10회 정도

사용감 거의 없고 상태 좋습니다.
박스 포함되어 있어요.

직거래: 경기도 성남시 분당구
택배 배송도 가능합니다.`,
      price: 80000,
      location: '경기도 성남시 분당구',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      author: users[2].id,
      authorName: users[2].nickname,
      createdAt: new Date(baseDate.getTime() - 5 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 5 * 3600000).toISOString(),
    },
    {
      id: 'post4',
      title: '삼성 갤럭시 버즈2 프로',
      content: `삼성 갤럭시 버즈2 프로 새제품 급 판매합니다.

구매일: 2024년 1월
사용 기간: 약 2개월
색상: 라벤더

거의 안 쓰고 방치해두었습니다.
액정 필름, 케이스 모두 포함입니다.
박스, 설명서, 충전기 모두 있어요.

직거래: 인천시 연수구
택배 가능합니다.`,
      price: 180000,
      location: '인천시 연수구',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      author: users[3].id,
      authorName: users[3].nickname,
      createdAt: new Date(baseDate.getTime() - 12 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 12 * 3600000).toISOString(),
    },
    {
      id: 'post5',
      title: '무신사 스탠다드 후드 집업',
      content: `무신사 스탠다드 후드집업 M사이즈 판매합니다.

색상: 네이비
사이즈: M
구매일: 2023년 11월

한두 번 정도만 입었어요.
상태 매우 좋습니다.
세탁 후 보관 중입니다.

직거래: 서울시 마포구
가격 협상 가능합니다.`,
      price: 45000,
      location: '서울시 마포구',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
      author: users[4].id,
      authorName: users[4].nickname,
      createdAt: new Date(baseDate.getTime() - 20 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 20 * 3600000).toISOString(),
    },
    {
      id: 'post6',
      title: '다이슨 V15 무선 청소기',
      content: `다이슨 V15 디텍트 무선 청소기 판매합니다.

구매일: 2023년 5월
사용 기간: 약 8개월
상태: 매우 양호

집이 작아서 거의 안 썼어요.
모든 부속품 포함입니다.
배터리 상태 좋습니다.

직거래: 서울시 송파구
택배 배송 가능합니다.`,
      price: 450000,
      location: '서울시 송파구',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
      author: users[0].id,
      authorName: users[0].nickname,
      createdAt: new Date(baseDate.getTime() - 3 * 86400000 + 2 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 3 * 86400000 + 2 * 3600000).toISOString(),
    },
    {
      id: 'post7',
      title: '닌텐도 스위치 OLED 모델',
      content: `닌텐도 스위치 OLED 모델 화이트 판매합니다.

구매일: 2023년 9월
상태: 매우 양호

게임 거의 안 해서 사용감 적습니다.
스크린에 스크래치 없어요.
조이콘 두 개 모두 포함입니다.
충전기, HDMI 케이블, 박스 모두 있어요.

포함 게임:
- 젤다의 전설: 티어스 오브 더 킹덤
- 마리오 카트 8 디럭스

직거래: 부산시 해운대구
택배 가능합니다.`,
      price: 320000,
      location: '부산시 해운대구',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
      author: users[1].id,
      authorName: users[1].nickname,
      createdAt: new Date(baseDate.getTime() - 4 * 86400000 - 1 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 4 * 86400000 - 1 * 3600000).toISOString(),
    },
    {
      id: 'post8',
      title: '에어팟 프로 2세대',
      content: `에어팟 프로 2세대 판매합니다.

구매일: 2023년 12월
사용 기간: 약 3개월
색상: 화이트

거의 새 제품 수준입니다.
케이스, 충전 케이블 포함입니다.
박스와 설명서 모두 있어요.

직거래: 서울시 강동구
택배 배송 가능합니다.`,
      price: 250000,
      location: '서울시 강동구',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500',
      author: users[2].id,
      authorName: users[2].nickname,
      createdAt: new Date(baseDate.getTime() - 6 * 86400000 + 8 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 6 * 86400000 + 8 * 3600000).toISOString(),
    },
    {
      id: 'post9',
      title: '코치 크로스백 판매',
      content: `코치 시그니처 크로스백 판매합니다.

구매일: 2023년 8월
색상: 브라운
상태: 매우 양호

사용감 적고 상태 좋습니다.
더스트백 포함되어 있어요.
정품 보증서 있습니다.

직거래: 경기도 고양시 일산동구
택배 배송 가능합니다.`,
      price: 180000,
      location: '경기도 고양시 일산동구',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
      author: users[3].id,
      authorName: users[3].nickname,
      createdAt: new Date(baseDate.getTime() - 7 * 86400000 - 4 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 7 * 86400000 - 4 * 3600000).toISOString(),
    },
    {
      id: 'post10',
      title: '레고 스타워즈 밀레니엄 팔콘',
      content: `레고 스타워즈 밀레니엄 팔콘 UCS 판매합니다.

상태: 완전히 조립되어 있음
박스와 설명서 모두 포함
부품 누락 없음

거실에 전시용으로만 놓아뒀어요.
먼지 좀 있지만 상태는 좋습니다.

직거래: 서울시 노원구
크기가 커서 택배는 어려울 것 같아요.`,
      price: 450000,
      location: '서울시 노원구',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      author: users[4].id,
      authorName: users[4].nickname,
      createdAt: new Date(baseDate.getTime() - 8 * 86400000 + 6 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 8 * 86400000 + 6 * 3600000).toISOString(),
    },
    {
      id: 'post11',
      title: '자전거 판매 (로드바이크)',
      content: `로드바이크 판매합니다.

브랜드: 자이언트
모델: TCR ADVANCED 2
사이즈: M (52cm)
구매일: 2022년 5월

주행거리 약 2000km 정도입니다.
정기적으로 점검받았어요.
헬멧, 장갑, 펌프 함께 드립니다.

직거래: 경기도 수원시 영통구
직접 와서 타보고 거래 가능합니다.`,
      price: 1200000,
      location: '경기도 수원시 영통구',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      author: users[0].id,
      authorName: users[0].nickname,
      createdAt: new Date(baseDate.getTime() - 10 * 86400000 - 2 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 10 * 86400000 - 2 * 3600000).toISOString(),
    },
    {
      id: 'post12',
      title: '에어프라이어 판매 (5.5L)',
      content: `쿠쿠 에어프라이어 5.5L 판매합니다.

구매일: 2023년 7월
사용 기간: 약 6개월
상태: 매우 양호

사용감 적습니다. 정기적으로 세척했어요.
모든 부속품, 설명서 포함입니다.
박스도 있어요.

직거래: 대전시 유성구
택배 배송 가능합니다.`,
      price: 80000,
      location: '대전시 유성구',
      image: 'https://images.unsplash.com/photo-1556911220-e4b4bbef0543?w=500',
      author: users[1].id,
      authorName: users[1].nickname,
      createdAt: new Date(baseDate.getTime() - 5 * 86400000 + 10 * 3600000).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 5 * 86400000 + 10 * 3600000).toISOString(),
    },
  ];
};

export const initializeSampleData = (storage, force = false) => {
  // 이미 데이터가 있으면 초기화하지 않음 (force가 true면 강제 초기화)
  const existingUsers = storage.getUsers();
  const existingPosts = storage.getPosts();

  if (existingUsers.length === 0 || force) {
    const sampleUsers = generateSampleUsers();
    storage.saveUsers(sampleUsers);
    console.log('샘플 사용자 데이터가 초기화되었습니다.');
  }

  if (existingPosts.length === 0 || force) {
    const samplePosts = generateSamplePosts();
    storage.savePosts(samplePosts);
    console.log('샘플 게시글 데이터가 초기화되었습니다.');
  }
};

export const resetSampleData = (storage) => {
  // 모든 데이터를 초기화하고 샘플 데이터로 재설정
  localStorage.removeItem('users');
  localStorage.removeItem('posts');
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
  
  initializeSampleData(storage, true);
  console.log('모든 데이터가 초기화되고 샘플 데이터로 재설정되었습니다.');
};

