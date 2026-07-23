'use client';

import { Users, Calendar, IndianRupee, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  totalPatients: number;
  totalAppointments: number;
  monthlyRevenue: number;
  revenueGrowth: number;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}) => (
  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
        {trend && (
          <p
            className={`text-xs mt-2 ${
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);

export function DashboardStats({
  totalPatients,
  totalAppointments,
  monthlyRevenue,
  revenueGrowth,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <StatCard
        icon={Users}
        label="Total Patients"
        value={totalPatients}
        trend="12% increase"
        trendUp
      />
      <StatCard
        icon={Calendar}
        label="Appointments"
        value={totalAppointments}
        trend="8% this month"
        trendUp
      />
      <StatCard
        icon={IndianRupee}
        label="Monthly Revenue"
        value={`₹${monthlyRevenue.toLocaleString('en-IN')}`}
        trend={`${revenueGrowth}% vs last month`}
        trendUp={revenueGrowth > 0}
      />
      <StatCard
        icon={TrendingUp}
        label="Growth Rate"
        value={`${revenueGrowth}%`}
        trend="Year-over-year"
        trendUp={revenueGrowth > 0}
      />
    </div>
  );
}
