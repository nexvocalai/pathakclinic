package com.pathak.clinic.controller;

import com.pathak.clinic.service.ReportService;
import java.time.LocalDate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/appointments")
    public ResponseEntity<byte[]> appointments(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate,
                                               @RequestParam(defaultValue = "csv") String format) {
        byte[] data = reportService.appointments(startDate, endDate, format);
        return file(data, "appointments." + format, format);
    }

    @GetMapping("/payments")
    public ResponseEntity<byte[]> payments(@RequestParam int month, @RequestParam int year,
                                           @RequestParam(defaultValue = "csv") String format) {
        byte[] data = reportService.payments(month, year, format);
        return file(data, "payments-" + year + "-" + month + "." + format, format);
    }

    private ResponseEntity<byte[]> file(byte[] data, String filename, String format) {
        MediaType mediaType = "pdf".equalsIgnoreCase(format) ? MediaType.APPLICATION_PDF : MediaType.parseMediaType("text/csv");
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(data);
    }
}
