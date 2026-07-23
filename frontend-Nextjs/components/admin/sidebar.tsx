'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Pill,
  BarChart3,
  Download,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/patients', label: 'Patients', icon: Users },
  { href: '/admin/blog', label: 'Blog CMS', icon: FileText },
  { href: '/admin/diseases', label: 'Diseases', icon: Pill },
  { href: '/admin/gallery', label: 'Gallery CMS', icon: Download },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, doctor } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-primary text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border transition-transform duration-300 md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}

        <div className="p-6 border-b border-border">
        </div>
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">
            ADMIN PORTAL
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Doctor Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-secondary/30 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Logged in as</p>
            <p className="font-semibold text-foreground truncate">{doctor?.name}</p>
            <p className="text-xs text-muted-foreground">{doctor?.registrationNumber}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
