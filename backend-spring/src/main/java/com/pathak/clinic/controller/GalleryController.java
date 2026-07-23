package com.pathak.clinic.controller;

import com.pathak.clinic.dto.GalleryDto;
import com.pathak.clinic.service.GalleryService;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public List<GalleryDto> all(@RequestParam(required = false) String category) {
        return galleryService.getAll(category);
    }

    @PostMapping
    public GalleryDto create(@RequestParam String title,
                             @RequestParam(required = false, defaultValue = "CLINIC") String category,
                             @RequestParam(required = false) String description,
                             @RequestPart(required = false) MultipartFile image) throws IOException {
        return galleryService.create(title, category, description, image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        galleryService.delete(id);
    }
}
