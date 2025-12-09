import { create } from 'zustand';
import { storage } from '../utils/storage';

const useAuthStore = create((set, get) => {
  // 초기 상태: LocalStorage에서 복원
  const initializeAuth = () => {
    const savedUser = storage.getUser();
    const savedToken = storage.getAuthToken();
    
    return {
      user: savedUser || null,
      isAuthenticated: !!(savedUser && savedToken),
    };
  };

  return {
    ...initializeAuth(),

    // 로그인 함수
    login: (userData, token) => {
      set({
        user: userData,
        isAuthenticated: true,
      });
      storage.saveUser(userData);
      storage.saveAuthToken(token);
    },

    // 로그아웃 함수
    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
      });
      storage.clearAuth();
    },

    // 사용자 정보 업데이트
    updateUser: (userData) => {
      set({ user: userData });
      storage.saveUser(userData);
      
      // 사용자 목록도 업데이트
      const users = storage.getUsers();
      const updatedUsers = users.map(u => 
        u.id === userData.id ? userData : u
      );
      storage.saveUsers(updatedUsers);
    },

    // 인증 상태 초기화 (앱 시작 시 호출)
    initialize: () => {
      const authState = initializeAuth();
      set(authState);
    },
  };
});

export default useAuthStore;

