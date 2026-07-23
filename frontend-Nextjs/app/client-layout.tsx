"use client";

import { Navbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Footer } from "@/components/footer";
import { CallButton } from "@/components/call-button";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CallButton />
      <WhatsAppButton />
    </>
  );
}