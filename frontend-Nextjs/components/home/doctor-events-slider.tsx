'use client';

import { useEffect, useState } from 'react';
import { getGalleryItems } from '@/app/actions/gallery';
import { ChevronLeft, ChevronRight, ZoomIn, ArrowRight, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fallbackItems = [
  {
    id: 'fb-1',
    title: 'Dr. Rati Pathak - Clinical Highlights & Achievements',
    category: 'DOCTOR',
    description: 'Recognized for excellence in natural & holistic homoeopathic healthcare.',
    image: '/images/dr_rati_pathak.png',
  },
  {
    id: 'fb-2',
    title: 'Medical Milestones & Community Events',
    category: 'EVENT',
    description: 'Specialized health awareness programs and patient care events.',
    image: '/images/achievements.jpg',
  },
  {
    id: 'fb-3',
    title: 'Holistic Patient Consultation',
    category: 'DOCTOR',
    description: 'In-depth consultation sessions focusing on long-term wellness.',
    image: '/images/doctor-profile.jpg',
  },
];

export function DoctorEventsSlider() {
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const doctorPhotos = await getGalleryItems('DOCTOR');
        const allPhotos = await getGalleryItems('ALL');
        const filtered = (allPhotos || []).filter(
          (item: any) => item.category === 'DOCTOR' || item.category === 'EVENT'
        );

        const combined = [...(doctorPhotos || []), ...filtered];
        const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values());

        if (unique.length > 0) {
          setItems(unique);
        } else {
          setItems(fallbackItems);
        }
      } catch (err) {
        console.error('Failed to load slider items:', err);
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Touch Swipe Handlers for Mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-slate-50/50 border-y border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center py-12">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="h-6 w-48 bg-slate-200 rounded-full" />
            <div className="h-8 w-64 bg-slate-200 rounded-lg" />
            <div className="h-64 md:h-96 w-full bg-slate-200 rounded-3xl mt-4" />
          </div>
        </div>
      </section>
    );
  }

  const safeIndex = currentIndex >= 0 && currentIndex < items.length ? currentIndex : 0;
  const activeItem = items[safeIndex] || fallbackItems[0];

  return (
    <section className="py-12 md:py-16 bg-slate-50/60 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6 space-y-8 max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Doctor & Events Highlights
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] tracking-tight">
              Dr. Pathak & Clinic Events
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Highlights of medical events, achievements, and clinic moments.
            </p>
          </div>

          <Button asChild variant="outline" className="hidden sm:flex items-center gap-2 rounded-full border-primary/20 hover:border-primary">
            <Link href="/gallery">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        {/* Carousel Slider */}
        <div
          className="relative w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Active Slide Image */}
          <div
            className="relative h-[300px] sm:h-[400px] md:h-[480px] w-full overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(activeItem)}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            {/* Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                {activeItem.category === 'EVENT' ? 'Clinic Event' : 'Doctor & Events'}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold line-clamp-1 drop-shadow-md">
                {activeItem.title}
              </h3>
              {activeItem.description && (
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 drop-shadow">
                  {activeItem.description}
                </p>
              )}
            </div>

            {/* Tap to Expand Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
              <ZoomIn size={14} /> Tap to Expand
            </div>
          </div>

          {/* Navigation Controls */}
          {items.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 transition-all border border-white/20 opacity-90 sm:opacity-0 group-hover:opacity-100"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 transition-all border border-white/20 opacity-90 sm:opacity-0 group-hover:opacity-100"
                aria-label="Next Slide"
              >
                <ChevronRight size={22} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-10">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden text-center pt-2">
          <Button asChild variant="outline" className="w-full rounded-full">
            <Link href="/gallery">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {selectedImage.category || 'DOCTOR & EVENT'}
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-2">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="text-muted-foreground mt-2 leading-relaxed">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
