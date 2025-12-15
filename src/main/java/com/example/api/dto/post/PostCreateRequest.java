package com.example.api.dto.post;

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
public class PostCreateRequest {
    
    @NotBlank(message = "제목을 입력해주세요.")
    @Size(min = 2, message = "제목은 2자 이상이어야 합니다.")
    private String title;
    
    @NotBlank(message = "내용을 입력해주세요.")
    @Size(min = 10, message = "내용은 10자 이상이어야 합니다.")
    private String content;
    
    private Long price;
    
    private String location;
    
    private String image;
}

