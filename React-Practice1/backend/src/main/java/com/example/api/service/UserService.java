package com.example.api.service;

import com.example.api.dto.auth.AuthResponse;
import com.example.api.dto.auth.LoginRequest;
import com.example.api.dto.auth.SignupRequest;
import com.example.api.dto.user.UserResponse;
import com.example.api.dto.user.UserUpdateRequest;
import com.example.api.entity.User;
import com.example.api.exception.BadRequestException;
import com.example.api.exception.ResourceNotFoundException;
import com.example.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    
    private final UserRepository userRepository;
    
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        // 비밀번호 확인 검증
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new BadRequestException("비밀번호가 일치하지 않습니다.");
        }
        
        // 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("이미 사용 중인 이메일입니다.");
        }
        
        // 사용자명 중복 체크
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("이미 사용 중인 사용자명입니다.");
        }
        
        // 사용자 생성
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword()) // 실제로는 해시화해야 함
                .nickname(request.getNickname())
                .build();
        
        user = userRepository.save(user);
        
        // 토큰 생성 (간단한 UUID 기반)
        String token = "token_" + UUID.randomUUID().toString();
        
        return AuthResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .createdAt(user.getCreatedAt())
                .token(token)
                .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("이메일 또는 비밀번호가 올바르지 않습니다."));
        
        // 비밀번호 확인 (실제로는 해시 비교해야 함)
        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        
        // 토큰 생성
        String token = "token_" + UUID.randomUUID().toString();
        
        return AuthResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .createdAt(user.getCreatedAt())
                .token(token)
                .build();
    }
    
    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .createdAt(user.getCreatedAt())
                .build();
    }
    
    @Transactional
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        
        // 이메일 중복 체크 (다른 사용자가 사용 중인지)
        if (!user.getEmail().equals(request.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new BadRequestException("이미 사용 중인 이메일입니다.");
            }
        }
        
        // 비밀번호 변경 시 검증
        if (request.getNewPassword() != null && !request.getNewPassword().isEmpty()) {
            if (request.getCurrentPassword() == null || request.getCurrentPassword().isEmpty()) {
                throw new BadRequestException("현재 비밀번호를 입력해주세요.");
            }
            
            if (!user.getPassword().equals(request.getCurrentPassword())) {
                throw new BadRequestException("현재 비밀번호가 올바르지 않습니다.");
            }
            
            if (!request.getNewPassword().equals(request.getNewPasswordConfirm())) {
                throw new BadRequestException("새 비밀번호가 일치하지 않습니다.");
            }
            
            user.setPassword(request.getNewPassword());
        }
        
        // 정보 업데이트
        user.setNickname(request.getNickname());
        user.setEmail(request.getEmail());
        
        user = userRepository.save(user);
        
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .createdAt(user.getCreatedAt())
                .build();
    }
}

