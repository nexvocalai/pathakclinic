import { Phone, Clock, CheckCircle2 } from "lucide-react";

const PHONE_NUMBER = "+916394951471";

const benefits = [
  {
    icon: Clock,
    title: "Instant Response",
    description: "Speak directly with our team during clinic hours",
  },
  {
    icon: CheckCircle2,
    title: "Personalized Guidance",
    description: "Discuss your health concerns and get expert advice",
  },
];

export function PhoneBooking() {
  return (
    <div className="space-y-6">
      {/* Direct Call Card */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
          <Phone className="h-8 w-8" />
        </div>

        <h3 className="mb-2 text-2xl font-semibold text-foreground">
          Direct Phone Call
        </h3>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Call us directly to book your appointment or discuss your health
          concerns with our experienced team.
        </p>

        <div className="mb-6 rounded-lg bg-white/50 p-4">
          <p className="mb-2 text-sm text-muted-foreground">Call us at:</p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <Phone className="h-6 w-6" />
            {PHONE_NUMBER}
          </a>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Clinic Hours</p>
              <p className="text-sm text-muted-foreground">
                Monday - Saturday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Sunday Hours</p>
              <p className="text-sm text-muted-foreground">
                10:00 AM - 2:00 PM (By Appointment Only)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Why Call Us?</h4>
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
              <benefit.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{benefit.title}</p>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
