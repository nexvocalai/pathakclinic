import type { Metadata } from "next";
import { PhoneBooking } from "@/components/appointment/phone-booking";
import { WhatsAppBooking } from "@/components/appointment/whatsapp-booking";
import { AppointmentForm } from "@/components/appointment/appointment-form";
import { ClinicInfo } from "@/components/appointment/clinic-info";

export const metadata: Metadata = {
  title: "Book Appointment | Pathak Homoeopathic",
  description:
    "Book your homoeopathic consultation with Dr. Pathak. Choose between WhatsApp booking for instant response or fill out our appointment form. We are here to help you on your healing journey.",
};

export default function AppointmentPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Book an Appointment
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Take the first step towards natural healing. Choose your preferred
              way to book a consultation with us.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 py-8 bg-muted/10 rounded-lg">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <PhoneBooking />
            <WhatsAppBooking />
          </div>
        </div>
         <div className="container mx-auto px-4 md:px-6 py-8 bg-muted/10 rounded-lg">
          <div className="mx-auto grid max-w-5xl gap-8 ">
           <AppointmentForm />
          </div>
        </div>
        
      </section>

      <ClinicInfo />
    </>
  );
}
