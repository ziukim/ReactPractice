import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { storage } from '../utils/storage';
import ProtectedRoute from '../components/ProtectedRoute';
import * as S from './PostEdit.styled';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    price: '',
    location: '',
    image: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const posts = storage.getPosts();
    const foundPost = posts.find((p) => p.id === id);

    if (!foundPost) {
      alert('게시글을 찾을 수 없습니다.');
      navigate('/board');
      return;
    }

    // 작성자 확인
    if (user && foundPost.author !== user.id) {
      alert('수정 권한이 없습니다.');
      navigate(`/post/${id}`);
      return;
    }

    setPost(foundPost);
    setFormData({
      title: foundPost.title || '',
      content: foundPost.content || '',
      price: foundPost.price ? foundPost.price.toString() : '',
      location: foundPost.location || '',
      image: foundPost.image || '',
    });
    setLoading(false);
  }, [id, user, navigate]);

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
      const updatedPosts = posts.map((p) =>
        p.id === id
          ? {
              ...p,
              title: formData.title,
              content: formData.content,
              price: formData.price ? Number(formData.price) : null,
              location: formData.location || null,
              image: formData.image || null,
              updatedAt: new Date().toISOString(),
            }
          : p
      );

      storage.savePosts(updatedPosts);

      alert('게시글이 수정되었습니다!');
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      alert('게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <S.PostEditContainer>
          <S.Loading>로딩 중...</S.Loading>
        </S.PostEditContainer>
      </ProtectedRoute>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <ProtectedRoute>
      <S.PostEditContainer>
        <S.PostEditCard>
          <h1>게시글 수정</h1>

          <S.PostEditForm onSubmit={handleSubmit}>
            <S.FormGroup>
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
                <S.ErrorMessage>{errors.title}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
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
                <S.ErrorMessage>{errors.price}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <label htmlFor="location">지역</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="예: 서울시 강남구 (선택사항)"
              />
            </S.FormGroup>

            <S.FormGroup>
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
                <S.ImagePreview>
                  <img src={formData.image} alt="미리보기" />
                </S.ImagePreview>
              )}
            </S.FormGroup>

            <S.FormGroup>
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
                <S.ErrorMessage>{errors.content}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.ButtonGroup>
              <S.CancelButton
                type="button"
                onClick={() => navigate(`/post/${id}`)}
              >
                취소
              </S.CancelButton>
              <S.SubmitButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '수정 중...' : '수정하기'}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.PostEditForm>
        </S.PostEditCard>
      </S.PostEditContainer>
    </ProtectedRoute>
  );
};

export default PostEdit;
