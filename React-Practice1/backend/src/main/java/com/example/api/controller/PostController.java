package com.example.api.controller;

import com.example.api.dto.ApiResponse;
import com.example.api.dto.post.PostCreateRequest;
import com.example.api.dto.post.PostResponse;
import com.example.api.dto.post.PostUpdateRequest;
import com.example.api.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    
    private final PostService postService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostResponse>>> getAllPosts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort) {
        List<PostResponse> posts = postService.getAllPosts(search, sort);
        return ResponseEntity.ok(ApiResponse.success(posts));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponse>> getPostById(@PathVariable Long id) {
        PostResponse post = postService.getPostById(id);
        return ResponseEntity.ok(ApiResponse.success(post));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<PostResponse>> createPost(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody PostCreateRequest request) {
        PostResponse post = postService.createPost(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("게시글이 등록되었습니다!", post));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponse>> updatePost(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody PostUpdateRequest request) {
        PostResponse post = postService.updatePost(id, userId, request);
        return ResponseEntity.ok(ApiResponse.success("게시글이 수정되었습니다!", post));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deletePost(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        postService.deletePost(id, userId);
        return ResponseEntity.ok(ApiResponse.success("게시글이 삭제되었습니다!", null));
    }
}

