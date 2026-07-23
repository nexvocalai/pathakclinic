import Image from "next/image";
import { Award, BookOpen, Users } from "lucide-react";

export function DoctorProfile() {
  return (
    <section className="space-y-12">
      {/* Doctor Profile Section */}
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/dr_rati_pathak.png"
            alt="Dr. Rati Pathak - Homoeopathic Doctor"
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dr. Rati Pathak</h1>
            <p className="mt-2 text-lg text-primary font-medium">
              Lead Homoeopathic Doctor & Wellness Expert
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Registration & Credentials</h3>
            <div className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-bold text-foreground">Reg. No:</span>{' '}
                  <span className="text-muted-foreground">H041373</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-bold text-foreground">Degree:</span>{' '}
                  <span className="text-muted-foreground">Bachelor of Homoeopathic Medicine and Surgery (B.H.M.S)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-bold text-foreground">Experience:</span>{' '}
                  <span className="text-muted-foreground">Expert Clinical Practice in Holistic Healing</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-bold text-foreground">Specialization:</span>{' '}
                  <span className="text-muted-foreground leading-relaxed">
                    Child Specialisation, PCOD, Respiratory Tract Infection, Skin Diseases, Hair Loss, Warts and Corns, Allergies, Gastric Problems, Sexual Health
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Approach to Healing</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dr. Rati Pathak firmly believes in treating the root cause of the ailment rather than merely suppressing the symptoms. With a deeply compassionate approach, she has helped countless patients achieve true, lasting wellness through highly personalized, constitutional homoeopathic treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-2xl font-bold text-foreground">3000+</h4>
          <p className="text-sm text-muted-foreground mt-1">Happy Patients</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-2xl font-bold text-foreground">5+</h4>
          <p className="text-sm text-muted-foreground mt-1">Years of Expertise</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-2xl font-bold text-foreground">100%</h4>
          <p className="text-sm text-muted-foreground mt-1">Natural Treatment</p>
        </div>
      </div>
    </section>
  );
}
