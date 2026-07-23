'use client';

import { useState } from 'react';
import { appointmentAPI } from '@/lib/api-client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddAppointmentDialogProps {
  onSuccess: () => void;
}

export function AddAppointmentDialog({ onSuccess }: AddAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    condition: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await appointmentAPI.create({
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        amount: formData.amount ? parseFloat(formData.amount) : undefined,
      });
      
      toast({
        title: 'Success',
        description: 'Appointment and patient added successfully.',
      });
      setOpen(false);
      onSuccess();
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        preferredDate: '',
        preferredTime: '',
        condition: '',
        amount: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add appointment.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Patient Name *</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(val) => handleSelectChange('gender', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Date</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Time</Label>
              <Input
                id="preferredTime"
                name="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Reason / Condition</Label>
            <Textarea
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
