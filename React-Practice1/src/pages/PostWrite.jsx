import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import ProtectedRoute from '../components/ProtectedRoute';
import './PostWrite.css';

const PostWrite = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    price: '',
    location: '',
    image: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    } else if (formData.title.length < 2) {
      newErrors.title = '제목은 2자 이상이어야 합니다.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    } else if (formData.content.length < 10) {
      newErrors.content = '내용은 10자 이상이어야 합니다.';
    }

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = '가격은 숫자로 입력해주세요.';
    } else if (formData.price && Number(formData.price) < 0) {
      newErrors.price = '가격은 0 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const posts = storage.getPosts();
      const newPost = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        price: formData.price ? Number(formData.price) : null,
        location: formData.location || null,
        image: formData.image || null,
        author: user.id,
        authorName: user.nickname || user.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      posts.push(newPost);
      storage.savePosts(posts);

      alert('게시글이 등록되었습니다!');
      navigate('/board');
    } catch (error) {
      console.error('게시글 등록 오류:', error);
      alert('게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="post-write-container">
        <div className="post-write-card">
          <h1>게시글 작성</h1>

          <form onSubmit={handleSubmit} className="post-write-form">
            <div className="form-group">
              <label htmlFor="title">제목 *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="게시글 제목을 입력해주세요"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">가격 (원)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="가격을 입력해주세요 (선택사항)"
                min="0"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && (
                <span className="error-message">{errors.price}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">지역</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="예: 서울시 강남구 (선택사항)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">이미지 URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="이미지 URL을 입력해주세요 (선택사항)"
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="미리보기" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="content">내용 *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="게시글 내용을 입력해주세요 (최소 10자)"
                rows="10"
                className={errors.content ? 'error' : ''}
              />
              {errors.content && (
                <span className="error-message">{errors.content}</span>
              )}
            </div>

            <div className="button-group">
              <button
                type="button"
                onClick={() => navigate('/board')}
                className="cancel-button"
              >
                취소
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostWrite;
