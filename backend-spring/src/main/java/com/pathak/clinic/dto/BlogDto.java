package com.pathak.clinic.dto;

import com.pathak.clinic.entity.Blog;
import java.time.LocalDateTime;
import java.util.UUID;

public record BlogDto(
        UUID id,
        String title,
        String slug,
        String excerpt,
        String content,
        String category,
        String image,
        LocalDateTime publishedAt,
        String author,
        Boolean featured,
        Blog.BlogStatus status,
        Integer views
) {
    public static BlogDto from(Blog blog) {
        return new BlogDto(blog.getId(), blog.getTitle(), blog.getSlug(), blog.getExcerpt(), blog.getContent(),
                blog.getCategory(), blog.getImage(), blog.getPublishedAt(), blog.getAuthor(),
                blog.getFeatured(), blog.getStatus(), blog.getViews());
    }
}
