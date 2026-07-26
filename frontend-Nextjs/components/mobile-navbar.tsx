"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
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

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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

            <a
              href="javascript:void(0)"
              role="button"
              aria-label="Toggle navigation menu"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((prev) => !prev);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
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
                <X style={{ width: 24, height: 24, color: "var(--foreground)", pointerEvents: "none" }} />
              ) : (
                <Menu style={{ width: 24, height: 24, color: "var(--foreground)", pointerEvents: "none" }} />
              )}
            </a>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-white flex flex-col pt-20 px-6 pb-6 overflow-y-auto"
          style={{ top: 0 }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground py-3.5 border-b border-border/30 hover:text-[var(--color-navy)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full rounded-md bg-[var(--color-navy)] py-4 text-center text-lg font-semibold text-white hover:bg-[var(--color-navy-light)] transition-colors"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
