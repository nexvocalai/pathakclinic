"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://130.210.11.179:8080";

// Helper to convert array from Java backend back to JSON string for frontend compatibility
function formatDiseaseData(d: any) {
  if (!d) return d;
  return {
    ...d,
    image: d.image || "/images/disease-arthritis.jpg",
    symptoms: Array.isArray(d.symptoms) ? JSON.stringify(d.symptoms) : d.symptoms || "[]",
    causes: Array.isArray(d.causes) ? JSON.stringify(d.causes) : d.causes || "[]",
    remedies: Array.isArray(d.remedies) ? JSON.stringify(d.remedies) : d.remedies || "[]",
    precautions: Array.isArray(d.precautions) ? JSON.stringify(d.precautions) : d.precautions || "[]",
  };
}

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

function buildDiseaseFormData(data: any) {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.category) formData.append("category", data.category);
  if (data.description) formData.append("description", data.description);
  
  if (data.symptoms) formData.append("symptoms", data.symptoms);
  if (data.causes) formData.append("causes", data.causes);
  if (data.remedies) formData.append("remedies", data.remedies);
  if (data.precautions) formData.append("precautions", data.precautions);
  
  if (data.homoeopathicApproach) formData.append("homoeopathicApproach", data.homoeopathicApproach);
  if (data.duration) formData.append("duration", data.duration);
  if (data.detailedInfo) formData.append("detailedInfo", data.detailedInfo);
  if (data.successRate) formData.append("successRate", data.successRate);
  return formData;
}

export async function getDiseases() {
  const res = await fetch(`${API_URL}/api/diseases?size=100`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch diseases");
  const data = await res.json();
  const content = data.content || data;
  if (Array.isArray(content)) {
    return content.map(formatDiseaseData);
  }
  return content;
}

export async function getDiseaseBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/diseases/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch disease by slug");
  const data = await res.json();
  return formatDiseaseData(data);
}

export async function createDisease(data: any, token?: string) {
  const formData = buildDiseaseFormData(data);
  
  if (data.image && data.image.startsWith("data:image")) {
    const blob = await dataUrlToBlob(data.image);
    formData.append("image", blob, "image.jpg");
  }

  const res = await fetch(`${API_URL}/api/diseases`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create disease");
  const result = await res.json();
  
  revalidatePath("/diseases");
  revalidatePath("/admin/diseases");
  return formatDiseaseData(result);
}

export async function updateDisease(id: string, data: any, token?: string) {
  const formData = buildDiseaseFormData(data);
  
  if (data.image && data.image.startsWith("data:image")) {
    const blob = await dataUrlToBlob(data.image);
    formData.append("image", blob, "image.jpg");
  }

  const res = await fetch(`${API_URL}/api/diseases/${id}`, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update disease");
  const result = await res.json();
  
  revalidatePath("/diseases");
  revalidatePath(`/diseases/${result.slug}`);
  revalidatePath("/admin/diseases");
  return formatDiseaseData(result);
}

export async function deleteDisease(id: string, token?: string) {
  const res = await fetch(`${API_URL}/api/diseases/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to delete disease");
  
  revalidatePath("/diseases");
  revalidatePath("/admin/diseases");
  return { id };
}
