import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">🥕</div>
        <h1>404</h1>
        <h2>페이지를 찾을 수 없습니다</h2>
        <p>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            홈으로 가기
          </Link>
          <Link to="/board" className="board-button">
            게시판 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
