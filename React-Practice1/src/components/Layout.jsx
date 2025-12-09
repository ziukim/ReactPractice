import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as S from './Layout.styled';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <S.LayoutContainer>
      <S.Header>
        <S.HeaderContainer>
          <S.Logo to="/">
            🥕 중고거래
          </S.Logo>
          <S.Nav>
            <Link to="/board">게시판</Link>
            {isAuthenticated ? (
              <>
                <Link to="/post/write">글쓰기</Link>
                <Link to="/mypage">마이페이지</Link>
                <S.UserInfo>{user?.nickname || user?.username}님</S.UserInfo>
                <S.LogoutButton onClick={handleLogout}>
                  로그아웃
                </S.LogoutButton>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </S.Nav>
        </S.HeaderContainer>
      </S.Header>
      <S.Main>
        {children}
      </S.Main>
      <S.Footer>
        <p>&copy; 2024 중고거래 플랫폼. All rights reserved.</p>
      </S.Footer>
    </S.LayoutContainer>
  );
};

export default Layout;
