'use client';

import { useState } from 'react';
import { formatDate } from 'date-fns';
import { appointmentAPI } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

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

interface AppointmentItemProps {
  appointment: Appointment;
  onUpdate: () => void;
}

const statusColors = {
  SCHEDULED: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  NO_SHOW: 'bg-orange-100 text-orange-800',
};

const paymentColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};

export function AppointmentItem({ appointment, onUpdate }: AppointmentItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [newStatus, setNewStatus] = useState(appointment.status);
  const [notes, setNotes] = useState(appointment.notes || '');
  const [paymentAmount, setPaymentAmount] = useState(appointment.amount);
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await appointmentAPI.updateStatus(appointment.id, newStatus);
      onUpdate();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNotes = async () => {
    setUpdating(true);
    try {
      await appointmentAPI.addNotes(appointment.id, notes);
      onUpdate();
    } catch (err) {
      console.error('Failed to add notes:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRecordPayment = async () => {
    setUpdating(true);
    try {
      await appointmentAPI.recordPayment(appointment.id, paymentAmount, 'CASH');
      onUpdate();
    } catch (err) {
      console.error('Failed to record payment:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{appointment.patientName}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[appointment.status]}`}>
              {appointment.status}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${paymentColors[appointment.paymentStatus]}`}>
              {appointment.paymentStatus}
            </span>
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

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
        <div>
          <p className="text-muted-foreground">Date & Time</p>
          <p className="font-medium text-foreground">
            {formatDate(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
          </p>
          <p className="text-xs text-muted-foreground">{appointment.timeSlot}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Phone</p>
          <p className="font-medium text-foreground">{appointment.patientPhone}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Amount</p>
          <p className="font-medium text-foreground">₹{appointment.amount.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Reason</p>
          <p className="font-medium text-foreground text-xs">{appointment.reason.substring(0, 20)}...</p>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-6 pt-6 border-t border-border space-y-6">
          {/* Status Update */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Appointment Status</label>
            <div className="flex gap-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground"
              >
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="NO_SHOW">No Show</option>
              </select>
              <Button
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === appointment.status}
                size="sm"
              >
                Update
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Patient Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add clinical notes, treatment details, etc."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground"
              rows={4}
            />
            <Button
              onClick={handleAddNotes}
              disabled={updating}
              size="sm"
              className="mt-2"
            >
              Save Notes
            </Button>
          </div>

          {/* Payment */}
          {appointment.paymentStatus !== 'PAID' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Record Payment</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground"
                  placeholder="Enter amount"
                />
                <Button
                  onClick={handleRecordPayment}
                  disabled={updating}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark Paid
                </Button>
              </div>
            </div>
          )}

          {/* Patient Info */}
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Patient Details</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>Email: {appointment.patientEmail}</p>
              <p>Phone: {appointment.patientPhone}</p>
              <p>Appointment Reason: {appointment.reason}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
