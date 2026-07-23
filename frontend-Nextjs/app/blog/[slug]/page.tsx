import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { getBlogBySlug, getBlogs } from "@/app/actions/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Pathak Homoeopathic Blog`,
    description: post.excerpt,
    keywords: `${post.category}, homoeopathy, ${post.title}`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedPost = {
    ...post,
    readTime: parseInt(post.readTime) || 5,
  };

  return <BlogArticle post={formattedPost as any} />;
}
