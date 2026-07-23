"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Single header — always renders, CSS handles mobile/desktop visibility */}
      <header className="sticky top-0 z-[9999] w-full bg-background border-b border-border shadow-sm md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Pathak Homoeopathic"
              width={400}
              height={130}
              className="w-[180px] h-auto object-contain"
              priority
            />
          </Link>

          {/* Hamburger — use <a> to avoid mobile double-fire bug */}
          <a
            href="javascript:void(0)"
            role="button"
            aria-label="Toggle navigation menu"
            onClick={(e) => {
              e.preventDefault();
              // Log to server terminal for debugging
              fetch("/api/debug?event=hamburger-click").catch(() => {});
              console.log("[MobileNavbar] hamburger clicked, isOpen:", !isOpen);
              setIsOpen((prev) => !prev);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--card)",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              textDecoration: "none",
            }}
          >
            {isOpen ? (
              <X style={{ width: 28, height: 28, color: "var(--foreground)", pointerEvents: "none" }} />
            ) : (
              <Menu style={{ width: 28, height: 28, color: "var(--foreground)", pointerEvents: "none" }} />
            )}
          </a>
        </div>
      </header>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-background flex flex-col pt-20 px-6 pb-6 overflow-y-auto"
          style={{ top: 0 }}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-foreground py-4 border-b border-border/50 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-6 py-6 text-lg">
              <Link href="/appointment" onClick={() => setIsOpen(false)}>
                Book Appointment
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
