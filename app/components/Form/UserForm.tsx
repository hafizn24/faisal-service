"use client";

import { useState } from "react";
import UserDetails from "./_components/UserDetails";
import AppointmentDetails from "./_components/AppointmentDetails";
import VehicleDetails from "./_components/VehicleDetails";
import Stepper from "../Stepper";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  name: string;
  email: string;
  phone: string;
  hostel: string;
  numberPlate: string;
  brandModel: string;
  productPackage: string;
  timeslot: string;
  receipt: File | null;
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  hostel: "",
  numberPlate: "",
  brandModel: "",
  productPackage: "",
  timeslot: "",
  receipt: null,
};

export default function UserForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        hostel: formData.hostel,
        numberPlate: formData.numberPlate,
        brandModel: formData.brandModel,
        productPackage: formData.productPackage,
        timeslot: formData.timeslot,
      };

      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Request submitted successfully!");
        resetForm();
      } else {
        setError(result.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 container mx-auto px-6">
      <h3 className="text-3xl font-bold text-center mb-12">
        Book Your Service
      </h3>

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Service Booking</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Stepper at the top */}
          <Stepper step={step} />

          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step Content */}
          {step === 1 && (
            <UserDetails
              formData={formData}
              updateField={updateField}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <VehicleDetails
              formData={formData}
              updateField={updateField}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <AppointmentDetails
              formData={formData}
              updateField={updateField}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          )}

          {/* Reset button */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={resetForm}
              disabled={isLoading}
            >
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
