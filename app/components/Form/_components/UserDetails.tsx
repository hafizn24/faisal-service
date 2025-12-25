import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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

interface UserDetailsProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  onNext: () => void;
}

function UserDetails({ formData, updateField, onNext }: UserDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.hostel.trim()) {
      newErrors.hostel = 'Hostel name is required';
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
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Your Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hostel">Hostel's Name</Label>
        <Input
          id="hostel"
          type="text"
          value={formData.hostel}
          onChange={(e) => updateField('hostel', e.target.value)}
          className={errors.hostel ? 'border-red-500' : ''}
        />
        {errors.hostel && <p className="text-sm text-red-500">{errors.hostel}</p>}
      </div>

      <div className="flex justify-end">
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

export default UserDetails;