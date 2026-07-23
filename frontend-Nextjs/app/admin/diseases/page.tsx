'use client';

import { useEffect, useState } from 'react';
import { getDiseases, deleteDisease } from '@/app/actions/diseases';
import { DiseaseEditor } from '@/components/admin/disease-editor';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

interface Disease {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  successRate: string;
  remedies: string;
}

export default function DiseasesCMSPage() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const token = useAuthStore((state) => state.doctor?.token);

  useEffect(() => {
    fetchDiseases();
  }, [page]);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      const data = await getDiseases();
      setDiseases(data as any);
    } catch (err: any) {
      setError('Failed to load diseases');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this disease?')) {
      try {
        await deleteDisease(id, token);
        fetchDiseases();
      } catch (err) {
        console.error('Failed to delete disease:', err);
        setError('Failed to delete disease');
      }
    }
  };

  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Diseases Database</h1>
          <p className="text-muted-foreground mt-1">Manage disease information and details</p>
        </div>
        <Button
          onClick={() => setShowEditor(true)}
          className="bg-primary hover:bg-primary/90"
        >
          + Add Disease
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search diseases by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground"
      />

      {/* Diseases List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading diseases...</p>
        </div>
      ) : filteredDiseases.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">No diseases found. Add your first disease!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Image */}
                {disease.image && (
                  <img
                    src={disease.image}
                    alt={disease.name}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-foreground">
                        {disease.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {disease.description ? `${disease.description.substring(0, 150)}...` : ''}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-secondary px-3 py-1 text-xs font-medium rounded-full">
                          {disease.category}
                        </span>
                        <span className="text-green-600 px-3 py-1 text-xs font-medium rounded-full bg-green-50">
                          {disease.successRate} success
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        onClick={() => setShowEditor(true)}
                        size="sm"
                        variant="outline"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(disease.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Remedies */}
                  {disease.remedies && JSON.parse(disease.remedies).length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground font-medium mb-2">Remedies:</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(disease.remedies).map((remedy: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary px-2 py-1 text-xs rounded"
                          >
                            {remedy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredDiseases.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page + 1} of diseases
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage(page + 1)}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Disease Editor Modal */}
      {showEditor && (
        <DiseaseEditor
          onSuccess={fetchDiseases}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
