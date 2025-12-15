// 로컬 스토리지 유틸리티 함수
export const storage = {
  // 사용자 데이터 저장
  saveUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // 사용자 데이터 가져오기
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // 로그인 상태 저장
  saveAuthToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  // 로그인 상태 가져오기
  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  // 로그아웃 - 모든 데이터 제거
  clearAuth: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  },

  // 사용자 목록 저장 (회원가입한 모든 사용자)
  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  // 사용자 목록 가져오기
  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },

  // 게시글 목록 저장
  savePosts: (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
  },

  // 게시글 목록 가져오기
  getPosts: () => {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
  },
};

