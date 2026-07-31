"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown, Activity, MessageSquareQuote, BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [diseasesOpen, setDiseasesOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[9999] w-full bg-white border-b border-border shadow-sm md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Pathak Homoeopathic Clinic"
              width={400}
              height={130}
              className="w-[180px] h-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="tel:+916394951471"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </a>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[9998] bg-white flex flex-col pt-20 px-6 pb-6 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground py-3 border-b border-border/30 hover:text-[var(--color-navy)]"
            >
              Home
            </Link>

            <Link
              href="/programs"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground py-3 border-b border-border/30 hover:text-[var(--color-navy)]"
            >
              Programs
            </Link>

            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground py-3 border-b border-border/30 hover:text-[var(--color-navy)]"
            >
              Services
            </Link>

            {/* Mobile Submenu for Diseases & Reviews */}
            <div className="border-b border-border/30 py-3">
              <button
                onClick={() => setDiseasesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full text-lg font-medium text-foreground hover:text-[var(--color-navy)]"
              >
                <span>Diseases & Reviews</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    diseasesOpen ? "rotate-180 text-[var(--color-navy)]" : "text-muted-foreground"
                  }`}
                />
              </button>

              {diseasesOpen && (
                <div className="flex flex-col gap-2 pt-3 pl-4">
                  <Link
                    href="/diseases"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 text-base text-foreground/80 py-1.5 hover:text-[var(--color-navy)]"
                  >
                    <Activity className="h-4 w-4 text-[var(--color-green)]" />
                    Diseases We Treat
                  </Link>
                  <Link
                    href="/testimonials"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 text-base text-foreground/80 py-1.5 hover:text-[var(--color-navy)]"
                  >
                    <MessageSquareQuote className="h-4 w-4 text-[var(--color-green)]" />
                    Testimonials
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Submenu for Media */}
            <div className="border-b border-border/30 py-3">
              <button
                onClick={() => setMediaOpen((prev) => !prev)}
                className="flex items-center justify-between w-full text-lg font-medium text-foreground hover:text-[var(--color-navy)]"
              >
                <span>Media</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mediaOpen ? "rotate-180 text-[var(--color-navy)]" : "text-muted-foreground"
                  }`}
                />
              </button>

              {mediaOpen && (
                <div className="flex flex-col gap-2 pt-3 pl-4">
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 text-base text-foreground/80 py-1.5 hover:text-[var(--color-navy)]"
                  >
                    <BookOpen className="h-4 w-4 text-[var(--color-green)]" />
                    Blog
                  </Link>
                  <Link
                    href="/gallery"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 text-base text-foreground/80 py-1.5 hover:text-[var(--color-navy)]"
                  >
                    <Sparkles className="h-4 w-4 text-[var(--color-green)]" />
                    Highlights
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground py-3 border-b border-border/30 hover:text-[var(--color-navy)]"
            >
              About
            </Link>

            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground py-3 border-b border-border/30 hover:text-[var(--color-navy)]"
            >
              Contact
            </Link>

            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full rounded-md bg-[var(--color-navy)] py-3.5 text-center text-lg font-semibold text-white hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
