'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Allow login page without authentication
    if (pathname === '/admin/login') return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  // Show only login page without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
  <div className="flex min-h-screen bg-background">
    <AdminSidebar />
    
    <main className="flex-1 md:ml-64 p-4 md:p-8 w-full">
      {children}
    </main>
  </div>
);
}
