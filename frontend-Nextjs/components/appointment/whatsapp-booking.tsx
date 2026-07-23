"use client";

import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "916394951471";

export function WhatsAppBooking() {
  const generateWhatsAppLink = () => {
    const message = `Hello, I would like to book an appointment at Pathak Homoeopathic.

Name: 
Concern: 
Preferred Date: `;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10">
        <MessageCircle className="h-7 w-7 text-[#25D366]" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Book via WhatsApp
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        The quickest way to book your appointment. Click the button below to
        open WhatsApp with a pre-filled message. Just add your details and send!
      </p>

      <div className="mb-6 rounded-lg bg-muted/50 p-4">
        <p className="text-sm font-medium text-foreground mb-2">
          Message Preview:
        </p>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {`Hello, I would like to book an appointment at Pathak Homoeopathic.

Name: [Your Name]
Concern: [Your Health Concern]
Preferred Date: [Your Preferred Date]`}
        </p>
      </div>

      <Button asChild size="lg" className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a]">
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        We typically respond within 30 minutes during clinic hours
      </p>
    </div>
  );
}
