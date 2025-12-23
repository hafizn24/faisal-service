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

interface AppointmentDetailsProps {
    formData: FormData;
    updateField: (field: keyof FormData, value: string | File | null) => void;
    onBack: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    error: string;
}

function AppointmentDetails({
    formData,
    updateField,
    onBack,
    onSubmit,
    isLoading,
    error,
}: AppointmentDetailsProps) {
    return (
        <div className="space-y-6">
            {/* Timeslot field */}
            <div>
                <label
                    htmlFor="timeslot"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Select Timeslot
                </label>
                <input
                    id="timeslot"
                    type="date"
                    value={formData.timeslot}
                    onChange={(e) => updateField("timeslot", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Payment QR Code */}
            <div className="border border-gray-400 rounded-lg p-4 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Payment QR Code</p>
                <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                    QR Image Placeholder
                </div>
            </div>

            {/* Upload Receipt */}
            <div>
                <label
                    htmlFor="receipt"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Upload Payment Receipt
                </label>
                <input
                    id="receipt"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                        updateField("receipt", e.target.files?.[0] || null)
                    }
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
                {formData.receipt && (
                    <p className="text-sm text-gray-600 mt-2">
                        Selected: {formData.receipt.name}
                    </p>
                )}
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-between gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="bg-gray-300 text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Submitting..." : "Submit Request"}
                </button>
            </div>
        </div>
    );
}

export default AppointmentDetails;