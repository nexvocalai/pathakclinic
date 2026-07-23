package com.pathak.clinic.service;

import com.pathak.clinic.dto.DashboardStatsDto;
import com.pathak.clinic.dto.RevenueDtos.MonthlyRevenueDto;
import com.pathak.clinic.dto.RevenueDtos.YearlyRevenueDto;
import com.pathak.clinic.entity.Appointment;
import com.pathak.clinic.entity.Appointment.PaymentStatus;
import com.pathak.clinic.repository.AppointmentRepository;
import com.pathak.clinic.repository.PatientRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    public AnalyticsService(AppointmentRepository appointmentRepository, PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    public DashboardStatsDto dashboard(Integer month, Integer year) {
        LocalDate base = LocalDate.now();
        if (month != null && year != null) {
            base = LocalDate.of(year, month, 1);
        }
        BigDecimal current = monthlyRevenue(base);
        BigDecimal previous = monthlyRevenue(base.minusMonths(1));
        return new DashboardStatsDto(patientRepository.count(), appointmentRepository.count(), current, growth(current, previous));
    }

    public List<MonthlyRevenueDto> monthlyRevenue(int year) {
        List<MonthlyRevenueDto> data = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            YearMonth ym = YearMonth.of(year, month);
            var appointments = appointmentRepository.findByAppointmentDateBetweenAndPaymentStatus(ym.atDay(1), ym.atEndOfMonth(), PaymentStatus.PAID);
            BigDecimal revenue = appointments.stream().map(Appointment::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            data.add(new MonthlyRevenueDto(ym.format(DateTimeFormatter.ofPattern("MMM")), revenue, appointmentRepository.countByAppointmentDateBetween(ym.atDay(1), ym.atEndOfMonth())));
        }
        return data;
    }

    public List<YearlyRevenueDto> yearlyRevenue() {
        int thisYear = LocalDate.now().getYear();
        List<YearlyRevenueDto> data = new ArrayList<>();
        for (int year = thisYear - 4; year <= thisYear; year++) {
            var start = LocalDate.of(year, 1, 1);
            var end = LocalDate.of(year, 12, 31);
            BigDecimal revenue = appointmentRepository.findByAppointmentDateBetweenAndPaymentStatus(start, end, PaymentStatus.PAID)
                    .stream().map(Appointment::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
            data.add(new YearlyRevenueDto(String.valueOf(year), revenue));
        }
        return data;
    }

    private BigDecimal monthlyRevenue(LocalDate date) {
        YearMonth ym = YearMonth.from(date);
        return appointmentRepository.findByAppointmentDateBetweenAndPaymentStatus(ym.atDay(1), ym.atEndOfMonth(), PaymentStatus.PAID)
                .stream().map(Appointment::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private double growth(BigDecimal current, BigDecimal previous) {
        if (previous.compareTo(BigDecimal.ZERO) == 0) {
            return current.compareTo(BigDecimal.ZERO) > 0 ? 100.0 : 0.0;
        }
        return current.subtract(previous).multiply(BigDecimal.valueOf(100))
                .divide(previous, 2, RoundingMode.HALF_UP).doubleValue();
    }
}
