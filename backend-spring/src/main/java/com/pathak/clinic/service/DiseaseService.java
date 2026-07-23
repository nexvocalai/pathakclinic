package com.pathak.clinic.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathak.clinic.dto.DiseaseDto;
import com.pathak.clinic.entity.Disease;
import com.pathak.clinic.repository.DiseaseRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.data.domain.PageImpl;

@Service
public class DiseaseService {
    private final DiseaseRepository diseaseRepository;
    private final StorageService storageService;
    private final ObjectMapper objectMapper;

    public DiseaseService(DiseaseRepository diseaseRepository, StorageService storageService, ObjectMapper objectMapper) {
        this.diseaseRepository = diseaseRepository;
        this.storageService = storageService;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public Page<DiseaseDto> getAll(Pageable pageable, String category) {
        Page<Disease> page = category == null || category.isBlank()
                ? diseaseRepository.findAll(pageable)
                : diseaseRepository.findByCategoryIgnoreCase(category, pageable);
        List<DiseaseDto> dtos = page.getContent().stream().map(DiseaseDto::from).toList();
        return new PageImpl<>(dtos, pageable, page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public DiseaseDto getBySlug(String slug) {
        return DiseaseDto.from(diseaseRepository.findBySlug(slug).orElseThrow(() -> new EntityNotFoundException("Disease not found")));
    }

    @Transactional(readOnly = true)
    public List<DiseaseDto> search(String query) {
        return diseaseRepository.search(query == null ? "" : query).stream().map(DiseaseDto::from).toList();
    }

    @Transactional
    public DiseaseDto create(String name, String category, String description, String symptoms, String causes, String remedies,
                             String precautions, String homoeopathicApproach, String duration, String detailedInfo,
                             String successRate, MultipartFile image) throws IOException {
        var disease = new Disease();
        apply(disease, name, category, description, symptoms, causes, remedies, precautions, homoeopathicApproach, duration, detailedInfo, successRate, image);
        return DiseaseDto.from(diseaseRepository.save(disease));
    }

    @Transactional
    public DiseaseDto update(UUID id, String name, String category, String description, String symptoms, String causes, String remedies,
                             String precautions, String homoeopathicApproach, String duration, String detailedInfo,
                             String successRate, MultipartFile image) throws IOException {
        var disease = find(id);
        apply(disease, name, category, description, symptoms, causes, remedies, precautions, homoeopathicApproach, duration, detailedInfo, successRate, image);
        return DiseaseDto.from(diseaseRepository.save(disease));
    }

    public void delete(UUID id) {
        diseaseRepository.delete(find(id));
    }

    private void apply(Disease disease, String name, String category, String description, String symptoms, String causes, String remedies,
                       String precautions, String homoeopathicApproach, String duration, String detailedInfo,
                       String successRate, MultipartFile image) throws IOException {
        if (name != null) {
            disease.setName(name);
            disease.setSlug(slugify(name));
        }
        if (category != null) disease.setCategory(category);
        if (description != null) disease.setDescription(description);
        if (symptoms != null) disease.setSymptoms(parseList(symptoms));
        if (causes != null) disease.setCauses(parseList(causes));
        if (remedies != null) disease.setRemedies(parseList(remedies));
        if (precautions != null) disease.setPrecautions(parseList(precautions));
        if (homoeopathicApproach != null) disease.setHomoeopathicApproach(homoeopathicApproach);
        if (duration != null) disease.setDuration(duration);
        if (detailedInfo != null) disease.setDetailedInfo(detailedInfo);
        if (successRate != null) disease.setSuccessRate(successRate);
        
        if (image != null && !image.isEmpty()) {
            String storedImage = storageService.store(image, "diseases");
            if (storedImage != null) disease.setImage(storedImage);
        }
    }

    private Disease find(UUID id) {
        return diseaseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Disease not found"));
    }

    private List<String> parseList(String value) {
        try {
            return objectMapper.readValue(value, new TypeReference<List<String>>() {});
        } catch (Exception ignored) {
            var items = new ArrayList<String>();
            for (String item : value.split(",")) {
                if (!item.isBlank()) items.add(item.trim());
            }
            return items;
        }
    }

    private String slugify(String value) {
        return value.toLowerCase().trim().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
