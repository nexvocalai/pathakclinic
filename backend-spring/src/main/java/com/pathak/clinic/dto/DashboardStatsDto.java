package com.pathak.clinic.dto;

import java.math.BigDecimal;

public record DashboardStatsDto(long totalPatients, long totalAppointments, BigDecimal monthlyRevenue, double revenueGrowth) {
}
