'use client';

import { useEffect, useState } from 'react';
import { analyticsAPI } from '@/lib/api-client';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { RevenueChart } from '@/components/admin/revenue-chart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface DashboardData {
  totalPatients: number;
  totalAppointments: number;
  monthlyRevenue: number;
  revenueGrowth: number;
}

interface ChartData {
  month: string;
  revenue: number;
  appointments: number;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalPatients: 0,
    totalAppointments: 0,
    monthlyRevenue: 0,
    revenueGrowth: 0,
  });
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [yearlyData, setYearlyData] = useState<Array<{ year: string; revenue: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard stats
        const dashResponse = await analyticsAPI.getDashboard();
        setDashboardData(dashResponse.data);

        // Fetch monthly data
        const monthlyResponse = await analyticsAPI.getMonthlyRevenue(new Date().getFullYear());
        setMonthlyData(monthlyResponse.data);

        // Fetch yearly data
        const yearlyResponse = await analyticsAPI.getYearlyRevenue();
        setYearlyData(yearlyResponse.data);
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, manage your clinic</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/appointments">
            <Button variant="outline">View Appointments</Button>
          </Link>
          <Link href="/admin/reports">
            <Button>Generate Report</Button>
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <DashboardStats
        totalPatients={dashboardData.totalPatients}
        totalAppointments={dashboardData.totalAppointments}
        monthlyRevenue={dashboardData.monthlyRevenue}
        revenueGrowth={dashboardData.revenueGrowth}
      />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart monthlyData={monthlyData} yearlyData={yearlyData} />

        {/* Quick Links */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/appointments">
              <Button variant="outline" className="w-full justify-start">
                📅 Manage Appointments
              </Button>
            </Link>
            <Link href="/admin/patients">
              <Button variant="outline" className="w-full justify-start">
                👥 View Patients
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="outline" className="w-full justify-start">
                📝 Add Blog Post
              </Button>
            </Link>
            <Link href="/admin/diseases">
              <Button variant="outline" className="w-full justify-start">
                💊 Add Disease
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="w-full justify-start">
                📊 Export Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
