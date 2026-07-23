package com.pathak.clinic.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.pathak.clinic.entity.Appointment;
import com.pathak.clinic.entity.Payment;
import com.pathak.clinic.repository.AppointmentRepository;
import com.pathak.clinic.repository.PaymentRepository;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    private final AppointmentRepository appointmentRepository;
    private final PaymentRepository paymentRepository;

    public ReportService(AppointmentRepository appointmentRepository, PaymentRepository paymentRepository) {
        this.appointmentRepository = appointmentRepository;
        this.paymentRepository = paymentRepository;
    }

    public byte[] appointments(LocalDate startDate, LocalDate endDate, String format) {
        var rows = appointmentRepository.findByAppointmentDateBetween(startDate, endDate);
        return "pdf".equalsIgnoreCase(format) ? pdf("Appointments Report", appointmentHtml(rows)) : appointmentCsv(rows);
    }

    public byte[] payments(int month, int year, String format) {
        YearMonth ym = YearMonth.of(year, month);
        var rows = paymentRepository.findByPaymentDateBetween(ym.atDay(1).atStartOfDay(), ym.atEndOfMonth().atTime(23, 59, 59));
        return "pdf".equalsIgnoreCase(format) ? pdf("Payments Report", paymentHtml(rows)) : paymentCsv(rows);
    }

    private byte[] appointmentCsv(List<Appointment> rows) {
        var csv = new StringBuilder("Patient,Phone,Date,Time,Reason,Status,Amount,Payment Status\n");
        for (var a : rows) {
            csv.append(escape(a.getPatient().getName())).append(',')
                    .append(escape(a.getPatient().getPhone())).append(',')
                    .append(a.getAppointmentDate()).append(',')
                    .append(escape(a.getTimeSlot())).append(',')
                    .append(escape(a.getReason())).append(',')
                    .append(a.getStatus()).append(',')
                    .append(a.getAmount()).append(',')
                    .append(a.getPaymentStatus()).append('\n');
        }
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    private byte[] paymentCsv(List<Payment> rows) {
        var csv = new StringBuilder("Patient,Date,Method,Amount,Status\n");
        for (var p : rows) {
            csv.append(escape(p.getAppointment().getPatient().getName())).append(',')
                    .append(p.getPaymentDate()).append(',')
                    .append(escape(p.getPaymentMethod())).append(',')
                    .append(p.getAmount()).append(',')
                    .append(p.getStatus()).append('\n');
        }
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    private String appointmentHtml(List<Appointment> rows) {
        var html = new StringBuilder(tableHeader("Patient", "Phone", "Date", "Status", "Amount"));
        for (var a : rows) {
            html.append("<tr><td>").append(a.getPatient().getName()).append("</td><td>").append(a.getPatient().getPhone())
                    .append("</td><td>").append(a.getAppointmentDate()).append("</td><td>").append(a.getStatus())
                    .append("</td><td>").append(a.getAmount()).append("</td></tr>");
        }
        return html.append("</table>").toString();
    }

    private String paymentHtml(List<Payment> rows) {
        var html = new StringBuilder(tableHeader("Patient", "Date", "Method", "Amount", "Status"));
        for (var p : rows) {
            html.append("<tr><td>").append(p.getAppointment().getPatient().getName()).append("</td><td>").append(p.getPaymentDate())
                    .append("</td><td>").append(p.getPaymentMethod()).append("</td><td>").append(p.getAmount())
                    .append("</td><td>").append(p.getStatus()).append("</td></tr>");
        }
        return html.append("</table>").toString();
    }

    private StringBuilder tableHeader(String... columns) {
        var html = new StringBuilder("<table><tr>");
        for (String column : columns) html.append("<th>").append(column).append("</th>");
        return html.append("</tr>");
    }

    private byte[] pdf(String title, String body) {
        try (var out = new ByteArrayOutputStream()) {
            String html = "<html><head><style>body{font-family:Arial}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px}th{background:#eef}</style></head><body><h1>"
                    + title + "</h1><p>Generated " + LocalDateTime.now() + "</p>" + body + "</body></html>";
            new PdfRendererBuilder().withHtmlContent(html, null).toStream(out).run();
            return out.toByteArray();
        } catch (Exception ex) {
            return (title + "\n\nUnable to render PDF: " + ex.getMessage()).getBytes(StandardCharsets.UTF_8);
        }
    }

    private String escape(String value) {
        String safe = value == null ? "" : value.replace("\"", "\"\"");
        return "\"" + safe + "\"";
    }
}
