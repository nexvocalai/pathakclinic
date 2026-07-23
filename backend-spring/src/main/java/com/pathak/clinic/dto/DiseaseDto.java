package com.pathak.clinic.dto;

import com.pathak.clinic.entity.Disease;
import java.util.List;
import java.util.UUID;

public record DiseaseDto(
        UUID id,
        String name,
        String slug,
        String category,
        String description,
        String image,
        String homoeopathicApproach,
        String duration,
        String detailedInfo,
        String successRate,
        List<String> symptoms,
        List<String> causes,
        List<String> remedies,
        List<String> precautions
) {
    public static DiseaseDto from(Disease disease) {
        return new DiseaseDto(disease.getId(), disease.getName(), disease.getSlug(), disease.getCategory(),
                disease.getDescription(), disease.getImage(), disease.getHomoeopathicApproach(),
                disease.getDuration(), disease.getDetailedInfo(), disease.getSuccessRate(),
                disease.getSymptoms(), disease.getCauses(), disease.getRemedies(), disease.getPrecautions());
    }
}
