import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const specializations = [
  {
    title: "Chronic Diseases",
    description: "Autoimmune disorders, thyroid, diabetes management, and hypertension",
    image: "/images/chronic-diseases.jpg",
    slug: "chronic-diseases",
  },
  {
    title: "Skin Disorders",
    description: "Eczema, psoriasis, acne, hair loss, and various dermatological conditions",
    image: "/images/skin-disorders.jpg",
    slug: "skin-health",
  },
  {
    title: "Allergies & Asthma",
    description: "Seasonal allergies, food sensitivities, hay fever, and respiratory issues",
    image: "/images/allergy-asthma.jpg",
    slug: "asthma",
  },
  {
    title: "Women's Health",
    description: "PCOS, menstrual disorders, fertility support, and menopause management",
    image: "/images/womens-health.jpg",
    slug: "pcos",
  },
  {
    title: "Pediatric Care",
    description: "Recurrent infections, growth concerns, and behavioral issues in children",
    image: "/images/child-care.jpg",
    slug: "anxiety-disorder",
  },
  {
    title: "Mental Health",
    description: "Anxiety, depression, stress-related disorders, and sleep issues",
    image: "/images/mental-health.jpg",
    slug: "insomnia",
  },
];

export function AreasSpecialization() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">
              Areas of Expertise
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Areas of Specialization
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Comprehensive homoeopathic solutions for various acute and chronic health
            conditions. Click on any specialty to explore detailed information.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specializations.map((spec, index) => (
            <Link key={index} href={`/diseases?category=${spec.title}`}>
              <div className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                  <Image
                    src={spec.image}
                    alt={spec.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {spec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {spec.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/diseases">
              View All Diseases & Conditions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
