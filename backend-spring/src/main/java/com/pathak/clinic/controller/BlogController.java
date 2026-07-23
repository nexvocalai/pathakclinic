package com.pathak.clinic.controller;

import com.pathak.clinic.dto.BlogDto;
import com.pathak.clinic.service.BlogService;
import java.io.IOException;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping({"/api/blogs", "/api/blog"})
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public Page<BlogDto> all(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
                             @RequestParam(required = false) String category) {
        return blogService.getAll(PageRequest.of(page, size, Sort.by("createdAt").descending()), category);
    }

    @GetMapping("/search")
    public Page<BlogDto> search(@RequestParam(defaultValue = "") String q,
                                @RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size) {
        return blogService.search(q, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    @GetMapping("/category/{category}")
    public Page<BlogDto> byCategory(@PathVariable String category,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        return blogService.getAll(PageRequest.of(page, size, Sort.by("createdAt").descending()), category);
    }

    @GetMapping("/{slug}")
    public BlogDto bySlug(@PathVariable String slug) {
        return blogService.getBySlug(slug);
    }

    @PostMapping
    public BlogDto create(@RequestParam String title, @RequestParam String slug, @RequestParam String content,
                          @RequestParam String excerpt, @RequestParam String category,
                          @RequestParam(defaultValue = "false") Boolean featured,
                          @RequestPart(required = false) MultipartFile image) throws IOException {
        return blogService.create(title, slug, content, excerpt, category, featured, image);
    }

    @PutMapping("/{id}")
    public BlogDto update(@PathVariable UUID id, @RequestParam(required = false) String title,
                          @RequestParam(required = false) String slug, @RequestParam(required = false) String content,
                          @RequestParam(required = false) String excerpt, @RequestParam(required = false) String category,
                          @RequestParam(required = false) Boolean featured,
                          @RequestPart(required = false) MultipartFile image) throws IOException {
        return blogService.update(id, title, slug, content, excerpt, category, featured, image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        blogService.delete(id);
    }

    @PatchMapping("/{id}/publish")
    public BlogDto publish(@PathVariable UUID id) {
        return blogService.publish(id);
    }
}
