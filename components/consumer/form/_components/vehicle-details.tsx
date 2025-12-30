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
import { VehicleDetailsProps } from '@/app/types';

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
          className={errors.numberPlate ? 'border-red-500' : 'border border-gray-300'}
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
          className={errors.brandModel ? 'border-red-500' : 'border border-gray-300'}
        />
        {errors.brandModel && <p className="text-sm text-red-500">{errors.brandModel}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="productPackage">Select Product and Package</Label>
        <Select
          value={formData.productPackage}
          onValueChange={(val) => updateField("productPackage", val)}
        >
          <SelectTrigger
            className={
              errors.productPackage ? "border-red-500" : "border border-gray-300"
            }
          >
            <SelectValue placeholder="Select Product and Package" />
          </SelectTrigger>
          <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-md">
            <SelectItem
              value="daily"
              className="cursor-pointer hover:bg-gray-100 text-gray-900"
            >
              Daily Use Package
            </SelectItem>
            <SelectItem
              value="performance"
              className="cursor-pointer hover:bg-gray-100 text-gray-900"
            >
              Performance Package
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.productPackage && (
          <p className="text-sm text-red-500">{errors.productPackage}</p>
        )}
      </div>


      <div className="flex justify-between gap-4">
        <Button type="button" onClick={onBack} className="bg-yellow-400 text-black hover:bg-yellow-500">
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
