import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import * as S from './PostDetail.styled';

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
      <S.PostDetailContainer>
        <S.Loading>로딩 중...</S.Loading>
      </S.PostDetailContainer>
    );
  }

  if (!post) {
    return (
      <S.PostDetailContainer>
        <S.NotFound>
          <h2>게시글을 찾을 수 없습니다</h2>
          <p>요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
          <S.BackLink to="/board">
            게시판으로 돌아가기
          </S.BackLink>
        </S.NotFound>
      </S.PostDetailContainer>
    );
  }

  const isAuthor = user && user.id === post.author;

  return (
    <S.PostDetailContainer>
      <S.PostDetailCard>
        <S.PostHeader>
          <S.PostTitleSection>
            <h1>{post.title}</h1>
            <S.PostMeta>
              <S.PostLocation>{post.location || '지역 미정'}</S.PostLocation>
              <S.PostDate>{formatDate(post.createdAt)}</S.PostDate>
            </S.PostMeta>
          </S.PostTitleSection>
          {isAuthor && (
            <S.PostActions>
              <S.EditButton to={`/post/edit/${post.id}`}>
                수정
              </S.EditButton>
              <S.DeleteButton onClick={handleDelete}>
                삭제
              </S.DeleteButton>
            </S.PostActions>
          )}
        </S.PostHeader>

        <S.PostContentSection>
          <S.PostPriceLarge>{formatPrice(post.price)}</S.PostPriceLarge>

          {post.image && (
            <S.PostImageSection>
              <img src={post.image} alt={post.title} />
            </S.PostImageSection>
          )}

          <S.PostContent>
            <pre>{post.content}</pre>
          </S.PostContent>
        </S.PostContentSection>

        <S.PostFooter>
          <S.PostAuthorInfo>
            <S.AuthorLabel>작성자</S.AuthorLabel>
            <S.AuthorName>{post.authorName || '익명'}</S.AuthorName>
          </S.PostAuthorInfo>
          <S.BackLink to="/board">
            목록으로
          </S.BackLink>
        </S.PostFooter>
      </S.PostDetailCard>
    </S.PostDetailContainer>
  );
};

export default PostDetail;
