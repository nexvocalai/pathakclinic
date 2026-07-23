import Link from "next/link";
import { Leaf, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                Pathak Homoeopathic
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Natural healing through personalized homoeopathic care. Safe,
              effective, and side-effect-free treatment for the whole family.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/diseases"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Diseases
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/appointment"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +91 6394951471
                </span>
              </li>
               <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  G06, Tower F7, Centurian Park Terrace Homes Tech Zone IV, 
                  Greater Noida West 
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Mon - Sat: 5:00 PM - 9:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Connect With Us
            </h3>
            <a
              href="https://wa.me/916394951471?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Pathak%20Homoeopathic."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <p className="text-xs text-muted-foreground">
              Quick response within 30 minutes during clinic hours.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pathak Homoeopathic. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
