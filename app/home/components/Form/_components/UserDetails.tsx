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
    return (
        <div className="space-y-6">
            {/* Name field */}
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Your Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Email field */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Your Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Phone field */}
            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Hostel field */}
            <div>
                <label
                    htmlFor="hostel"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Hostel's Name
                </label>
                <input
                    id="hostel"
                    type="text"
                    value={formData.hostel}
                    onChange={(e) => updateField("hostel", e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2"
                />
            </div>

            {/* Next button */}
            <div className="flex justify-end">
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

export default UserDetails;