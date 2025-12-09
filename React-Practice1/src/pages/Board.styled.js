import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BoardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const BoardHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: #ff6f0f;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

export const BoardControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchBox = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #ff6f0f;
  }
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const SortBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #333;
  }
`;

export const RefreshButton = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ff6f0f;
    transform: rotate(180deg);
  }
`;

export const SortSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #ff6f0f;
  }
`;

export const PostsCount = styled.div`
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

export const NoPosts = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;

  p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const WriteLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff6f0f;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff8533;
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
`;

export const PostCard = styled(Link)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const PostImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const NoImage = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

export const PostContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PostTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PostPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6f0f;
  margin: 0.5rem 0;
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
  margin-top: auto;
`;

export const PostLocation = styled.span`
  color: #666;
`;

export const PostDate = styled.span`
  color: #999;
`;

export const PostAuthor = styled.div`
  font-size: 0.85rem;
  color: #999;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
`;

