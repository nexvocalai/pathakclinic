"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export function DiseasesGrid({ initialDiseases }: { initialDiseases: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialDiseases.map((d) => d.category)))];

  const filteredDiseases = useMemo(() => {
    let filtered = initialDiseases;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (disease) =>
          disease.name.toLowerCase().includes(lowerQuery) ||
          (disease.detailedInfo && disease.detailedInfo.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory, initialDiseases]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search diseases by name or symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:border-primary/50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Found {filteredDiseases.length} disease{filteredDiseases.length !== 1 ? "s" : ""}
      </div>

      {/* Diseases Grid */}
      {filteredDiseases.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDiseases.map((disease) => (
            <Link key={disease.id} href={`/diseases/${disease.slug}`}>
              <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md cursor-pointer">
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                  <Image
                    src={disease.image}
                    alt={disease.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {disease.category}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {disease.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {disease.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Learn more →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-background py-12 text-center">
          <p className="text-muted-foreground">
            No diseases found matching your search. Try different keywords.
          </p>
        </div>
      )}
    </div>
  );
}
