package com.pathak.clinic.service;

import com.pathak.clinic.dto.BlogDto;
import com.pathak.clinic.entity.Blog;
import com.pathak.clinic.entity.Blog.BlogStatus;
import com.pathak.clinic.repository.BlogRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BlogService {
    private final BlogRepository blogRepository;
    private final StorageService storageService;

    public BlogService(BlogRepository blogRepository, StorageService storageService) {
        this.blogRepository = blogRepository;
        this.storageService = storageService;
    }

    public Page<BlogDto> getAll(Pageable pageable, String category) {
        Page<Blog> page = category == null || category.isBlank()
                ? blogRepository.findAll(pageable)
                : blogRepository.findByCategoryIgnoreCase(category, pageable);
        return page.map(BlogDto::from);
    }

    public Page<BlogDto> search(String query, Pageable pageable) {
        return blogRepository.search(query == null ? "" : query, pageable).map(BlogDto::from);
    }

    public BlogDto getBySlug(String slug) {
        var blog = blogRepository.findBySlug(slug).orElseThrow(() -> new EntityNotFoundException("Blog not found"));
        blog.setViews(blog.getViews() + 1);
        return BlogDto.from(blogRepository.save(blog));
    }

    @Transactional
    public BlogDto create(String title, String slug, String content, String excerpt, String category, Boolean featured, MultipartFile image) throws IOException {
        var blog = new Blog();
        blog.setTitle(title);
        blog.setSlug(slugify(slug == null || slug.isBlank() ? title : slug));
        blog.setContent(content);
        blog.setExcerpt(excerpt);
        blog.setCategory(category);
        blog.setFeatured(featured != null && featured);
        blog.setImage(storageService.store(image, "blogs"));
        return BlogDto.from(blogRepository.save(blog));
    }

    @Transactional
    public BlogDto update(UUID id, String title, String slug, String content, String excerpt, String category, Boolean featured, MultipartFile image) throws IOException {
        var blog = find(id);
        if (title != null) blog.setTitle(title);
        if (slug != null) blog.setSlug(slugify(slug));
        if (content != null) blog.setContent(content);
        if (excerpt != null) blog.setExcerpt(excerpt);
        if (category != null) blog.setCategory(category);
        if (featured != null) blog.setFeatured(featured);
        if (image != null && !image.isEmpty()) {
            blog.setImage(storageService.store(image, "blogs"));
        }
        return BlogDto.from(blogRepository.save(blog));
    }

    @Transactional
    public BlogDto publish(UUID id) {
        var blog = find(id);
        blog.setStatus(BlogStatus.PUBLISHED);
        blog.setPublishedAt(LocalDateTime.now());
        return BlogDto.from(blogRepository.save(blog));
    }

    public void delete(UUID id) {
        blogRepository.delete(find(id));
    }

    private Blog find(UUID id) {
        return blogRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Blog not found"));
    }

    private String slugify(String value) {
        return value.toLowerCase().trim().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
