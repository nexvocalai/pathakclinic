package com.pathak.clinic.service;

import com.pathak.clinic.dto.DoctorDto;
import com.pathak.clinic.dto.LoginResponse;
import com.pathak.clinic.repository.DoctorRepository;
import com.pathak.clinic.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final DoctorRepository doctorRepository;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager, DoctorRepository doctorRepository, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.doctorRepository = doctorRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        var doctor = doctorRepository.findByEmail(email).orElseThrow();
        String token = jwtService.generateToken(email);
        return new LoginResponse(token, new DoctorDto(doctor.getId(), doctor.getName(), doctor.getEmail(), doctor.getRegistrationNumber(), token));
    }
}
