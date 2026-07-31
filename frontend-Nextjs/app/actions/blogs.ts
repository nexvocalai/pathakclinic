"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://130.210.11.179:8080";

// Helper to convert a data URL to a File/Blob
function dataUrlToBlob(dataUrl: string): Blob {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    const buffer = Buffer.from(dataUrl, 'base64');
    return new Blob([buffer], { type: 'image/jpeg' });
  }
  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  return new Blob([buffer], { type: mimeType });
}

function buildBlogFormData(data: any) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.slug) formData.append("slug", data.slug);
  if (data.content) formData.append("content", data.content);
  if (data.excerpt) formData.append("excerpt", data.excerpt);
  if (data.category) formData.append("category", data.category);
  if (data.featured !== undefined) formData.append("featured", String(data.featured));
  return formData;
}

// Helper to format blog data with fallbacks
function formatBlogData(b: any) {
  if (!b) return b;
  return {
    ...b,
    image: b.image || "/images/blog-header.jpg",
    date: b.publishedAt || b.createdAt || new Date().toISOString(),
    readTime: b.readTime || "5",
  };
}

export async function getBlogs() {
  const res = await fetch(`${API_URL}/api/blogs?size=100`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  // Spring Boot returns a Page<BlogDto>, so we want data.content
  const content = data.content || data;
  if (Array.isArray(content)) {
    return content.map(formatBlogData);
  }
  return content;
}

export async function getBlogBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/blogs/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog by slug");
  const data = await res.json();
  return formatBlogData(data);
}

export async function createBlog(data: any, token?: string) {
  const formData = buildBlogFormData(data);
  
  if (data.image && data.image.startsWith("data:image")) {
    const blob = await dataUrlToBlob(data.image);
    formData.append("image", blob, "image.jpg");
  }

  const res = await fetch(`${API_URL}/api/blogs`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create blog");
  const result = await res.json();
  
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return result;
}

export async function updateBlog(id: string, data: any, token?: string) {
  const formData = buildBlogFormData(data);
  
  if (data.image && data.image.startsWith("data:image")) {
    const blob = await dataUrlToBlob(data.image);
    formData.append("image", blob, "image.jpg");
  }

  const res = await fetch(`${API_URL}/api/blogs/${id}`, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update blog");
  const result = await res.json();
  
  revalidatePath("/blog");
  revalidatePath(`/blog/${result.slug}`);
  revalidatePath("/admin/blog");
  return result;
}

export async function deleteBlog(id: string, token?: string) {
  const res = await fetch(`${API_URL}/api/blogs/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to delete blog");
  
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { id };
}
