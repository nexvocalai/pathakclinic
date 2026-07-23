'use client';

import { useState, useRef } from 'react';
import { createDisease } from '@/app/actions/diseases';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { X, Image as ImageIcon } from 'lucide-react';

interface DiseaseEditorProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function DiseaseEditor({ onSuccess, onClose }: DiseaseEditorProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Joint & Bone Disorders',
    description: '',
    symptoms: '',
    causes: '',
    homoeopathicApproach: '',
    remedies: '',
    precautions: '',
    duration: '',
    detailedInfo: '',
    successRate: '',
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
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        description: formData.description,
        symptoms: JSON.stringify(formData.symptoms.split(',').map(s => s.trim())),
        causes: JSON.stringify(formData.causes.split(',').map(c => c.trim())),
        remedies: JSON.stringify(formData.remedies.split(',').map(r => r.trim())),
        precautions: JSON.stringify(formData.precautions.split(',').map(p => p.trim())),
        homoeopathicApproach: formData.homoeopathicApproach,
        duration: formData.duration,
        detailedInfo: formData.detailedInfo,
        successRate: formData.successRate,
        image: imagePreview || '/images/disease-arthritis.jpg',
      };

      await createDisease(data, token);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create disease');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-card rounded-xl border border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card rounded-t-xl z-10 flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground">Add New Disease</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Disease Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Arthritis, Diabetes"
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
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
                <option>Joint & Bone Disorders</option>
                <option>Metabolic Disorders</option>
                <option>Skin Disorders</option>
                <option>Respiratory Disorders</option>
                <option>Neurological</option>
                <option>Women's Health</option>
                <option>Mental Health</option>
                <option>Digestive</option>
              </select>
            </div>

            {/* Success Rate */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Success Rate (%)
              </label>
              <input
                type="text"
                value={formData.successRate}
                onChange={(e) => setFormData({ ...formData, successRate: e.target.value })}
                placeholder="e.g., 75-85%"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the disease"
              rows={2}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Symptoms (comma-separated)
            </label>
            <textarea
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              placeholder="e.g., Joint pain, Swelling, Reduced mobility"
              rows={3}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-mono text-sm"
            />
          </div>

          {/* Causes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Causes (comma-separated)
            </label>
            <textarea
              value={formData.causes}
              onChange={(e) => setFormData({ ...formData, causes: e.target.value })}
              placeholder="e.g., Age-related wear, Autoimmune response"
              rows={3}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-mono text-sm"
            />
          </div>

          {/* Remedies */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Homoeopathic Remedies (comma-separated)
            </label>
            <textarea
              value={formData.remedies}
              onChange={(e) => setFormData({ ...formData, remedies: e.target.value })}
              placeholder="e.g., Rhus Tox, Bryonia, Calcarea"
              rows={2}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-mono text-sm"
            />
          </div>

          {/* Precautions */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Precautions (comma-separated)
            </label>
            <textarea
              value={formData.precautions}
              onChange={(e) => setFormData({ ...formData, precautions: e.target.value })}
              placeholder="e.g., Avoid heavy lifting, Maintain proper posture"
              rows={3}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-mono text-sm"
            />
          </div>

          {/* Homoeopathic Approach */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Homoeopathic Approach
            </label>
            <textarea
              value={formData.homoeopathicApproach}
              onChange={(e) => setFormData({ ...formData, homoeopathicApproach: e.target.value })}
              placeholder="Explain the homoeopathic treatment philosophy"
              rows={4}
              required
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Treatment Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 3-6 months"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
              />
            </div>
          </div>

          {/* Detailed Info */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Detailed Information
            </label>
            <textarea
              value={formData.detailedInfo}
              onChange={(e) => setFormData({ ...formData, detailedInfo: e.target.value })}
              placeholder="Comprehensive information about the disease treatment"
              rows={4}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Disease Image
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
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-8 border-2 border-dashed border-border rounded-lg hover:border-primary flex flex-col items-center gap-2 text-muted-foreground"
              >
                <ImageIcon size={32} />
                <span>Click to upload image</span>
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

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="submit"
              disabled={uploading}
              className="flex-1"
            >
              {uploading ? 'Saving...' : 'Add Disease'}
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
