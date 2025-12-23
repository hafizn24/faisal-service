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
    return (
        <div className="space-y-6">
            {/* Number Plate field */}
            <div>
                <label
                    htmlFor="numberPlate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Number Plate Vehicle
                </label>
                <input
                    id="numberPlate"
                    type="text"
                    value={formData.numberPlate}
                    onChange={(e) => updateField("numberPlate", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Brand Model field */}
            <div>
                <label
                    htmlFor="brandModel"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Brand Model
                </label>
                <input
                    id="brandModel"
                    type="text"
                    value={formData.brandModel}
                    onChange={(e) => updateField("brandModel", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Product Package field */}
            <div>
                <label
                    htmlFor="productPackage"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Select Product and Package
                </label>
                <select
                    id="productPackage"
                    value={formData.productPackage}
                    onChange={(e) => updateField("productPackage", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                >
                    <option value="" disabled>
                        Select Product and Package
                    </option>
                    <option value="daily">Daily Use Package</option>
                    <option value="performance">Performance Package</option>
                </select>
            </div>

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
                    onClick={onNext}
                    className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default VehicleDetails;
