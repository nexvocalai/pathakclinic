import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1">
              <span className="text-sm font-medium text-primary">
                {post.category}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-12 h-96 w-full overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none dark:prose-invert">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("-")) {
                // Handle bullet points
                const items = paragraph
                  .split("\n")
                  .filter((line) => line.startsWith("-"))
                  .map((line) => line.substring(1).trim());
                return (
                  <ul
                    key={index}
                    className="mb-6 list-inside list-disc space-y-2 text-muted-foreground leading-relaxed"
                  >
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }

              if (paragraph.includes(":")) {
                // Handle headings/subheadings
                const parts = paragraph.split(":");
                return (
                  <div key={index} className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {parts[0]}:
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {parts.slice(1).join(":").trim()}
                    </p>
                  </div>
                );
              }

              return (
                <p
                  key={index}
                  className="mb-6 text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              Ready for Homoeopathic Treatment?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Book a consultation with Dr. Pathak today to discuss your health
              concerns and treatment options.
            </p>
            <a
              href="https://wa.me/916394951471"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book Appointment on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
