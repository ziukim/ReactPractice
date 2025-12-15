import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const HomeHero = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #ff6f0f 0%, #ff8533 100%);
  border-radius: 16px;
  color: white;
  margin-bottom: 4rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;

    h1 {
      font-size: 2.5rem;
    }
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const WelcomeMessage = styled.div`
  font-size: 1.2rem;

  strong {
    font-size: 1.3rem;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const SignupButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: white;
  color: #ff6f0f;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

export const LoginButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const HomeFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const FeatureCardTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

export const FeatureCardText = styled.p`
  color: #666;
  line-height: 1.6;
`;

export const HomeCta = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;

  h2 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const CtaButton = styled(Link)`
  display: inline-block;
  padding: 1rem 3rem;
  background-color: #ff6f0f;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;

  &:hover {
    background-color: #ff8533;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 111, 15, 0.3);
  }
`;

