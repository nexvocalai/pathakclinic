package com.pathak.clinic.controller;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    public record ErrorResponse(boolean success, int status, String message, List<FieldError> errors) {}
    public record FieldError(String field, String message) {}

    @ExceptionHandler(EntityNotFoundException.class)
    ResponseEntity<ErrorResponse> notFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(false, 404, ex.getMessage(), List.of()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException ex) {
        var errors = ex.getFieldErrors().stream().map(e -> new FieldError(e.getField(), e.getDefaultMessage())).toList();
        return ResponseEntity.badRequest().body(new ErrorResponse(false, 400, "Validation failed", errors));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ErrorResponse> generic(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(false, 400, ex.getMessage(), List.of()));
    }
}
