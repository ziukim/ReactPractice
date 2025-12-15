import useAuthStore from '../store/authStore';

// 기존 useAuth 훅과 동일한 인터페이스를 유지하기 위한 래퍼
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};

