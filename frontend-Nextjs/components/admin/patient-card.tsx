'use client';

import { useState } from 'react';
import { patientAPI } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { ChevronDown, Mail, Phone, Cake } from 'lucide-react';

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

interface PatientCardProps {
  patient: Patient;
  onUpdate: () => void;
}

export function PatientCard({ patient, onUpdate }: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    medicalHistory: patient.medicalHistory || '',
    address: patient.address,
  });
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    setUpdating(true);
    try {
      await patientAPI.updateDetails(patient.id, {
        medicalHistory: formData.medicalHistory,
        address: formData.address,
      });
      setEditMode(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to update patient:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-foreground">{patient.name}</h4>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail size={16} />
              {patient.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone size={16} />
              {patient.phone}
            </div>
            <div className="flex items-center gap-1">
              <Cake size={16} />
              {patient.age} years
            </div>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 hover:bg-secondary rounded-lg"
        >
          <ChevronDown
            size={20}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Total Appointments</p>
          <p className="font-semibold text-foreground">{patient.totalAppointments}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Spent</p>
          <p className="font-semibold text-foreground">₹{patient.totalSpent.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-6 pt-6 border-t border-border space-y-6">
          {editMode ? (
            <>
              {/* Edit Mode */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Medical History & Notes
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medicalHistory: e.target.value,
                    })
                  }
                  placeholder="Document patient's medical history, allergies, conditions, etc."
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground"
                  rows={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={updating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setEditMode(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* View Mode */}
              <div>
                <h4 className="font-medium text-foreground mb-2">Medical History</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {patient.medicalHistory || 'No medical history recorded'}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Address</h4>
                <p className="text-muted-foreground">{patient.address}</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Additional Info</h4>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <p>Gender: {patient.gender}</p>
                  <p>Age: {patient.age} years</p>
                  <p>Total Appointments: {patient.totalAppointments}</p>
                  <p>Amount Spent: ₹{patient.totalSpent.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <Button
                onClick={() => setEditMode(true)}
                className="w-full"
              >
                Edit Patient Details
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
