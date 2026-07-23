import { DiseaseDetail } from "@/components/diseases/disease-detail";
import { getDiseaseBySlug } from "@/app/actions/diseases";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const disease = await getDiseaseBySlug(slug);

  if (!disease) {
    return {
      title: "Disease Not Found",
    };
  }

  return {
    title: `${disease.name} Treatment | Pathak Homoeopathic`,
    description: `Learn about homoeopathic treatment for ${disease.name}. ${disease.description} Symptoms, causes, and treatment approach.`,
    openGraph: {
      title: `${disease.name} - Homoeopathic Treatment`,
      description: disease.description,
      images: [disease.image],
    },
  };
}

// Helper to safely parse JSON arrays
function parseJsonArray(jsonString: string | null | undefined): string[] {
  if (!jsonString) return [];
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export default async function DiseaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const dbDisease = await getDiseaseBySlug(slug);

  if (!dbDisease) {
    notFound();
  }

  // Parse JSON strings to match the expected DiseaseDetail format
  const disease = {
    ...dbDisease,
    symptoms: parseJsonArray(dbDisease.symptoms),
    causes: parseJsonArray(dbDisease.causes),
    remedies: parseJsonArray(dbDisease.remedies),
    precautions: parseJsonArray(dbDisease.precautions),
  };

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium text-primary">
              Homoeopathic Treatment for {disease.category}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <DiseaseDetail disease={disease as any} />
          </div>
        </div>
      </section>
    </>
  );
}
