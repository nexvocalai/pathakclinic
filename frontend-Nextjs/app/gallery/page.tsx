import type { Metadata } from 'next';
import { getGalleryItems } from '@/app/actions/gallery';
import { GalleryView } from '@/components/gallery/gallery-view';

export const metadata: Metadata = {
  title: 'Photo Gallery | Pathak Homoeopathic Clinic & Camps',
  description: 'Explore photos of our clinic facilities, medical health camps, events, and treatment highlights.',
};

export default async function GalleryPage() {
  const initialItems = await getGalleryItems('ALL');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background py-14 md:py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
            Visual Highlights
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-3 tracking-tight">
            Clinic & Camp Gallery
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Take a look inside Pathak Homoeopathic Clinic, our modern facilities, and our community health camps dedicated to holistic healing.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <GalleryView initialItems={initialItems} />
        </div>
      </section>
    </div>
  );
}
