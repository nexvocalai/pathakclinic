'use client';

import { useState, useEffect } from 'react';
import { getGalleryItems } from '@/app/actions/gallery';
import { X, ZoomIn, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

function GalleryCarousel({ items, onSelect }: { items: any[]; onSelect: (item: any) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (!items || items.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const activeItem = items[currentIndex];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          Featured Highlights
          <Sparkles size={16} className="text-primary" />
        </h2>
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} of {items.length}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Active Slide Image */}
        <div
          className="relative h-[280px] sm:h-[380px] md:h-[460px] w-full overflow-hidden cursor-pointer"
          onClick={() => onSelect(activeItem)}
        >
          <img
            src={activeItem.image}
            alt={activeItem.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
              {activeItem.category === 'CAMP' ? 'Health Camp' : activeItem.category === 'CLINIC' ? 'Clinic Facility' : 'Doctor & Event'}
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

          {/* Zoom Badge */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
            <ZoomIn size={14} /> Tap to Expand
          </div>
        </div>

        {/* Nav Buttons */}
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

            {/* Pagination Dots */}
            <div className="absolute bottom-3 right-6 flex items-center gap-1.5 z-10">
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
    </div>
  );
}

export function GalleryView({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState<any[]>(initialItems);
  const [category, setCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = async (cat: string) => {
    setCategory(cat);
    setLoading(true);
    const data = await getGalleryItems(cat);
    setItems(data);
    setLoading(false);
  };

  const categories = [
    { key: 'ALL', label: 'All Photos' },
    { key: 'CLINIC', label: 'Clinic Facilities' },
    { key: 'CAMP', label: 'Health Camps' },
    { key: 'DOCTOR', label: 'Doctor & Events' },
  ];

  return (
    <div className="space-y-10">
      {/* Featured Carousel Slider */}
      {initialItems && initialItems.length > 0 && (
        <GalleryCarousel items={initialItems} onSelect={(item) => setSelectedImage(item)} />
      )}

      {/* Category Filter Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                category === cat.key
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-secondary text-foreground hover:bg-primary/10 hover:text-primary border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        {loading ? (
          <div className="text-center py-16 text-muted-foreground animate-pulse">
            Loading gallery items...
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden bg-secondary">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1 rounded-full border border-border">
                    {item.category === 'CAMP' ? 'Health Camp' : item.category === 'CLINIC' ? 'Clinic' : 'Doctor'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl p-8">
            <p className="text-muted-foreground font-medium">
              No gallery photos found in this category yet.
            </p>
          </div>
        )}
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
                {selectedImage.category}
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-2">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="text-muted-foreground mt-2 leading-relaxed">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
