"use client";

import { useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { appointmentAPI } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string) || "";
    const mobile = (formData.get("mobile") as string) || "";
    const concern = (formData.get("concern") as string) || "";
    const date = (formData.get("date") as string) || "";
    const time = (formData.get("time") as string) || "";
    
    try {
      await appointmentAPI.create({
        name,
        phone: mobile,
        condition: concern,
        preferredDate: date,
        preferredTime: time,
        bookingMethod: "WEBSITE",
      });

      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Appointment Request Sent!
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Thank you for booking with Pathak Homoeopathic. We have received
            your appointment request and will contact you shortly to confirm the
            details.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Calendar className="h-7 w-7 text-primary" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Book via Form
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Fill out the form below and we will get back to you to confirm your
        appointment.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="concern">Health Concern</Label>
          <Textarea
            id="concern"
            name="concern"
            placeholder="Briefly describe your health concern"
            rows={3}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <Input id="time" name="time" type="time" required />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Appointment Request"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        We will contact you within 24 hours to confirm your appointment
      </p>
    </div>
  );
}
