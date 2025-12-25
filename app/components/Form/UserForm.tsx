"use client"

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
import { Alert, AlertDescription } from "@/components/ui/alert";

import { FormData as BookingFormData } from '@/app/types';
import { toast } from "sonner";

const INITIAL_FORM_DATA: BookingFormData = {
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
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof BookingFormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setError("");
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      // APPROACH 1: Using JSON with base64 encoded file
      let receiptBase64 = null;
      if (formData.receipt) {
        receiptBase64 = await fileToBase64(formData.receipt);
      }

      console.log('payload', formData)
      console.log('receipt', receiptBase64)

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        hostel: formData.hostel,
        numberPlate: formData.numberPlate,
        brandModel: formData.brandModel,
        productPackage: formData.productPackage,
        timeslot: formData.timeslot,
        receipt: receiptBase64, // Base64 string
        receiptName: formData.receipt?.name,
        receiptType: formData.receipt?.type,
      };

      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast("Request submitted successfully!.")
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

  // APPROACH 2: Using FormData (alternative)
  const handleSubmitWithFormData = async () => {
    setError("");
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("hostel", formData.hostel);
      formDataToSend.append("numberPlate", formData.numberPlate);
      formDataToSend.append("brandModel", formData.brandModel);
      formDataToSend.append("productPackage", formData.productPackage);
      formDataToSend.append("timeslot", formData.timeslot);
      
      if (formData.receipt) {
        formDataToSend.append("receipt", formData.receipt);
      }

      const response = await fetch("/api/webhook", {
        method: "POST",
        body: formDataToSend, // Don't set Content-Type header, browser will set it automatically
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

      <Card className="max-w-lg mx-auto border border-gray-300">
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
              onSubmit={handleSubmit} // Use handleSubmitWithFormData for FormData approach
              isLoading={isLoading}
              error={error}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}