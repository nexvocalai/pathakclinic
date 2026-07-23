'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartData {
  month: string;
  revenue: number;
  appointments: number;
}

interface RevenueChartProps {
  monthlyData: ChartData[];
  yearlyData: Array<{ year: string; revenue: number }>;
}

export function RevenueChart({ monthlyData, yearlyData }: RevenueChartProps) {
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Analytics</h3>
        <Tabs value={view} onValueChange={(v: any) => setView(v)}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {view === 'monthly' ? (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="appointments" fill="#3b82f6" name="Appointments" />
            </BarChart>
          ) : (
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                name="Annual Revenue"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
