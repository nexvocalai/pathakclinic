package com.pathak.clinic.security;

import com.pathak.clinic.repository.DoctorRepository;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DoctorDetailsService implements UserDetailsService {
    private final DoctorRepository doctorRepository;

    public DoctorDetailsService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var doctor = doctorRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Doctor not found"));
        return new User(doctor.getEmail(), doctor.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_DOCTOR")));
    }
}
