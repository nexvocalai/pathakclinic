'use client';

import { useEffect, useState, useRef } from 'react';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '@/app/actions/gallery';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, X, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function GalleryCMSPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CLINIC');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = useAuthStore((state) => state.doctor?.token);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getGalleryItems(categoryFilter);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [categoryFilter]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a photo title');
      return;
    }
    setError('');
    setUploading(true);

    try {
      await createGalleryItem({
        title,
        category,
        description,
        image: imagePreview,
      }, token);

      setShowModal(false);
      setTitle('');
      setDescription('');
      setImagePreview('');
      fetchItems();
    } catch (err: any) {
      setError(err.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this photo from the gallery?')) {
      try {
        await deleteGalleryItem(id, token);
        fetchItems();
      } catch (err) {
        console.error('Failed to delete photo:', err);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Photo Gallery CMS
            <Sparkles className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage photos of Doctor, Clinic Facilities, and Health Camps
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Add Photo
        </Button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'CLINIC', 'CAMP', 'DOCTOR'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-primary text-primary-foreground shadow'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {cat === 'ALL' ? 'All Photos' : cat === 'CAMP' ? 'Health Camps' : cat === 'CLINIC' ? 'Clinic Facilities' : 'Doctor & Events'}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading gallery items...</div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
              <div className="relative h-48 w-full bg-secondary overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-3 right-3 p-2 bg-red-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  title="Delete Photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-base line-clamp-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
          No photos found in this category. Click "+ Add Photo" to upload one!
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-foreground">Upload Photo to Gallery</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-secondary rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Free Health Camp 2026, Reception Area"
                  required
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="CLINIC">Clinic Facilities</option>
                  <option value="CAMP">Health Camps</option>
                  <option value="DOCTOR">Doctor & Events</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description about this photo..."
                  rows={3}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Image</label>
                {imagePreview ? (
                  <div className="relative h-44 rounded-lg overflow-hidden border border-border">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImagePreview('')}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-border rounded-lg hover:border-primary flex flex-col items-center gap-2 text-muted-foreground"
                  >
                    <ImageIcon size={28} />
                    <span className="text-sm">Click to choose image file</span>
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

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" disabled={uploading} className="flex-1">
                  {uploading ? 'Uploading...' : 'Save to Gallery'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
