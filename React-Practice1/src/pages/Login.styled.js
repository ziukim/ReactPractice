import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem 1rem;
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;

  h1 {
    text-align: center;
    color: #ff6f0f;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

export const LoginForm = styled.form`
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
  }
`;

export const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: -0.25rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;

  p {
    color: #666;
    font-size: 0.9rem;
  }

  a {
    color: #ff6f0f;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SampleDataSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

export const SampleInfoToggle = styled.button`
  width: 100%;
  background-color: transparent;
  border: 1px solid #ddd;
  color: #666;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;

  &:hover {
    background-color: #f9f9f9;
    border-color: #ff6f0f;
    color: #ff6f0f;
  }
`;

export const SampleAccounts = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

export const SampleInfoText = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const SampleAccountsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const SampleAccountButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;

  &:hover {
    background-color: #ff6f0f;
    color: white;
    border-color: #ff6f0f;
    transform: translateX(4px);
  }
`;

export const ResetSampleButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #cc0000;
    transform: translateY(-1px);
  }
`;

