export interface FormData {
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

export interface AppointmentDetailsProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string | File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string;
}

export interface UserDetailsProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  onNext: () => void;
}

export interface VehicleDetailsProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}