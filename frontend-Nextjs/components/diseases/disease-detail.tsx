import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, TrendingUp } from "lucide-react";
import { Disease } from "@/lib/diseases-data";

interface DiseaseDetailProps {
  disease: Disease;
}

export function DiseaseDetail({ disease }: DiseaseDetailProps) {
  return (
    <article className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/diseases"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Diseases
        </Link>

        <div className="flex gap-3">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            {disease.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {disease.name}
        </h1>

        <p className="text-lg text-muted-foreground">{disease.description}</p>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={disease.image}
          alt={disease.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-xl font-semibold text-foreground">
                {disease.successRate}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Treatment Duration</p>
              <p className="text-lg font-semibold text-foreground">
                {disease.duration}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Symptoms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Symptoms</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {disease.symptoms.map((symptom, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-foreground">{symptom}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Causes Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Underlying Causes</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {disease.causes.map((cause, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <p className="text-foreground">{cause}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Homoeopathic Approach */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Our Homoeopathic Approach
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          {disease.homoeopathicApproach}
        </p>
      </div>

      {/* Remedies Used */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Remedies</h2>
        <p className="text-muted-foreground">
          Our treatment plan typically includes one or more of these homoeopathic remedies,
          selected based on individual symptoms and constitution:
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {disease.remedies.map((remedy, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
              <span className="font-medium text-foreground">{remedy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Precautions Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Precautions & Lifestyle Tips</h2>
        <p className="text-muted-foreground">
          Following these precautions along with homoeopathic treatment will accelerate your healing process:
        </p>
        <div className="grid gap-2 md:grid-cols-2">
          {disease.precautions.map((precaution, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-foreground">{precaution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Information */}
      <div className="rounded-lg bg-card p-6 border border-border">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Treatment Details</h2>
        <p className="leading-relaxed text-foreground">{disease.detailedInfo}</p>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
        <h3 className="mb-3 text-2xl font-bold text-foreground">
          Ready to Start Your Healing Journey?
        </h3>
        <p className="mb-6 text-muted-foreground">
          Schedule a consultation with our homoeopathic doctor to discuss your specific case
        </p>
        <Link
          href="/appointment"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Book Your Appointment
        </Link>
      </div>
    </article>
  );
}
