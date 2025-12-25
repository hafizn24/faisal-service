import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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

interface VehicleDetailsProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function VehicleDetails({ formData, updateField, onNext, onBack }: VehicleDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.numberPlate.trim()) {
      newErrors.numberPlate = 'Number plate is required';
    }
    
    if (!formData.brandModel.trim()) {
      newErrors.brandModel = 'Brand model is required';
    }
    
    if (!formData.productPackage) {
      newErrors.productPackage = 'Please select a package';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="numberPlate">Number Plate Vehicle</Label>
        <Input
          id="numberPlate"
          type="text"
          value={formData.numberPlate}
          onChange={(e) => updateField('numberPlate', e.target.value)}
          className={errors.numberPlate ? 'border-red-500' : ''}
        />
        {errors.numberPlate && <p className="text-sm text-red-500">{errors.numberPlate}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="brandModel">Brand Model</Label>
        <Input
          id="brandModel"
          type="text"
          value={formData.brandModel}
          onChange={(e) => updateField('brandModel', e.target.value)}
          className={errors.brandModel ? 'border-red-500' : ''}
        />
        {errors.brandModel && <p className="text-sm text-red-500">{errors.brandModel}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="productPackage">Select Product and Package</Label>
        <Select
          value={formData.productPackage}
          onValueChange={(val) => updateField('productPackage', val)}
        >
          <SelectTrigger className={errors.productPackage ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select Product and Package" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily Use Package</SelectItem>
            <SelectItem value="performance">Performance Package</SelectItem>
          </SelectContent>
        </Select>
        {errors.productPackage && <p className="text-sm text-red-500">{errors.productPackage}</p>}
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" type="button" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg-yellow-400 text-black hover:bg-yellow-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default VehicleDetails;
