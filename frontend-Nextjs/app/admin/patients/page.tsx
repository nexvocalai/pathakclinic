'use client';

import { useEffect, useState } from 'react';
import { patientAPI } from '@/lib/api-client';
import { PatientCard } from '@/components/admin/patient-card';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address: string;
  medicalHistory?: string;
  totalAppointments: number;
  totalSpent: number;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'spent' | 'recent'>('name');

  useEffect(() => {
    fetchPatients();
  }, [page]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientAPI.getAll(page, 10);
      setPatients(response.data.content);
    } catch (err: any) {
      setError('Failed to load patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Patients</h1>
        <p className="text-muted-foreground mt-1">Manage patient details and medical history</p>
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
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          >
            <option value="name">Sort by Name</option>
            <option value="spent">Sort by Amount Spent</option>
            <option value="recent">Recent First</option>
          </select>
        </div>
      </div>

      {/* Patients List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading patients...</p>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">No patients found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onUpdate={fetchPatients}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredPatients.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page + 1} of patients
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

      {/* Summary Stats */}
      {filteredPatients.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Patients</p>
            <p className="text-2xl font-bold text-foreground">{filteredPatients.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Appointments</p>
            <p className="text-2xl font-bold text-foreground">
              {filteredPatients.reduce((sum, p) => sum + p.totalAppointments, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground">
              ₹{filteredPatients.reduce((sum, p) => sum + p.totalSpent, 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
