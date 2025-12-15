package com.example.api.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private Long price;
    private String location;
    private String image;
    private Long author;
    private String authorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

