package com.pathak.clinic.controller;

import com.pathak.clinic.dto.DiseaseDto;
import com.pathak.clinic.service.DiseaseService;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {
    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping
    public Page<DiseaseDto> all(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
                                @RequestParam(required = false) String category) {
        return diseaseService.getAll(PageRequest.of(page, size, Sort.by("name")), category);
    }

    @GetMapping("/search")
    public List<DiseaseDto> search(@RequestParam(defaultValue = "") String q) {
        return diseaseService.search(q);
    }

    @GetMapping("/category/{category}")
    public Page<DiseaseDto> byCategory(@PathVariable String category,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10") int size) {
        return diseaseService.getAll(PageRequest.of(page, size, Sort.by("name")), category);
    }

    @GetMapping("/{slug}")
    public DiseaseDto bySlug(@PathVariable String slug) {
        return diseaseService.getBySlug(slug);
    }

    @PostMapping
    public DiseaseDto create(@RequestParam String name, @RequestParam String category, @RequestParam String description,
                             @RequestParam String symptoms, @RequestParam String causes, @RequestParam String remedies,
                             @RequestParam String precautions, @RequestParam String homoeopathicApproach,
                             @RequestParam(required = false) String duration, @RequestParam(required = false) String detailedInfo,
                             @RequestParam(required = false) String successRate,
                             @RequestPart(required = false) MultipartFile image) throws IOException {
        return diseaseService.create(name, category, description, symptoms, causes, remedies, precautions,
                homoeopathicApproach, duration, detailedInfo, successRate, image);
    }

    @PutMapping("/{id}")
    public DiseaseDto update(@PathVariable UUID id, @RequestParam(required = false) String name,
                             @RequestParam(required = false) String category, @RequestParam(required = false) String description,
                             @RequestParam(required = false) String symptoms, @RequestParam(required = false) String causes,
                             @RequestParam(required = false) String remedies, @RequestParam(required = false) String precautions,
                             @RequestParam(required = false) String homoeopathicApproach,
                             @RequestParam(required = false) String duration, @RequestParam(required = false) String detailedInfo,
                             @RequestParam(required = false) String successRate,
                             @RequestPart(required = false) MultipartFile image) throws IOException {
        return diseaseService.update(id, name, category, description, symptoms, causes, remedies, precautions,
                homoeopathicApproach, duration, detailedInfo, successRate, image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        diseaseService.delete(id);
    }
}
