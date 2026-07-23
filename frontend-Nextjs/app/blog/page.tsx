import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogs } from "@/app/actions/blogs";

export const metadata: Metadata = {
  title: "Health & Wellness Blog | Pathak Homoeopathic",
  description:
    "Expert articles on homoeopathic treatment, natural remedies, and holistic wellness. Get weekly insights on health, PCOS, skin disorders, asthma, and mental health.",
  keywords:
    "homoeopathy blog, natural remedies, wellness articles, holistic health, homoeopathic treatment",
  openGraph: {
    title: "Health & Wellness Blog | Pathak Homoeopathic",
    description: "Expert articles on homoeopathic treatment and natural remedies",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Health & Wellness Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Expert insights on homoeopathic treatments, natural remedies, and
              holistic wellness. Updated weekly with evidence-based health
              information to help you live better.
            </p>
          </div>
        </div>
      </section>

      <BlogList initialBlogs={blogs} />
    </>
  );
}
