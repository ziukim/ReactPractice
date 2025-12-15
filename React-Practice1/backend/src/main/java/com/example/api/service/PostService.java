package com.example.api.service;

import com.example.api.dto.post.PostCreateRequest;
import com.example.api.dto.post.PostResponse;
import com.example.api.dto.post.PostUpdateRequest;
import com.example.api.entity.Post;
import com.example.api.entity.User;
import com.example.api.exception.BadRequestException;
import com.example.api.exception.ResourceNotFoundException;
import com.example.api.repository.PostRepository;
import com.example.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    
    public List<PostResponse> getAllPosts(String searchTerm, String sortBy) {
        // 기본값 설정
        if (searchTerm == null) {
            searchTerm = "";
        }
        if (sortBy == null || sortBy.isEmpty()) {
            sortBy = "latest";
        }
        
        List<Post> posts = postRepository.findAllWithSearch(searchTerm);
        
        // 정렬 적용
        posts.sort((a, b) -> {
            switch (sortBy) {
                case "latest":
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                case "oldest":
                    return a.getCreatedAt().compareTo(b.getCreatedAt());
                case "priceHigh":
                    Long priceA = a.getPrice() != null ? a.getPrice() : 0L;
                    Long priceB = b.getPrice() != null ? b.getPrice() : 0L;
                    return priceB.compareTo(priceA);
                case "priceLow":
                    Long priceALow = a.getPrice() != null ? a.getPrice() : Long.MAX_VALUE;
                    Long priceBLow = b.getPrice() != null ? b.getPrice() : Long.MAX_VALUE;
                    return priceALow.compareTo(priceBLow);
                default:
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
            }
        });
        
        return posts.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public PostResponse getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));
        
        return convertToResponse(post);
    }
    
    @Transactional
    public PostResponse createPost(Long authorId, PostCreateRequest request) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .price(request.getPrice())
                .location(request.getLocation())
                .image(request.getImage())
                .author(authorId)
                .authorName(author.getNickname())
                .build();
        
        post = postRepository.save(post);
        
        return convertToResponse(post);
    }
    
    @Transactional
    public PostResponse updatePost(Long postId, Long userId, PostUpdateRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));
        
        // 작성자 확인
        if (!post.getAuthor().equals(userId)) {
            throw new BadRequestException("수정 권한이 없습니다.");
        }
        
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setPrice(request.getPrice());
        post.setLocation(request.getLocation());
        post.setImage(request.getImage());
        
        post = postRepository.save(post);
        
        return convertToResponse(post);
    }
    
    @Transactional
    public void deletePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));
        
        // 작성자 확인
        if (!post.getAuthor().equals(userId)) {
            throw new BadRequestException("삭제 권한이 없습니다.");
        }
        
        postRepository.delete(post);
    }
    
    private PostResponse convertToResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .price(post.getPrice())
                .location(post.getLocation())
                .image(post.getImage())
                .author(post.getAuthor())
                .authorName(post.getAuthorName())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}

