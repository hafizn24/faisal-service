
import { cn } from "@/lib/utils"; // shadcn helper
import { Badge } from "@/components/ui/badge";

interface StepperProps {
  step: number;
}

const steps = ["User Details", "Vehicle Details", "Appointment"];

export default function Stepper({ step }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-6 gap-2 sm:gap-4">
      {steps.map((label, index) => {
        const isActive = step === index + 1;
        const isCompleted = step > index + 1;

        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center min-w-0"
          >
            {/* Circle using Badge */}
            <Badge
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 text-xs sm:text-base shrink-0",
                isActive && "bg-yellow-400 border-yellow-400 text-black",
                isCompleted && "bg-green-500 border-green-500 text-white",
                !isActive && !isCompleted && "bg-gray-50 border-gray-100 text-gray-500"
              )}
            >
              {isCompleted ? "✓" : index + 1}
            </Badge>

            {/* Label */}
            <p
              className={cn(
                "mt-1 sm:mt-2 text-[10px] sm:text-sm font-medium text-center truncate",
                isActive ? "text-yellow-500" : "text-gray-600"
              )}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
