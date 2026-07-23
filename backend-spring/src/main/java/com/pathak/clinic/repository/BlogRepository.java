package com.pathak.clinic.repository;

import com.pathak.clinic.entity.Blog;
import com.pathak.clinic.entity.Blog.BlogStatus;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BlogRepository extends JpaRepository<Blog, UUID> {
    Optional<Blog> findBySlug(String slug);
    Page<Blog> findByStatus(BlogStatus status, Pageable pageable);
    Page<Blog> findByCategoryIgnoreCase(String category, Pageable pageable);

    @Query("select b from Blog b where lower(b.title) like lower(concat('%', :q, '%')) or lower(b.content) like lower(concat('%', :q, '%')) or lower(b.category) like lower(concat('%', :q, '%'))")
    Page<Blog> search(@Param("q") String query, Pageable pageable);
}
