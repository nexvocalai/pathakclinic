
import Link from "next/link";
import { User, Award, Heart } from "lucide-react";

export function AboutDoctor() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          <div className="space-y-6">

            {/* ✅ CLICKABLE BADGE */}
            <Link href="/about" className="inline-block">
              <div className="inline-flex cursor-pointer items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 transition hover:bg-primary/20">
                <span className="text-sm font-medium text-primary">
                  About the Doctor
                </span>
              </div>
            </Link>

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Dedicated to Your Natural Wellness
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Dr. Pathak is a dedicated homoeopathic practitioner focused on
              safe, natural, and long-term healing. With years of experience in
              treating chronic and acute conditions, Dr. Pathak takes a holistic
              approach to healthcare, ensuring each patient receives
              individualized attention and a customized treatment plan.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Committed to the principles of classical homoeopathy, Dr. Pathak
              believes in treating the whole person, not just the disease,
              leading to lasting health improvements and overall well-being.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">7+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>

            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Patients Treated</div>
            </div>

            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
