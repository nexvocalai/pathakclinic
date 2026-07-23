import { Clock, MapPin, Phone } from "lucide-react";

export function ClinicInfo() {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          Clinic Information
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">Clinic Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Saturday
              <br />
              5:00 PM - 9:00 PM
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">Location</h3>
            <p className="text-sm text-muted-foreground">
              G06, Tower F7
              <br />
              Centurian Park Terrace Homes
              <br />
              Tech Zone IV, Greater Noida West
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Phone: +91 6394951471
              <br />
              WhatsApp: +91 6394951471
              <br />
               Email: drratipathak@gmail.com
            </p>
          </div>
        </div>

        {/* Google Maps Placeholder */}
        {/* ✅ Google Maps Embed */}
        <div className="mt-10">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.041750842154!2d77.43742397464776!3d28.598524275683292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefa9f284aed3%3A0xec91191f7fad79d5!2sPathak%20Homoeopathic%20Clinic!5e0!3m2!1sen!2sin!4v1778235002250!5m2!1sen!2sin"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
