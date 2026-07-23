package com.pathak.clinic.config;

import com.pathak.clinic.entity.*;
import com.pathak.clinic.entity.Appointment.AppointmentStatus;
import com.pathak.clinic.entity.Appointment.PaymentStatus;
import com.pathak.clinic.entity.Blog.BlogStatus;
import com.pathak.clinic.entity.Patient.Gender;
import com.pathak.clinic.repository.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(DoctorRepository doctors, PatientRepository patients, AppointmentRepository appointments,
                           PaymentRepository payments, BlogRepository blogs, DiseaseRepository diseases,
                           TestimonialRepository testimonials, PasswordEncoder passwordEncoder) {
        return args -> {
            if (doctors.count() > 0) {
                return;
            }

            var doctor = new Doctor();
            doctor.setName("Dr. Pathak");
            doctor.setEmail("doctor@pathak.com");
            doctor.setPassword(passwordEncoder.encode("password123"));
            doctor.setRegistrationNumber("HOM-PATHAK-001");
            doctor.setQualification("BHMS");
            doctor.setExperienceYears(15);
            doctor.setAbout("Experienced homoeopathic practitioner focused on constitutional treatment.");
            doctors.save(doctor);

            var patient1 = patient("Anita Sharma", "anita@example.com", "+919876543210", 34, Gender.FEMALE, "Indore, Madhya Pradesh");
            var patient2 = patient("Rahul Verma", "rahul@example.com", "+919812345670", 42, Gender.MALE, "Bhopal, Madhya Pradesh");
            patients.saveAll(List.of(patient1, patient2));

            var apt1 = appointment(patient1, doctor, LocalDate.now().plusDays(1), "10:30 AM", "Migraine and sleep disturbance", AppointmentStatus.SCHEDULED, BigDecimal.valueOf(500), PaymentStatus.PENDING);
            var apt2 = appointment(patient2, doctor, LocalDate.now().minusDays(5), "04:00 PM", "Joint stiffness and pain", AppointmentStatus.COMPLETED, BigDecimal.valueOf(700), PaymentStatus.PAID);
            appointments.saveAll(List.of(apt1, apt2));
            patient1.setTotalAppointments(1);
            patient2.setTotalAppointments(1);
            patient2.setTotalSpent(BigDecimal.valueOf(700));
            patients.saveAll(List.of(patient1, patient2));

            var payment = new Payment();
            payment.setAppointment(apt2);
            payment.setAmount(BigDecimal.valueOf(700));
            payment.setPaymentMethod("CASH");
            payment.setStatus("PAID");
            payment.setPaymentDate(LocalDateTime.now().minusDays(5));
            payments.save(payment);

            var blog = new Blog();
            blog.setTitle("How Homoeopathy Supports Long-Term Wellness");
            blog.setSlug("homoeopathy-long-term-wellness");
            blog.setExcerpt("A practical look at constitutional care and gentle long-term support.");
            blog.setContent("Homoeopathy focuses on the patient as a whole, considering physical symptoms, tendencies, and emotional context before prescribing.");
            blog.setCategory("General");
            blog.setFeatured(true);
            blog.setStatus(BlogStatus.PUBLISHED);
            blog.setPublishedAt(LocalDateTime.now().minusDays(3));
            blogs.save(blog);

            var disease = new Disease();
            disease.setName("Arthritis");
            disease.setSlug("arthritis");
            disease.setCategory("Joint & Bone Disorders");
            disease.setDescription("Arthritis includes joint pain, stiffness, inflammation, and reduced mobility that may affect daily activities.");
            disease.setSymptoms(List.of("Joint pain", "Swelling", "Morning stiffness", "Reduced mobility"));
            disease.setCauses(List.of("Age-related wear", "Inflammation", "Autoimmune tendency"));
            disease.setRemedies(List.of("Rhus Tox", "Bryonia", "Calcarea Carb"));
            disease.setPrecautions(List.of("Maintain gentle movement", "Avoid sudden strain", "Support healthy weight"));
            disease.setHomoeopathicApproach("Treatment is selected after understanding modalities, constitution, and symptom pattern.");
            disease.setDuration("3-6 months");
            disease.setDetailedInfo("Long-standing joint complaints need individualized assessment and periodic follow-up.");
            disease.setSuccessRate("75-85%");
            diseases.save(disease);

            var testimonial = new Testimonial();
            testimonial.setName("S. Mehta");
            testimonial.setConditionTreated("Chronic allergy");
            testimonial.setTestimonialText("The clinic helped me understand and manage my recurring allergy symptoms with patient follow-up.");
            testimonial.setRating(5);
            testimonial.setApproved(true);
            testimonial.setPublished(true);
            testimonials.save(testimonial);
        };
    }

    private Patient patient(String name, String email, String phone, int age, Gender gender, String address) {
        var patient = new Patient();
        patient.setName(name);
        patient.setEmail(email);
        patient.setPhone(phone);
        patient.setAge(age);
        patient.setGender(gender);
        patient.setAddress(address);
        patient.setMedicalHistory("");
        return patient;
    }

    private Appointment appointment(Patient patient, Doctor doctor, LocalDate date, String time, String reason,
                                    AppointmentStatus status, BigDecimal amount, PaymentStatus paymentStatus) {
        var appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(date);
        appointment.setTimeSlot(time);
        appointment.setReason(reason);
        appointment.setStatus(status);
        appointment.setAmount(amount);
        appointment.setPaymentStatus(paymentStatus);
        return appointment;
    }
}
