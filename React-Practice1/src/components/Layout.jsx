import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

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
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            🥕 중고거래
          </Link>
          <nav className="nav">
            <Link to="/board">게시판</Link>
            {isAuthenticated ? (
              <>
                <Link to="/post/write">글쓰기</Link>
                <Link to="/mypage">마이페이지</Link>
                <span className="user-info">{user?.nickname || user?.username}님</span>
                <button onClick={handleLogout} className="logout-button">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 중고거래 플랫폼. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

