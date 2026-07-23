import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl text-balance">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="mb-8 text-primary-foreground/80 leading-relaxed">
            Take the first step towards natural, lasting health. Book your
            consultation today and discover the power of personalized
            homoeopathic care.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2 text-primary"
            >
              <Link href="/appointment">
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a
                href="https://wa.me/916394951471?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Pathak%20Homoeopathic."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
