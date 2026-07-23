package com.pathak.clinic.dto;

import java.math.BigDecimal;

public final class RevenueDtos {
    private RevenueDtos() {}
    public record MonthlyRevenueDto(String month, BigDecimal revenue, long appointments) {}
    public record YearlyRevenueDto(String year, BigDecimal revenue) {}
}
