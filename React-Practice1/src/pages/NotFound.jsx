import * as S from './NotFound.styled';

const NotFound = () => {
  return (
    <S.NotFoundContainer>
      <S.NotFoundContent>
        <S.NotFoundIcon>🥕</S.NotFoundIcon>
        <S.NotFoundTitle>404</S.NotFoundTitle>
        <S.NotFoundSubtitle>페이지를 찾을 수 없습니다</S.NotFoundSubtitle>
        <S.NotFoundText>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</S.NotFoundText>
        <S.NotFoundActions>
          <S.HomeButton to="/">
            홈으로 가기
          </S.HomeButton>
          <S.BoardButton to="/board">
            게시판 보기
          </S.BoardButton>
        </S.NotFoundActions>
      </S.NotFoundContent>
    </S.NotFoundContainer>
  );
};

export default NotFound;
