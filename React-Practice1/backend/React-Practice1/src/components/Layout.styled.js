import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background-color: #ff6f0f;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const UserInfo = styled.span`
  color: white;
  font-weight: 500;
  margin: 0 0.5rem;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Footer = styled.footer`
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  color: #666;
  margin-top: auto;
`;

