import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem 1rem;
`;

export const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
`;

export const NotFoundIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

export const NotFoundTitle = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: #ff6f0f;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const NotFoundText = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const NotFoundActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;

    a {
      width: 100%;
    }
  }
`;

export const HomeButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #ff6f0f;
  color: white;

  &:hover {
    background-color: #ff8533;
    transform: translateY(-2px);
  }
`;

export const BoardButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
    transform: translateY(-2px);
  }
`;

