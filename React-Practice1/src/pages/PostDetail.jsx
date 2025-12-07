import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = storage.getPosts();
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost);
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      const posts = storage.getPosts();
      const updatedPosts = posts.filter((p) => p.id !== id);
      storage.savePosts(updatedPosts);
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const formatPrice = (price) => {
    if (!price) return '가격 미정';
    return `${price.toLocaleString()}원`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="not-found">
          <h2>게시글을 찾을 수 없습니다</h2>
          <p>요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
          <Link to="/board" className="back-link">
            게시판으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && user.id === post.author;

  return (
    <div className="post-detail-container">
      <div className="post-detail-card">
        <div className="post-header">
          <div className="post-title-section">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-location">{post.location || '지역 미정'}</span>
              <span className="post-date">{formatDate(post.createdAt)}</span>
            </div>
          </div>
          {isAuthor && (
            <div className="post-actions">
              <Link to={`/post/edit/${post.id}`} className="edit-button">
                수정
              </Link>
              <button onClick={handleDelete} className="delete-button">
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="post-content-section">
          <div className="post-price-large">{formatPrice(post.price)}</div>

          {post.image && (
            <div className="post-image-section">
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <div className="post-content">
            <pre>{post.content}</pre>
          </div>
        </div>

        <div className="post-footer">
          <div className="post-author-info">
            <span className="author-label">작성자</span>
            <span className="author-name">{post.authorName || '익명'}</span>
          </div>
          <Link to="/board" className="back-link">
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
