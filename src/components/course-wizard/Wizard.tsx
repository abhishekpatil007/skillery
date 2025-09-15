"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Stepper } from "./Stepper";
import { useCourseWizardStore } from "@/store/courseWizardStore";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Download,
  AlertTriangle
} from "lucide-react";

interface WizardProps {
  children: React.ReactNode;
  courseId?: string;
  isEdit?: boolean;
}

export function Wizard({ children, courseId, isEdit = false }: WizardProps) {
  const router = useRouter();
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  
  const {
    currentStep,
    steps,
    isDirty,
    lastSaved,
    setCurrentStep,
    validateStep,
    saveDraft,
    exportCourse,
    resetWizard
  } = useCourseWizardStore();

  // Load draft on mount
  useEffect(() => {
    if (courseId) {
      useCourseWizardStore.getState().loadDraft(courseId);
    }
  }, [courseId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (isDirty) {
      const interval = setInterval(() => {
        saveDraft();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isDirty, saveDraft]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow going back to completed steps
    if (stepIndex <= currentStep || steps[stepIndex].isValid) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSaveDraft = () => {
    saveDraft();
  };

  const handleExport = () => {
    const courseData = exportCourse();
    if (!courseData) return;
    
    const dataStr = JSON.stringify(courseData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `course-${courseId || 'new'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedWarning(true);
    } else {
      router.back();
    }
  };

  const handleConfirmCancel = () => {
    resetWizard();
    setShowUnsavedWarning(false);
    router.back();
  };

  const canProceed = steps[currentStep]?.isValid || false;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <Container>
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEdit ? 'Edit Course' : 'Create New Course'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEdit ? 'Update your course content' : 'Build your course step by step'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {isDirty && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Unsaved changes</span>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                  disabled={!isDirty}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>

            {/* Stepper */}
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <div className="py-8">
          {children}
        </div>
      </Container>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
        <Container>
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {lastSaved && (
                  <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {isLastStep ? (
                  <Button
                    onClick={() => {
                      // Handle final submission
                      console.log('Course submitted!', exportCourse());
                    }}
                    disabled={!canProceed}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isEdit ? 'Update Course' : 'Publish Course'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Unsaved Changes Warning Modal */}
      {showUnsavedWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Unsaved Changes
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              You have unsaved changes. Are you sure you want to leave? Your progress will be lost.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowUnsavedWarning(false)}
              >
                Stay
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmCancel}
              >
                Leave Anyway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
