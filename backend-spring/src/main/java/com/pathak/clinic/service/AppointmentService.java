package com.pathak.clinic.service;

import com.pathak.clinic.dto.AppointmentDto;
import com.pathak.clinic.dto.CreateAppointmentRequest;
import com.pathak.clinic.entity.Appointment;
import com.pathak.clinic.entity.Appointment.AppointmentStatus;
import com.pathak.clinic.entity.Appointment.PaymentStatus;
import com.pathak.clinic.entity.Payment;
import com.pathak.clinic.entity.Patient;
import com.pathak.clinic.repository.DoctorRepository;
import com.pathak.clinic.repository.AppointmentRepository;
import com.pathak.clinic.repository.PaymentRepository;
import com.pathak.clinic.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PaymentRepository paymentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final WhatsAppNotificationService whatsAppNotificationService;
    private final TelegramNotificationService telegramNotificationService;

    public AppointmentService(AppointmentRepository appointmentRepository, PaymentRepository paymentRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, WhatsAppNotificationService whatsAppNotificationService, TelegramNotificationService telegramNotificationService) {
        this.appointmentRepository = appointmentRepository;
        this.paymentRepository = paymentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.whatsAppNotificationService = whatsAppNotificationService;
        this.telegramNotificationService = telegramNotificationService;
    }

    public Page<AppointmentDto> getAll(Pageable pageable) {
        return appointmentRepository.findAll(pageable).map(AppointmentDto::from);
    }

    public AppointmentDto get(UUID id) {
        return AppointmentDto.from(find(id));
    }

    @Transactional
    public AppointmentDto create(CreateAppointmentRequest request) {
        var doctor = doctorRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Doctor profile not configured"));
        var patient = new Patient();
        patient.setName(request.name());
        patient.setEmail(request.email());
        patient.setPhone(request.phone());
        patient.setAge(request.age());
        patient.setAddress(request.address());
        if (request.gender() != null && !request.gender().isBlank()) {
            patient.setGender(Patient.Gender.valueOf(request.gender().toUpperCase()));
        }
        patient.setTotalAppointments(1);
        patient = patientRepository.save(patient);

        var appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(request.preferredDate() == null ? java.time.LocalDate.now().plusDays(1) : request.preferredDate());
        appointment.setTimeSlot(request.preferredTime() == null ? "10:00 AM" : request.preferredTime());
        appointment.setReason(request.condition() == null ? request.message() : request.condition());
        appointment.setAmount(request.amount() == null ? BigDecimal.ZERO : request.amount());

        var savedAppointment = appointmentRepository.save(appointment);

        // Trigger backend WhatsApp & Telegram notifications for Doctor
        try {
            whatsAppNotificationService.sendNewAppointmentAlert(patient, savedAppointment);
        } catch (Exception ignored) {}

        try {
            telegramNotificationService.sendNewAppointmentAlert(patient, savedAppointment);
        } catch (Exception ignored) {}

        return AppointmentDto.from(savedAppointment);
    }

    @Transactional
    public AppointmentDto updateStatus(UUID id, String status) {
        var appointment = find(id);
        appointment.setStatus(AppointmentStatus.valueOf(status));
        return AppointmentDto.from(appointmentRepository.save(appointment));
    }

    @Transactional
    public AppointmentDto updateNotes(UUID id, String notes) {
        var appointment = find(id);
        appointment.setNotes(notes);
        return AppointmentDto.from(appointmentRepository.save(appointment));
    }

    @Transactional
    public Payment recordPayment(UUID id, BigDecimal amount, String method) {
        var appointment = find(id);
        appointment.setAmount(amount);
        appointment.setPaymentStatus(PaymentStatus.PAID);
        var savedAppointment = appointmentRepository.save(appointment);

        var payment = new Payment();
        payment.setAppointment(savedAppointment);
        payment.setAmount(amount);
        payment.setPaymentMethod(method == null ? "CASH" : method);
        payment.setStatus("PAID");
        payment.setPaymentDate(LocalDateTime.now());

        var patient = savedAppointment.getPatient();
        patient.setTotalSpent(patient.getTotalSpent().add(amount));
        patientRepository.save(patient);

        return paymentRepository.save(payment);
    }

    private Appointment find(UUID id) {
        return appointmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
    }
}
