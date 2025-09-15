"use client";

import { Check } from "lucide-react";
import { WizardStep } from "@/types/course-wizard";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!step.isValid && index > currentStep}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  step.isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : step.isActive
                    ? "bg-brand-600 border-brand-600 text-white"
                    : step.isValid
                    ? "bg-green-100 border-green-600 text-green-600"
                    : "bg-gray-100 border-gray-300 text-gray-400",
                  onStepClick && "hover:scale-105 cursor-pointer",
                  !onStepClick && "cursor-default"
                )}
              >
                {step.isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </button>
              
              {/* Step Info */}
              <div className="mt-2 text-center">
                <h3 className={cn(
                  "text-sm font-medium",
                  step.isActive ? "text-brand-600" : "text-gray-600"
                )}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-24">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-4 transition-colors duration-200",
                step.isCompleted ? "bg-green-600" : "bg-gray-300"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
