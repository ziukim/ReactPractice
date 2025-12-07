import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import ProtectedRoute from '../components/ProtectedRoute';
import './MyPage.css';

const MyPage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상이어야 합니다.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 변경 시에만 검증
    if (formData.newPassword || formData.newPasswordConfirm) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword = '비밀번호는 6자 이상이어야 합니다.';
      }

      if (formData.newPassword !== formData.newPasswordConfirm) {
        newErrors.newPasswordConfirm = '새 비밀번호가 일치하지 않습니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const users = storage.getUsers();
      const currentUser = users.find((u) => u.id === user.id);

      // 현재 비밀번호 확인 (비밀번호 변경 시)
      if (formData.currentPassword) {
        if (currentUser.password !== formData.currentPassword) {
          setErrors({ currentPassword: '현재 비밀번호가 올바르지 않습니다.' });
          setIsSubmitting(false);
          return;
        }
      }

      // 이메일 중복 체크 (다른 사용자가 사용 중인지)
      if (formData.email !== user.email) {
        const emailExists = users.some(
          (u) => u.email === formData.email && u.id !== user.id
        );
        if (emailExists) {
          setErrors({ email: '이미 사용 중인 이메일입니다.' });
          setIsSubmitting(false);
          return;
        }
      }

      // 사용자 정보 업데이트
      const updatedUser = {
        ...currentUser,
        nickname: formData.nickname,
        email: formData.email,
        password: formData.newPassword || currentUser.password,
        updatedAt: new Date().toISOString(),
      };

      // 사용자 목록 업데이트
      const updatedUsers = users.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      storage.saveUsers(updatedUsers);

      // Context 업데이트 (비밀번호 제외)
      const { password, ...userWithoutPassword } = updatedUser;
      updateUser(userWithoutPassword);

      alert('정보가 수정되었습니다!');
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }));
    } catch (error) {
      console.error('정보 수정 오류:', error);
      alert('정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      nickname: user?.nickname || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    });
    setErrors({});
  };

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="mypage-container">
        <div className="mypage-card">
          <h1>마이페이지</h1>

          {!isEditing ? (
            <div className="user-info-view">
              <div className="info-section">
                <h2>내 정보</h2>
                <div className="info-item">
                  <span className="label">사용자명:</span>
                  <span className="value">{user.username}</span>
                </div>
                <div className="info-item">
                  <span className="label">닉네임:</span>
                  <span className="value">{user.nickname}</span>
                </div>
                <div className="info-item">
                  <span className="label">이메일:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">가입일:</span>
                  <span className="value">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                정보 수정
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <h2>정보 수정</h2>

              <div className="form-group">
                <label htmlFor="username">사용자명</label>
                <input
                  type="text"
                  id="username"
                  value={user.username}
                  disabled
                  className="disabled-input"
                />
                <p className="help-text">사용자명은 변경할 수 없습니다.</p>
              </div>

              <div className="form-group">
                <label htmlFor="nickname">닉네임 *</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="닉네임을 입력해주세요"
                  className={errors.nickname ? 'error' : ''}
                />
                {errors.nickname && (
                  <span className="error-message">{errors.nickname}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력해주세요"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="password-section">
                <h3>비밀번호 변경 (선택사항)</h3>

                <div className="form-group">
                  <label htmlFor="currentPassword">현재 비밀번호</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="비밀번호 변경 시 입력"
                    className={errors.currentPassword ? 'error' : ''}
                  />
                  {errors.currentPassword && (
                    <span className="error-message">
                      {errors.currentPassword}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">새 비밀번호</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="6자 이상"
                    className={errors.newPassword ? 'error' : ''}
                  />
                  {errors.newPassword && (
                    <span className="error-message">{errors.newPassword}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="newPasswordConfirm">새 비밀번호 확인</label>
                  <input
                    type="password"
                    id="newPasswordConfirm"
                    name="newPasswordConfirm"
                    value={formData.newPasswordConfirm}
                    onChange={handleChange}
                    placeholder="새 비밀번호를 다시 입력해주세요"
                    className={errors.newPasswordConfirm ? 'error' : ''}
                  />
                  {errors.newPasswordConfirm && (
                    <span className="error-message">
                      {errors.newPasswordConfirm}
                    </span>
                  )}
                </div>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '저장 중...' : '저장'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyPage;
