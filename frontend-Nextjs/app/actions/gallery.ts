"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://130.210.11.179:8080";

function formatGalleryItem(item: any) {
  if (!item) return item;
  return {
    ...item,
    image: item.imageUrl || "/images/clinic-placeholder.jpg",
  };
}

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

export async function getGalleryItems(category?: string) {
  try {
    const url = category && category !== "ALL"
      ? `${API_URL}/api/gallery?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/gallery`;
      
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map(formatGalleryItem);
    }
    return [];
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export async function createGalleryItem(data: any, token?: string) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.category) formData.append("category", data.category);
  if (data.description) formData.append("description", data.description);

  if (data.image && data.image.startsWith("data:image")) {
    const blob = await dataUrlToBlob(data.image);
    formData.append("image", blob, "photo.jpg");
  }

  const res = await fetch(`${API_URL}/api/gallery`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload photo to gallery");
  const result = await res.json();

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return formatGalleryItem(result);
}

export async function deleteGalleryItem(id: string, token?: string) {
  const res = await fetch(`${API_URL}/api/gallery/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error("Failed to delete photo");

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return { id };
}
