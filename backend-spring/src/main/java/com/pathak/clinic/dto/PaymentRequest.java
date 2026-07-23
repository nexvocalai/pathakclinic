package com.pathak.clinic.dto;

import java.math.BigDecimal;

public record PaymentRequest(BigDecimal amount, String method) {
}
