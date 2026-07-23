package com.pathak.clinic.dto;

import com.pathak.clinic.entity.GalleryItem;
import java.time.LocalDateTime;
import java.util.UUID;

public record GalleryDto(
        UUID id,
        String title,
        String category,
        String description,
        String imageUrl,
        LocalDateTime createdAt
) {
    public static GalleryDto from(GalleryItem item) {
        return new GalleryDto(
                item.getId(),
                item.getTitle(),
                item.getCategory(),
                item.getDescription(),
                item.getImageUrl(),
                item.getCreatedAt()
        );
    }
}
