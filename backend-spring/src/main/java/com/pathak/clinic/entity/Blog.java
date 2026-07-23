package com.pathak.clinic.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "blogs", indexes = {
        @Index(name = "idx_blogs_slug", columnList = "slug"),
        @Index(name = "idx_blogs_status", columnList = "status")
})
public class Blog {
    public enum BlogStatus { DRAFT, PUBLISHED }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false, unique = true)
    private String slug;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @Column(columnDefinition = "TEXT")
    private String excerpt;
    private String category;
    private String author = "Dr. Pathak";
    @Column(name = "image_url")
    private String image;
    private Boolean featured = false;
    @Enumerated(EnumType.STRING)
    private BlogStatus status = BlogStatus.DRAFT;
    private Integer views = 0;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate
    void preUpdate() { updatedAt = LocalDateTime.now(); }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
    public BlogStatus getStatus() { return status; }
    public void setStatus(BlogStatus status) { this.status = status; }
    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }
    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
