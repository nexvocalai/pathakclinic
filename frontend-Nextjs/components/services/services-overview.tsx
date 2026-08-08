import Image from "next/image";
import {
  Heart,
  Sparkles,
  Wind,
  Baby,
  Brain,
  Activity,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Chronic Diseases",
    description:
      "Effective treatment for long-standing health issues including autoimmune disorders, diabetes management, thyroid conditions, and recurring health problems that conventional medicine struggles to resolve.",
    conditions: [
      "Autoimmune disorders",
      "Thyroid conditions",
      "Diabetes management",
      "Hypertension",
    ],
    image: "/images/chronic-diseases.jpg",
  },
  {
    icon: Sparkles,
    title: "Skin & Hair Disorders",
    description:
      "Natural solutions for various dermatological conditions including eczema, psoriasis, acne, hair loss, and other skin problems without the use of steroids or harsh chemicals.",
    conditions: ["Eczema & Psoriasis", "Acne & Pimples", "Hair loss", "Vitiligo"],
    image: "/images/skin-disorders.jpg",
  },
  {
    icon: Wind,
    title: "Allergy & Asthma",
    description:
      "Comprehensive treatment for respiratory allergies, food sensitivities, hay fever, and asthma. We focus on reducing sensitivity and building immunity naturally.",
    conditions: [
      "Seasonal allergies",
      "Food allergies",
      "Asthma",
      "Sinusitis",
    ],
    image: "/images/allergy-asthma.jpg",
  },
  {
    icon: Baby,
    title: "Women's Wellness",
    description:
      "Specialized care for women's health issues including PCOS, menstrual disorders, hormonal imbalances, fertility support, and menopause management.",
    conditions: [
      "PCOS",
      "Menstrual disorders",
      "Fertility support",
      "Menopause care",
    ],
    image: "/images/womens-health.jpg",
  },
  {
    icon: Baby,
    title: "Child Care",
    description:
      "Gentle and safe homoeopathic treatment for childrens health issues including recurrent infections, growth concerns, behavioral issues, and developmental support.",
    conditions: [
      "Recurrent infections",
      "Growth issues",
      "Behavioral concerns",
      "Immunity building",
    ],
    image: "/images/child-care.jpg",
  },
  {
    icon: Brain,
    title: "Stress & Mental Health",
    description:
      "Holistic treatment for stress-related disorders, anxiety, depression, insomnia, and other mental health concerns through safe, non-addictive remedies.",
    conditions: ["Anxiety & Stress", "Depression", "Sleep disorders", "Fatigue"],
    image: "/images/mental-health.jpg",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">
              Our Services
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Comprehensive Homoeopathic Care
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We offer specialized treatment for a wide range of health conditions
            using time-tested homoeopathic principles and personalized care
            plans.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="relative h-40 w-full overflow-hidden bg-muted">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.conditions.map((condition, i) => (
                    <span
                      key={i}
                      className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
