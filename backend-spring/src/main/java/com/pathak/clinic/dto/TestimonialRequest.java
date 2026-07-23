package com.pathak.clinic.dto;

public record TestimonialRequest(String name, String conditionTreated, String testimonialText, Integer rating, String imageUrl) {
}
