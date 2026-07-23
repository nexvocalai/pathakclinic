import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export function FeaturedBlog() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">
              Health Education
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Latest Health & Wellness Articles
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Stay informed with expert insights on homoeopathic treatments and
            natural wellness. Updated weekly with evidence-based health information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {featuredPosts.map((post) => (
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
                <div className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary w-fit">
                  {post.category}
                </div>
                <h3 className="mb-3 text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
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

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Read All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
