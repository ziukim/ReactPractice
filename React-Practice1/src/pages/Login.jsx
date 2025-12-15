import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { storage } from '../utils/storage';
import { resetSampleData } from '../utils/sampleData';
import * as S from './Login.styled';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSampleInfo, setShowSampleInfo] = useState(false);

  // 샘플 계정 정보
  const sampleAccounts = [
    { email: 'minji@example.com', password: '123456', nickname: '민지' },
    { email: 'seungwoo@example.com', password: '123456', nickname: '승우' },
    { email: 'soyeon@example.com', password: '123456', nickname: '소연' },
    { email: 'donghyun@example.com', password: '123456', nickname: '동현' },
    { email: 'yuna@example.com', password: '123456', nickname: '유나' },
  ];

  const handleResetSampleData = () => {
    if (window.confirm('모든 데이터를 초기화하고 샘플 데이터로 재설정하시겠습니까?\n(로그인 정보도 초기화됩니다)')) {
      resetSampleData(storage);
      alert('샘플 데이터로 초기화되었습니다!\n샘플 계정으로 로그인할 수 있습니다.');
      window.location.reload();
    }
  };

  const handleSampleAccountClick = (email, password) => {
    setFormData({
      email,
      password,
    });
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 로그인 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 사용자 목록에서 이메일과 비밀번호로 사용자 찾기
      const users = storage.getUsers();
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setErrors({
          email: '이메일 또는 비밀번호가 올바르지 않습니다.',
          password: '이메일 또는 비밀번호가 올바르지 않습니다.',
        });
        setIsSubmitting(false);
        return;
      }

      // 로그인 처리 (비밀번호 제외한 사용자 정보만 저장)
      const { password, ...userWithoutPassword } = user;
      const token = `token_${Date.now()}`;
      
      login(userWithoutPassword, token);

      // 성공 메시지 및 리다이렉트
      alert('로그인되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <h1>로그인</h1>
        <S.Subtitle>중고거래 플랫폼에 오신 것을 환영합니다!</S.Subtitle>

        <S.LoginForm onSubmit={handleSubmit}>
          <S.FormGroup>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <S.ErrorMessage>{errors.password}</S.ErrorMessage>}
          </S.FormGroup>

          <S.SubmitButton 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </S.SubmitButton>
        </S.LoginForm>

        <S.SignupLink>
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입하기</Link>
          </p>
        </S.SignupLink>

        <S.SampleDataSection>
          <S.SampleInfoToggle
            type="button"
            onClick={() => setShowSampleInfo(!showSampleInfo)}
          >
            {showSampleInfo ? '▼' : '▶'} 샘플 계정 정보
          </S.SampleInfoToggle>
          
          {showSampleInfo && (
            <S.SampleAccounts>
              <S.SampleInfoText>
                테스트용 샘플 계정입니다. 클릭하면 자동으로 입력됩니다.
              </S.SampleInfoText>
              <S.SampleAccountsList>
                {sampleAccounts.map((account, index) => (
                  <S.SampleAccountButton
                    key={index}
                    type="button"
                    onClick={() => handleSampleAccountClick(account.email, account.password)}
                  >
                    {account.nickname} ({account.email})
                  </S.SampleAccountButton>
                ))}
              </S.SampleAccountsList>
              <S.ResetSampleButton
                type="button"
                onClick={handleResetSampleData}
              >
                🔄 샘플 데이터 초기화
              </S.ResetSampleButton>
            </S.SampleAccounts>
          )}
        </S.SampleDataSection>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default Login;
