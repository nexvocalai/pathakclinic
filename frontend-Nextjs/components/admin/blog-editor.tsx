'use client';

import { useState, useRef } from 'react';
import { createBlog } from '@/app/actions/blogs';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface BlogEditorProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function BlogEditor({ onSuccess, onClose }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'General',
    featured: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = useAuthStore((state) => state.doctor?.token);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      const data = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        author: 'Dr. Pathak',
        date: new Date().toISOString(),
        readTime: '5',
        image: imagePreview || '/images/blog-header.jpg',
      };

      await createBlog(data, token);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
       <div className="w-full max-w-2xl h-[90vh] bg-card rounded-xl border border-border flex flex-col">

 {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
      <h2 className="text-xl font-bold text-foreground">
        Create New Blog Post
      </h2>
      <button
        onClick={onClose}
        className="p-1 hover:bg-secondary rounded-lg"
      >
        <X size={24} />
      </button>
    </div>


        {/* Form */}
      
   {/* Scrollable Form */}
    <form
      onSubmit={handleSubmit}
      className="flex-1 overflow-y-auto p-6 space-y-6"
    >
      {/* All your existing fields unchanged */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })
              }
              placeholder="Enter blog post title"
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary of the article (for preview)"
              rows={2}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog post content here..."
              rows={8}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-mono text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
            >
              <option value="General">General Health</option>
              <option value="Skin Health">Skin Health</option>
              <option value="Respiratory Health">Respiratory Health</option>
              <option value="Women's Health">Women's Health</option>
              <option value="Child Care">Child Care</option>
              <option value="Mental Health">Mental Health</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Featured Image
            </label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview('');
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-8 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ImageIcon size={32} />
                <span>Click to upload image</span>
                <span className="text-xs">PNG, JPG up to 5MB</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              hidden
            />
          </div>

          {/* Featured */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm font-medium text-foreground">
              Mark as featured article
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="submit"
              disabled={uploading}
              className="flex-1"
            >
              {uploading ? 'Publishing...' : 'Publish Article'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
