package com.pathak.clinic.controller;

import com.pathak.clinic.dto.LoginRequest;
import com.pathak.clinic.dto.LoginResponse;
import com.pathak.clinic.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request.email(), request.password());
    }

    @PostMapping("/logout")
    public void logout() {
    }
}
