"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronDown, Activity, MessageSquareQuote, BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [diseasesDropdownOpen, setDiseasesDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);

  const diseasesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mediaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDiseasesMouseEnter = () => {
    if (diseasesTimeoutRef.current) clearTimeout(diseasesTimeoutRef.current);
    setDiseasesDropdownOpen(true);
  };

  const handleDiseasesMouseLeave = () => {
    diseasesTimeoutRef.current = setTimeout(() => {
      setDiseasesDropdownOpen(false);
    }, 150);
  };

  const handleMediaMouseEnter = () => {
    if (mediaTimeoutRef.current) clearTimeout(mediaTimeoutRef.current);
    setMediaDropdownOpen(true);
  };

  const handleMediaMouseLeave = () => {
    mediaTimeoutRef.current = setTimeout(() => {
      setMediaDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="hidden md:block sticky top-0 z-50 w-full bg-white border-b border-border/40 shadow-sm">
      <div className="container mx-auto flex py-3 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Pathak Homoeopathic Clinic"
            width={800}
            height={260}
            className="w-[260px] h-auto object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)]"
          >
            Home
          </Link>

          <Link
            href="/programs"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)]"
          >
            Programs
          </Link>

          <Link
            href="/services"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)]"
          >
            Services
          </Link>

          {/* Diseases & Reviews Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleDiseasesMouseEnter}
            onMouseLeave={handleDiseasesMouseLeave}
          >
            <button
              onClick={() => setDiseasesDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)] py-1"
            >
              Diseases & Reviews
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  diseasesDropdownOpen ? "rotate-180 text-[var(--color-navy)]" : "text-muted-foreground"
                }`}
              />
            </button>

            {diseasesDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white border border-border/60 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={handleDiseasesMouseEnter}
                onMouseLeave={handleDiseasesMouseLeave}
              >
                <Link
                  href="/diseases"
                  onClick={() => setDiseasesDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-slate-50 hover:text-[var(--color-navy)] transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-sage)]/40 text-[var(--color-green)] shrink-0">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[var(--color-navy)]">Diseases We Treat</div>
                    <div className="text-[11px] text-muted-foreground">Conditions & ailments</div>
                  </div>
                </Link>

                <Link
                  href="/testimonials"
                  onClick={() => setDiseasesDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-slate-50 hover:text-[var(--color-navy)] transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-sage)]/40 text-[var(--color-green)] shrink-0">
                    <MessageSquareQuote className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[var(--color-navy)]">Testimonials</div>
                    <div className="text-[11px] text-muted-foreground">Patient reviews & stories</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Media Dropdown (Blog & Highlights) */}
          <div
            className="relative"
            onMouseEnter={handleMediaMouseEnter}
            onMouseLeave={handleMediaMouseLeave}
          >
            <button
              onClick={() => setMediaDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)] py-1"
            >
              Media
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mediaDropdownOpen ? "rotate-180 text-[var(--color-navy)]" : "text-muted-foreground"
                }`}
              />
            </button>

            {mediaDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white border border-border/60 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={handleMediaMouseEnter}
                onMouseLeave={handleMediaMouseLeave}
              >
                <Link
                  href="/blog"
                  onClick={() => setMediaDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-slate-50 hover:text-[var(--color-navy)] transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-sage)]/40 text-[var(--color-green)] shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[var(--color-navy)]">Blog</div>
                    <div className="text-[11px] text-muted-foreground">Health & wellness articles</div>
                  </div>
                </Link>

                <Link
                  href="/gallery"
                  onClick={() => setMediaDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-slate-50 hover:text-[var(--color-navy)] transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-sage)]/40 text-[var(--color-green)] shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[var(--color-navy)]">Highlights</div>
                    <div className="text-[11px] text-muted-foreground">Photos & clinic events</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)]"
          >
            About
          </Link>

          <Link
            href="/appointment"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)]"
          >
            Contact
          </Link>

          <Link
            href="/appointment"
            className="ml-2 rounded-md bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-light)] shadow-sm"
          >
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
