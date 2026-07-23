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
public class TelegramNotificationService {
    private static final Logger log = LoggerFactory.getLogger(TelegramNotificationService.class);

    @Value("${app.telegram.bot-token:}")
    private String botToken;

    @Value("${app.telegram.chat-id:}")
    private String chatId;

    private HttpClient createClient() {
        return HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    @Async
    public void sendNewAppointmentAlert(Patient patient, Appointment appointment) {
        if (botToken == null || botToken.isBlank() || chatId == null || chatId.isBlank()) {
            log.info("Telegram notification skipped: botToken or chatId not configured.");
            return;
        }

        String message = String.format(
                "🚨 <b>NEW WEBSITE APPOINTMENT CREATED</b> 🚨\n\n" +
                "👤 <b>Patient:</b> %s\n" +
                "📞 <b>Phone:</b> %s\n" +
                "🩺 <b>Concern:</b> %s\n" +
                "📅 <b>Date:</b> %s\n" +
                "⏰ <b>Time:</b> %s",
                escapeHtml(patient.getName()),
                escapeHtml(patient.getPhone()),
                escapeHtml(appointment.getReason()),
                appointment.getAppointmentDate(),
                escapeHtml(appointment.getTimeSlot())
        );

        log.info("==========================================");
        log.info("TELEGRAM NOTIFICATION TRIGGERED FOR CHAT ID ({})", chatId);
        log.info("Message:\n{}", message);
        log.info("==========================================");

        String telegramApiUrl = String.format("https://api.telegram.org/bot%s/sendMessage", botToken);
        String payload = String.format(
                "{\"chat_id\":\"%s\",\"text\":\"%s\",\"parse_mode\":\"HTML\"}",
                chatId,
                message.replace("\n", "\\n").replace("\"", "\\\"")
        );

        sendWithRetry(telegramApiUrl, payload, 2);
    }

    private void sendWithRetry(String url, String payload, int retriesLeft) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();

            createClient().sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(res -> log.info("Telegram API response code: {}", res.statusCode()))
                    .exceptionally(ex -> {
                        if (retriesLeft > 0) {
                            log.warn("Telegram API connection reset, retrying... (remaining attempts: {})", retriesLeft - 1);
                            sendWithRetry(url, payload, retriesLeft - 1);
                        } else {
                            log.error("Failed to send Telegram API request after retries: {}", ex.getMessage());
                        }
                        return null;
                    });
        } catch (Exception e) {
            log.error("Error dispatching Telegram notification: {}", e.getMessage());
        }
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;");
    }
}
