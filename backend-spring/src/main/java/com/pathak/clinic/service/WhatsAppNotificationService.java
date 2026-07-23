package com.pathak.clinic.service;

import com.pathak.clinic.entity.Appointment;
import com.pathak.clinic.entity.Patient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class WhatsAppNotificationService {
    private static final Logger log = LoggerFactory.getLogger(WhatsAppNotificationService.class);

    @Value("${app.whatsapp.doctor-phone:917023961282}")
    private String doctorPhone;

    @Value("${app.whatsapp.api-url:}")
    private String whatsappApiUrl;

    @Value("${app.whatsapp.api-token:}")
    private String whatsappApiToken;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    @Async
    public void sendNewAppointmentAlert(Patient patient, Appointment appointment) {
        String message = String.format(
                "🚨 NEW WEBSITE APPOINTMENT CREATED 🚨\n" +
                "👤 Patient: %s\n" +
                "📞 Phone: %s\n" +
                "🩺 Concern: %s\n" +
                "📅 Date: %s\n" +
                "⏰ Time: %s",
                patient.getName(),
                patient.getPhone(),
                appointment.getReason(),
                appointment.getAppointmentDate(),
                appointment.getTimeSlot()
        );

        log.info("==========================================");
        log.info("SERVER-SIDE WHATSAPP ALERT TRIGGERED FOR DOCTOR (+{})", doctorPhone);
        log.info("Message:\n{}", message);
        log.info("==========================================");

        if (whatsappApiUrl != null && !whatsappApiUrl.isBlank()) {
            try {
                // Meta WhatsApp Cloud API Payload Format
                String payload = String.format(
                        "{\"messaging_product\": \"whatsapp\", \"to\": \"%s\", \"type\": \"text\", \"text\": {\"body\": \"%s\"}}", 
                        doctorPhone, 
                        message.replace("\n", "\\n").replace("\"", "\\\"")
                );

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(whatsappApiUrl))
                        .header("Content-Type", "application/json")
                        .header("Authorization", "Bearer " + whatsappApiToken)
                        .POST(HttpRequest.BodyPublishers.ofString(payload))
                        .build();

                httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                        .thenAccept(res -> log.info("WhatsApp Gateway API response code: {}", res.statusCode()))
                        .exceptionally(ex -> {
                            log.error("Failed to send WhatsApp API request: {}", ex.getMessage());
                            return null;
                        });
            } catch (Exception e) {
                log.error("Error dispatching WhatsApp notification: {}", e.getMessage());
            }
        }
    }
}
