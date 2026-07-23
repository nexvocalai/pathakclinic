"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/diseases", label: "Diseases" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex py-4 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Pathak Homoeopathic"
            width={800}
            height={260}
            className="w-[280px] h-auto object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/appointment">Book Appointment</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
