'use client';

import { useEffect, useState } from 'react';
import { appointmentAPI } from '@/lib/api-client';
import { AppointmentItem } from '@/components/admin/appointment-item';
import { AddAppointmentDialog } from '@/components/admin/add-appointment-dialog';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  amount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  notes?: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentAPI.getAll(page, 10);
      setAppointments(response.data.content);
    } catch (err: any) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage all patient appointments</p>
        </div>
        <AddAppointmentDialog onSuccess={fetchAppointments} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by patient name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground"
        >
          <option value="ALL">All Statuses</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="NO_SHOW">No Show</option>
        </select>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading appointments...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">No appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onUpdate={fetchAppointments}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredAppointments.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page + 1} of appointments
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
    </div>
  );
}
