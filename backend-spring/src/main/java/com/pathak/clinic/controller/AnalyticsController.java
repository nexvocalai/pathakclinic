package com.pathak.clinic.controller;

import com.pathak.clinic.dto.DashboardStatsDto;
import com.pathak.clinic.dto.RevenueDtos.MonthlyRevenueDto;
import com.pathak.clinic.dto.RevenueDtos.YearlyRevenueDto;
import com.pathak.clinic.service.AnalyticsService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/dashboard")
    public DashboardStatsDto dashboard(@RequestParam(required = false) Integer month, @RequestParam(required = false) Integer year) {
        return analyticsService.dashboard(month, year);
    }

    @GetMapping("/monthly-revenue")
    public List<MonthlyRevenueDto> monthlyRevenue(@RequestParam(required = false) Integer year) {
        return analyticsService.monthlyRevenue(year == null ? LocalDate.now().getYear() : year);
    }

    @GetMapping("/yearly-revenue")
    public List<YearlyRevenueDto> yearlyRevenue() {
        return analyticsService.yearlyRevenue();
    }
}
