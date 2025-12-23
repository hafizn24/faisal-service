interface StepperProps {
  step: number;
}

const steps = ["User Details", "Vehicle Details", "Appointment"];

export default function Stepper({ step }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const isActive = step === index + 1;
        const isCompleted = step > index + 1;

        return (
          <div key={label} className="flex-1 flex flex-col items-center">
            {/* Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                ${isActive ? "bg-yellow-400 border-yellow-400 text-black" : ""}
                ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                ${!isActive && !isCompleted ? "border-gray-300 text-gray-500" : ""}
              `}
            >
              {isCompleted ? "✓" : index + 1}
            </div>

            {/* Label */}
            <p
              className={`mt-2 text-sm font-medium 
                ${isActive ? "text-yellow-500" : "text-gray-600"}
              `}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}