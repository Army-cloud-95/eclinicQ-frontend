import React, { useState } from "react";
import { Check, FileText, User, Building2, ClipboardList, CreditCard } from "lucide-react";

const steps = [
  { id: 1, title: "Account Creation", icon: <User size={18} /> },
  { id: 2, title: "Hospital Details", icon: <Building2 size={18} /> },
  { id: 3, title: "Documents Verification", icon: <FileText size={18} /> },
  { id: 4, title: "Review & Create", icon: <ClipboardList size={18} /> },
  { id: 5, title: "Package & Payment", icon: <CreditCard size={18} /> },
];

export default function SidebarSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm w-80 overflow-hidden">
      <h2 className="text-sm font-semibold text-gray-700 mb-6 flex-shrink-0">
        Hospital Registration Form
      </h2>

      <div className="relative flex-1 overflow-y-auto">
        {/* Connector line */}
        <div className="absolute top-0 left-5 w-0.5 h-full bg-gray-200"></div>

        <div className="flex flex-col space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index + 1 < currentStep;
            const isCurrent = index + 1 === currentStep;

            return (
              <div key={step.id} className="relative flex items-start space-x-3">
                {/* Step circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10
                  ${isCompleted ? "bg-green-100 border-green-500 text-green-600" : ""}
                  ${isCurrent ? "bg-blue-100 border-blue-500 text-blue-600" : ""}
                  ${!isCompleted && !isCurrent ? "bg-gray-100 border-gray-300 text-gray-400" : ""}
                `}
                >
                  {isCompleted ? (
                    <Check size={18} className="text-green-600" />
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Step Content */}
                <div>
                  <p className="text-xs text-gray-500">Step {step.id}</p>
                  <p className="text-sm font-medium text-gray-700">{step.title}</p>
                  {isCompleted && (
                    <p className="text-xs text-green-600">Completed</p>
                  )}
                  {isCurrent && (
                    <div className="w-12 h-1 bg-blue-500 rounded mt-1"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dummy Button to test transition */}
      <button
        onClick={handleNext}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex-shrink-0"
      >
        Next Step →
      </button>
    </div>
  );
}
