package com.pathak.clinic.controller;

import com.pathak.clinic.dto.TestimonialRequest;
import com.pathak.clinic.entity.Testimonial;
import com.pathak.clinic.repository.TestimonialRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {
    private final TestimonialRepository testimonialRepository;

    public TestimonialController(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @GetMapping
    public List<Testimonial> published() {
        return testimonialRepository.findByApprovedTrueAndPublishedTrue();
    }

    @GetMapping("/unapproved")
    public List<Testimonial> unapproved() {
        return testimonialRepository.findByApprovedFalse();
    }

    @GetMapping("/{id}")
    public Testimonial get(@PathVariable UUID id) {
        return find(id);
    }

    @PostMapping
    public Testimonial create(@RequestBody TestimonialRequest request) {
        var testimonial = new Testimonial();
        testimonial.setName(request.name());
        testimonial.setConditionTreated(request.conditionTreated());
        testimonial.setTestimonialText(request.testimonialText());
        testimonial.setRating(request.rating());
        testimonial.setImageUrl(request.imageUrl());
        testimonial.setApproved(false);
        testimonial.setPublished(true);
        return testimonialRepository.save(testimonial);
    }

    @PutMapping("/{id}")
    public Testimonial update(@PathVariable UUID id, @RequestBody TestimonialRequest request) {
        var testimonial = find(id);
        testimonial.setName(request.name());
        testimonial.setConditionTreated(request.conditionTreated());
        testimonial.setTestimonialText(request.testimonialText());
        testimonial.setRating(request.rating());
        testimonial.setImageUrl(request.imageUrl());
        return testimonialRepository.save(testimonial);
    }

    @PatchMapping("/{id}/approve")
    public Testimonial approve(@PathVariable UUID id) {
        var testimonial = find(id);
        testimonial.setApproved(true);
        return testimonialRepository.save(testimonial);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        testimonialRepository.delete(find(id));
    }

    private Testimonial find(UUID id) {
        return testimonialRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Testimonial not found"));
    }
}
