"use client";

import { Phone } from "lucide-react";

const PHONE_NUMBER = "+916394951471";

export function CallButton() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Call us"
    >
      <Phone className="h-7 w-7" />
    </a>
  );
}
