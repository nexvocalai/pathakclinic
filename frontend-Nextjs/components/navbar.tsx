"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Our Programs" },
  { href: "/services", label: "Wellness Assessment" },
  { href: "/admin/login", label: "Patient Portal" },
  { href: "/blog", label: "Blog" },
  { href: "/appointment", label: "Contact Us" },
];

export function Navbar() {
  return (
    <header className="hidden md:block sticky top-0 z-50 w-full bg-white border-b border-border/40 shadow-sm">
      {/* Top bar with phone */}
      <div className="border-b border-border/30">
        <div className="container mx-auto flex items-center justify-end px-6 py-1.5">
          <a
            href="tel:+916394951471"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[var(--color-green)]" />
            6394951471
          </a>
        </div>
      </div>

      {/* Main nav */}
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
        <nav className="flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--color-navy)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/appointment"
            className="ml-2 rounded-md bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-light)]"
          >
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
