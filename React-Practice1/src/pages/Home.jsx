import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>🥕 중고거래 플랫폼</h1>
        <p className="hero-subtitle">안전하고 편리한 중고거래를 시작해보세요</p>
        {isAuthenticated ? (
          <div className="welcome-message">
            <p>안녕하세요, <strong>{user?.nickname || user?.username}</strong>님!</p>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signup" className="signup-button">
              회원가입
            </Link>
            <Link to="/login" className="login-button">
              로그인
            </Link>
          </div>
        )}
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>간편한 게시글 작성</h3>
          <p>쉽고 빠르게 중고거래 게시글을 작성할 수 있습니다.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>검색 및 정렬</h3>
          <p>원하는 상품을 빠르게 찾을 수 있는 검색 기능을 제공합니다.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👤</div>
          <h3>마이페이지</h3>
          <p>내 정보를 관리하고 내가 작성한 게시글을 확인할 수 있습니다.</p>
        </div>
      </div>

      <div className="home-cta">
        <h2>지금 바로 시작해보세요!</h2>
        <Link to="/board" className="cta-button">
          게시판 보기
        </Link>
      </div>
    </div>
  );
};

export default Home;
