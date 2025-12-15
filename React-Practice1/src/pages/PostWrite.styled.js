import styled from 'styled-components';

export const PostWriteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  padding: 2rem 1rem;
`;

export const PostWriteCard = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;

  h1 {
    text-align: center;
    color: #ff6f0f;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const PostWriteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #ff6f0f;
    }

    &.error {
      border-color: #ff4444;
    }
  }

  textarea {
    resize: vertical;
    min-height: 200px;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: -0.25rem;
`;

export const ImagePreview = styled.div`
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  max-width: 300px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  background-color: #6c757d;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #5a6268;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;

