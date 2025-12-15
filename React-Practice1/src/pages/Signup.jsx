import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import * as S from './Signup.styled';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // 사용자명 검사
    if (!formData.username.trim()) {
      newErrors.username = '사용자명을 입력해주세요.';
    } else if (formData.username.length < 3) {
      newErrors.username = '사용자명은 3자 이상이어야 합니다.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = '사용자명은 영문, 숫자, 언더스코어만 사용할 수 있습니다.';
    }

    // 이메일 검사
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    // 비밀번호 확인 검사
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    // 닉네임 검사
    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 중복 체크 함수
  const checkDuplicate = () => {
    const users = storage.getUsers();
    const newErrors = {};

    // 이메일 중복 체크
    const emailExists = users.some(user => user.email === formData.email);
    if (emailExists) {
      newErrors.email = '이미 사용 중인 이메일입니다.';
    }

    // 사용자명 중복 체크
    const usernameExists = users.some(user => user.username === formData.username);
    if (usernameExists) {
      newErrors.username = '이미 사용 중인 사용자명입니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return false;
    }

    return true;
  };

  // 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    if (!checkDuplicate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 새 사용자 생성
      const users = storage.getUsers();
      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // 실제로는 해시화해야 함
        nickname: formData.nickname,
        createdAt: new Date().toISOString(),
      };

      // 사용자 목록에 추가
      users.push(newUser);
      storage.saveUsers(users);

      // 성공 메시지 및 리다이렉트
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.SignupContainer>
      <S.SignupCard>
        <h1>회원가입</h1>
        <S.Subtitle>중고거래 플랫폼에 오신 것을 환영합니다!</S.Subtitle>

        <S.SignupForm onSubmit={handleSubmit}>
          <S.FormGroup>
            <label htmlFor="username">사용자명 *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="3자 이상, 영문/숫자/언더스코어만"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <S.ErrorMessage>{errors.username}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="email">이메일 *</label>
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
            <label htmlFor="nickname">닉네임 *</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="2자 이상"
              className={errors.nickname ? 'error' : ''}
            />
            {errors.nickname && <S.ErrorMessage>{errors.nickname}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="password">비밀번호 *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="6자 이상"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <S.ErrorMessage>{errors.password}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="passwordConfirm">비밀번호 확인 *</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력해주세요"
              className={errors.passwordConfirm ? 'error' : ''}
            />
            {errors.passwordConfirm && (
              <S.ErrorMessage>{errors.passwordConfirm}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.SubmitButton 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '가입 중...' : '회원가입'}
          </S.SubmitButton>
        </S.SignupForm>

        <S.LoginLink>
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
          </p>
        </S.LoginLink>
      </S.SignupCard>
    </S.SignupContainer>
  );
};

export default Signup;
