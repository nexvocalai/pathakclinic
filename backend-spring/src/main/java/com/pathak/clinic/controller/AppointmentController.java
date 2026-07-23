package com.pathak.clinic.controller;

import com.pathak.clinic.dto.*;
import com.pathak.clinic.entity.Payment;
import com.pathak.clinic.service.AppointmentService;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public Page<AppointmentDto> all(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return appointmentService.getAll(PageRequest.of(page, size, Sort.by("appointmentDate").descending()));
    }

    @PostMapping
    public AppointmentDto create(@RequestBody CreateAppointmentRequest request) {
        return appointmentService.create(request);
    }

    @GetMapping("/{id}")
    public AppointmentDto get(@PathVariable UUID id) {
        return appointmentService.get(id);
    }

    @PatchMapping("/{id}/status")
    public AppointmentDto updateStatus(@PathVariable UUID id, @RequestBody StatusRequest request) {
        return appointmentService.updateStatus(id, request.status());
    }

    @PatchMapping("/{id}/notes")
    public AppointmentDto updateNotes(@PathVariable UUID id, @RequestBody NotesRequest request) {
        return appointmentService.updateNotes(id, request.notes());
    }

    @PostMapping("/{id}/payment")
    public Payment recordPayment(@PathVariable UUID id, @RequestBody PaymentRequest request) {
        return appointmentService.recordPayment(id, request.amount(), request.method());
    }
}
