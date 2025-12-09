import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import * as S from './Board.styled';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // latest, oldest, priceHigh, priceLow

  const loadPosts = () => {
    // 로컬 스토리지에서 게시글 목록 가져오기
    const savedPosts = storage.getPosts();
    setPosts(savedPosts);
    setFilteredPosts(savedPosts);
  };

  useEffect(() => {
    loadPosts();
    
    // 페이지 포커스 시 데이터 새로고침
    const handleFocus = () => {
      loadPosts();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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
    <S.BoardContainer>
      <S.BoardHeader>
        <h1>중고거래 게시판</h1>
        <S.Subtitle>안전하고 편리한 중고거래를 시작해보세요</S.Subtitle>
      </S.BoardHeader>

      <S.BoardControls>
        <S.SearchBox>
          <S.SearchInput
            type="text"
            placeholder="제목, 내용으로 검색..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </S.SearchBox>
        <S.ControlsRight>
          <S.SortBox>
            <label htmlFor="sort">정렬:</label>
            <S.SortSelect
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="priceHigh">가격 높은순</option>
              <option value="priceLow">가격 낮은순</option>
            </S.SortSelect>
          </S.SortBox>
          <S.RefreshButton onClick={loadPosts} title="새로고침">
            🔄
          </S.RefreshButton>
        </S.ControlsRight>
      </S.BoardControls>

      <S.PostsCount>
        총 {filteredPosts.length}개의 게시글
      </S.PostsCount>

      {filteredPosts.length === 0 ? (
        <S.NoPosts>
          <p>등록된 게시글이 없습니다.</p>
          <S.WriteLink to="/post/write">
            첫 게시글 작성하기
          </S.WriteLink>
        </S.NoPosts>
      ) : (
        <S.PostsGrid>
          {filteredPosts.map((post) => (
            <S.PostCard
              key={post.id}
              to={`/post/${post.id}`}
            >
              <S.PostImage>
                {post.image ? (
                  <img src={post.image} alt={post.title} />
                ) : (
                  <S.NoImage>이미지 없음</S.NoImage>
                )}
              </S.PostImage>
              <S.PostContent>
                <S.PostTitle>{post.title}</S.PostTitle>
                <S.PostPrice>{formatPrice(post.price)}</S.PostPrice>
                <S.PostMeta>
                  <S.PostLocation>{post.location || '지역 미정'}</S.PostLocation>
                  <S.PostDate>{formatDate(post.createdAt)}</S.PostDate>
                </S.PostMeta>
                <S.PostAuthor>
                  <span>{post.authorName || '익명'}</span>
                </S.PostAuthor>
              </S.PostContent>
            </S.PostCard>
          ))}
        </S.PostsGrid>
      )}
    </S.BoardContainer>
  );
};

export default Board;
