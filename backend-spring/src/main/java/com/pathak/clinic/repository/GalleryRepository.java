package com.pathak.clinic.repository;

import com.pathak.clinic.entity.GalleryItem;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<GalleryItem, UUID> {
    List<GalleryItem> findByCategoryIgnoreCaseOrderByCreatedAtDesc(String category);
    List<GalleryItem> findAllByOrderByCreatedAtDesc();
}
