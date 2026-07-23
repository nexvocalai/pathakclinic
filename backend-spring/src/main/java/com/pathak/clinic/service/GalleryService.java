package com.pathak.clinic.service;

import com.pathak.clinic.dto.GalleryDto;
import com.pathak.clinic.entity.GalleryItem;
import com.pathak.clinic.repository.GalleryRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GalleryService {
    private final GalleryRepository galleryRepository;
    private final StorageService storageService;

    public GalleryService(GalleryRepository galleryRepository, StorageService storageService) {
        this.galleryRepository = galleryRepository;
        this.storageService = storageService;
    }

    @Transactional(readOnly = true)
    public List<GalleryDto> getAll(String category) {
        List<GalleryItem> list = (category == null || category.isBlank() || category.equalsIgnoreCase("ALL"))
                ? galleryRepository.findAllByOrderByCreatedAtDesc()
                : galleryRepository.findByCategoryIgnoreCaseOrderByCreatedAtDesc(category);
        return list.stream().map(GalleryDto::from).toList();
    }

    @Transactional
    public GalleryDto create(String title, String category, String description, MultipartFile image) throws IOException {
        var item = new GalleryItem();
        item.setTitle(title);
        item.setCategory(category == null || category.isBlank() ? "CLINIC" : category.toUpperCase());
        item.setDescription(description);
        
        if (image != null && !image.isEmpty()) {
            item.setImageUrl(storageService.store(image, "gallery"));
        } else {
            item.setImageUrl("/images/clinic-placeholder.jpg");
        }
        
        return GalleryDto.from(galleryRepository.save(item));
    }

    @Transactional
    public void delete(UUID id) {
        var item = galleryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Gallery item not found"));
        galleryRepository.delete(item);
    }
}
