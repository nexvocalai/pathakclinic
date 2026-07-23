'use client';

import { useEffect, useState } from 'react';
import { getBlogs, deleteBlog } from '@/app/actions/blogs';
import { BlogEditor } from '@/components/admin/blog-editor';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Eye } from 'lucide-react';
import { formatDate } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export default function BlogCMSPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [page, setPage] = useState(0);
  const token = useAuthStore((state) => state.doctor?.token);

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setPosts(data as any);
    } catch (err: any) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id, token);
        fetchBlogs();
      } catch (err) {
        console.error('Failed to delete blog post:', err);
        setError('Failed to delete blog post');
      }
    }
  };

  const handlePublish = async (id: string) => {
    // Kept for backward compatibility, action uses auto-publish
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage blog posts</p>
        </div>
        <Button
          onClick={() => setShowEditor(true)}
          className="bg-primary hover:bg-primary/90"
        >
          + New Article
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Blog List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">No blog posts yet. Create your first article!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Thumbnail */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        onClick={() => handleDelete(post.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="bg-secondary px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span>{formatDate(new Date(post.date), 'MMM dd, yyyy')}</span>
                    <span className="text-green-600">
                      PUBLISHED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && posts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page + 1} of blog posts
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

      {/* Blog Editor Modal */}
      {showEditor && (
        <BlogEditor
          onSuccess={fetchBlogs}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
