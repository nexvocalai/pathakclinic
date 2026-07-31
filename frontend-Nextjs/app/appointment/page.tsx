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
      <div
        className="relative w-full h-[300px] md:h-[220px] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/testimonials-header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Blur + Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
            Book an Appointment
          </h1>

          <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
            Take the first step towards natural healing. Choose your preferred
            way to book a consultation with us.
          </p>
        </div>
      </div>

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
