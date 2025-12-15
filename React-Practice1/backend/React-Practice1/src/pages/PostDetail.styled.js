import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PostDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  padding: 2rem 1rem;
`;

export const PostDetailCard = styled.div`
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

export const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const PostTitleSection = styled.div`
  flex: 1;

  h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 1rem;
    word-break: break-word;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const PostMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

export const PostLocation = styled.span`
  color: #666;
`;

export const PostDate = styled.span`
  color: #999;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;

    a, button {
      flex: 1;
    }
  }
`;

export const EditButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #ff6f0f;
  color: white;

  &:hover {
    background-color: #ff8533;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

export const PostContentSection = styled.div`
  margin-bottom: 2rem;
`;

export const PostPriceLarge = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff6f0f;
  margin-bottom: 1.5rem;
`;

export const PostImageSection = styled.div`
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 500px;
    object-fit: contain;
    background-color: #f5f5f5;
  }
`;

export const PostContent = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 200px;

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    margin: 0;
  }
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const PostAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AuthorLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const AuthorName = styled.span`
  color: #333;
  font-weight: 500;
  font-size: 1rem;
`;

export const BackLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

