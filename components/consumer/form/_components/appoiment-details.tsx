import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AppointmentDetailsProps } from '@/app/types';

function AppointmentDetails({
  formData,
  updateField,
  onBack,
  onSubmit,
  isLoading,
  error,
}: AppointmentDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.timeslot) {
      newErrors.timeslot = 'Please select a timeslot';
    }
    
    if (!formData.receipt) {
      newErrors.receipt = 'Please upload payment receipt';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, receipt: 'Please upload a valid image or PDF file' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, receipt: 'File size must be less than 5MB' });
        return;
      }
    }
    updateField('receipt', file);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="timeslot">Select Timeslot</Label>
        <Input
          id="timeslot"
          type="date"
          value={formData.timeslot}
          onChange={(e) => updateField('timeslot', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className={errors.timeslot ? 'border-red-500' : 'border border-gray-300'}
        />
        {errors.timeslot && <p className="text-sm text-red-500">{errors.timeslot}</p>}
      </div>

      <Card>
        <CardContent className="p-6 bg-gray-50 text-center">
          <p className="text-sm text-gray-600 mb-4 font-medium">Scan to Pay</p>
          <div className="w-48 h-48 bg-white mx-auto flex items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm">
            <div className="text-gray-400 text-center">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <p className="text-sm">QR Code</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Use your banking app to scan and pay</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="receipt">Upload Payment Receipt</Label>
        <Input
          id="receipt"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className={errors.receipt ? 'border-red-500' : 'border border-gray-300'}
        />
        {formData.receipt && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {formData.receipt.name}
          </p>
        )}
        {errors.receipt && <p className="text-sm text-red-500">{errors.receipt}</p>}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between gap-4">
        <Button type="button" onClick={onBack} disabled={isLoading} className="bg-yellow-400 text-black hover:bg-yellow-500">
          Back
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </div>
  );
}

export default AppointmentDetails;