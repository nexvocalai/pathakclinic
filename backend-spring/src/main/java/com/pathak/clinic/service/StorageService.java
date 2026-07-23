package com.pathak.clinic.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {
    private final Path uploadDir;

    public StorageService(@Value("${app.upload-dir}") String uploadDir) {
        this.uploadDir = Path.of(uploadDir);
    }

    public String store(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }
        String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "image" : file.getOriginalFilename());
        String extension = original.contains(".") ? original.substring(original.lastIndexOf('.')) : "";
        String filename = UUID.randomUUID() + extension;
        Path directory = uploadDir.resolve(folder);
        Files.createDirectories(directory);
        Files.copy(file.getInputStream(), directory.resolve(filename));
        return "/api/uploads/" + folder + "/" + filename;
    }
}
