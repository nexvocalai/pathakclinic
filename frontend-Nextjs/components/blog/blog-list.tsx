"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";

export function BlogList({ initialBlogs }: { initialBlogs: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(initialBlogs.map((post) => post.category)));

  const filteredPosts = selectedCategory
    ? initialBlogs.filter((post) => post.category === selectedCategory)
    : initialBlogs;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">Health Blog</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Health & Wellness Articles
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Expert insights on homoeopathic treatment, wellness tips, and natural
            healing. Updated weekly with evidence-based health information.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:border-primary/50"
            }`}
          >
            All Articles
          </button>
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

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <Link
              href={`/blog/${filteredPosts[0].slug}`}
              className="group block overflow-hidden rounded-xl border border-border shadow-md transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative h-80 w-full md:h-auto">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between bg-card p-6 md:p-8">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {filteredPosts[0].category}
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground md:text-3xl text-balance group-hover:text-primary transition-colors">
                      {filteredPosts[0].title}
                    </h3>
                    <p className="mb-4 text-muted-foreground leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(filteredPosts[0].date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {filteredPosts[0].readTime} min read
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No articles found in this category. Please try another.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
