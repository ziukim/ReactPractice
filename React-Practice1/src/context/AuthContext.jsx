import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 컴포넌트 마운트 시 저장된 인증 정보 불러오기
  useEffect(() => {
    const savedUser = storage.getUser();
    const savedToken = storage.getAuthToken();
    
    if (savedUser && savedToken) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // 로그인 함수
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    storage.saveUser(userData);
    storage.saveAuthToken(token);
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storage.clearAuth();
  };

  // 사용자 정보 업데이트
  const updateUser = (userData) => {
    setUser(userData);
    storage.saveUser(userData);
    
    // 사용자 목록도 업데이트
    const users = storage.getUsers();
    const updatedUsers = users.map(u => 
      u.id === userData.id ? userData : u
    );
    storage.saveUsers(updatedUsers);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

