import styled from 'styled-components';

export const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  padding: 2rem 1rem;
`;

export const MyPageCard = styled.div`
  width: 100%;
  max-width: 600px;
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

export const UserInfoView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ff6f0f;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;

  .label {
    font-weight: 600;
    color: #666;
  }

  .value {
    color: #333;
    font-size: 1.1rem;
  }
`;

export const EditButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ff6f0f;
  }
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

  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #ff6f0f;
    }

    &.error {
      border-color: #ff4444;
    }

    &.disabled-input {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  }
`;

export const HelpText = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-top: -0.25rem;
`;

export const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: -0.25rem;
`;

export const PasswordSection = styled.div`
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;

  h3 {
    color: #333;
    font-size: 1.2rem;
    margin-bottom: 1rem;
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

