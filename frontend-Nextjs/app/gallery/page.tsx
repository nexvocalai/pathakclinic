import type { Metadata } from 'next';
import { getGalleryItems } from '@/app/actions/gallery';
import { GalleryView } from '@/components/gallery/gallery-view';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Photo Gallery | Pathak Homoeopathic Clinic & Camps',
  description: 'Explore photos of our clinic facilities, medical health camps, events, and treatment highlights.',
};

export default async function GalleryPage() {
  const initialItems = await getGalleryItems('ALL');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            Clinic & Camp Gallery
          </h1>

          <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
            Take a look inside Pathak Homoeopathic Clinic, our modern facilities, and our community health camps dedicated to holistic healing.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <GalleryView initialItems={initialItems} />
        </div>
      </section>
    </div>
  );
}
