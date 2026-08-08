"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";
import Image from "next/image";

export function TestimonialsGrid() {
  return (
    <div className="space-y-10">

      {/* ✅ Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">
            4.6
          </p>
          <div className="flex justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-[#fbbc04] text-[#fbbc04]" : i === 4 ? "fill-[#fbbc04]/50 text-[#fbbc04]" : "fill-muted text-muted"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Google Maps Rating</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">30+</p>
          <p className="text-sm text-muted-foreground">Google Reviews</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">100%</p>
          <p className="text-sm text-muted-foreground">
            Authentic Patient Feedback
          </p>
        </div>
      </div>

      {/* ✅ Testimonials Grid (Google Maps Style UI) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Header: Avatar and Name */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground leading-tight">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {testimonial.date || "a few months ago"}
                </p>
              </div>
              <div className="ml-auto">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 opacity-70" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating
                        ? "fill-[#fbbc04] text-[#fbbc04]"
                        : "fill-muted text-muted"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-foreground leading-relaxed line-clamp-6">
              {testimonial.text}
            </p>

            {/* Condition Tag */}
            {testimonial.condition && (
              <div className="mt-4 inline-block rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground">
                Treated for: {testimonial.condition}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Google Maps Link */}
      <div className="mt-12 flex justify-center">
        <a
          href="https://g.page/r/CdV5rX8fGZHsEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
          Write a Review on Google
        </a>
      </div>

    </div>
  );
}
