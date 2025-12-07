import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import './Board.css';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // latest, oldest, priceHigh, priceLow

  useEffect(() => {
    // 로컬 스토리지에서 게시글 목록 가져오기
    const savedPosts = storage.getPosts();
    setPosts(savedPosts);
    setFilteredPosts(savedPosts);
  }, []);

  // 검색 및 정렬 적용
  useEffect(() => {
    let result = [...posts];

    // 검색 필터링
    if (searchTerm.trim()) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    result.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priceHigh':
          return (b.price || 0) - (a.price || 0);
        case 'priceLow':
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

    setFilteredPosts(result);
  }, [posts, searchTerm, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const formatPrice = (price) => {
    if (!price) return '가격 미정';
    return `${price.toLocaleString()}원`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>중고거래 게시판</h1>
        <p className="subtitle">안전하고 편리한 중고거래를 시작해보세요</p>
      </div>

      <div className="board-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="제목, 내용으로 검색..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="sort-box">
          <label htmlFor="sort">정렬:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="priceHigh">가격 높은순</option>
            <option value="priceLow">가격 낮은순</option>
          </select>
        </div>
      </div>

      <div className="posts-count">
        총 {filteredPosts.length}개의 게시글
      </div>

      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <p>등록된 게시글이 없습니다.</p>
          <Link to="/post/write" className="write-link">
            첫 게시글 작성하기
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="post-card"
            >
              <div className="post-image">
                {post.image ? (
                  <img src={post.image} alt={post.title} />
                ) : (
                  <div className="no-image">이미지 없음</div>
                )}
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-price">{formatPrice(post.price)}</p>
                <div className="post-meta">
                  <span className="post-location">{post.location || '지역 미정'}</span>
                  <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
                <div className="post-author">
                  <span>{post.authorName || '익명'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
