import { useAuth } from '../hooks/useAuth';
import * as S from './Home.styled';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <S.HomeContainer>
      <S.HomeHero>
        <h1>🥕 중고거래 플랫폼</h1>
        <S.HeroSubtitle>안전하고 편리한 중고거래를 시작해보세요</S.HeroSubtitle>
        {isAuthenticated ? (
          <S.WelcomeMessage>
            <p>안녕하세요, <strong>{user?.nickname || user?.username}</strong>님!</p>
          </S.WelcomeMessage>
        ) : (
          <S.AuthButtons>
            <S.SignupButton to="/signup">
              회원가입
            </S.SignupButton>
            <S.LoginButton to="/login">
              로그인
            </S.LoginButton>
          </S.AuthButtons>
        )}
      </S.HomeHero>

      <S.HomeFeatures>
        <S.FeatureCard>
          <S.FeatureIcon>📝</S.FeatureIcon>
          <S.FeatureCardTitle>간편한 게시글 작성</S.FeatureCardTitle>
          <S.FeatureCardText>쉽고 빠르게 중고거래 게시글을 작성할 수 있습니다.</S.FeatureCardText>
        </S.FeatureCard>
        <S.FeatureCard>
          <S.FeatureIcon>🔍</S.FeatureIcon>
          <S.FeatureCardTitle>검색 및 정렬</S.FeatureCardTitle>
          <S.FeatureCardText>원하는 상품을 빠르게 찾을 수 있는 검색 기능을 제공합니다.</S.FeatureCardText>
        </S.FeatureCard>
        <S.FeatureCard>
          <S.FeatureIcon>👤</S.FeatureIcon>
          <S.FeatureCardTitle>마이페이지</S.FeatureCardTitle>
          <S.FeatureCardText>내 정보를 관리하고 내가 작성한 게시글을 확인할 수 있습니다.</S.FeatureCardText>
        </S.FeatureCard>
      </S.HomeFeatures>

      <S.HomeCta>
        <h2>지금 바로 시작해보세요!</h2>
        <S.CtaButton to="/board">
          게시판 보기
        </S.CtaButton>
      </S.HomeCta>
    </S.HomeContainer>
  );
};

export default Home;
