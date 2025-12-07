import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            🥕 중고거래
          </Link>
          <nav className="nav">
            <Link to="/board">게시판</Link>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
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

