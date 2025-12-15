package com.example.api.repository;

import com.example.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    @Query("SELECT p FROM Post p WHERE " +
           "(:searchTerm IS NULL OR :searchTerm = '' OR " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Post> findAllWithSearch(@Param("searchTerm") String searchTerm);
    
    List<Post> findByAuthor(Long author);
}

