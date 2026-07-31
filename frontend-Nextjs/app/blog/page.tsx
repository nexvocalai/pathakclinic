import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogs } from "@/app/actions/blogs";

export const dynamic = 'force-dynamic';

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
      <div
        className="relative w-full h-[300px] md:h-[220px] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/testimonials-header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Blur + Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
            Health & Wellness Blog
          </h1>

          <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
            Expert insights on homoeopathic treatments, natural remedies, and
            holistic wellness. Updated weekly with evidence-based health
            information to help you live better.
          </p>
        </div>
      </div>

      <BlogList initialBlogs={blogs} />
    </>
  );
}
