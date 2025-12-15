package com.example.api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest {
    
    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 2, message = "닉네임은 2자 이상이어야 합니다.")
    private String nickname;
    
    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;
    
    private String currentPassword;
    
    @Size(min = 6, message = "비밀번호는 6자 이상이어야 합니다.")
    private String newPassword;
    
    private String newPasswordConfirm;
}

