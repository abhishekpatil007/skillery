"use client";

import { Wizard } from "@/components/course-wizard/Wizard";
import { BasicsStep } from "@/components/course-wizard/steps/BasicsStep";
import { CurriculumStep } from "@/components/course-wizard/steps/CurriculumStep";
import { LandingPageStep } from "@/components/course-wizard/steps/LandingPageStep";
import { PricingStep } from "@/components/course-wizard/steps/PricingStep";
import { useCourseWizardStore } from "@/store/courseWizardStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.id as string;
  const { currentStep, loadDraft } = useCourseWizardStore();

  // Load course data for editing
  useEffect(() => {
    if (courseId) {
      loadDraft(courseId);
    }
  }, [courseId, loadDraft]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicsStep />;
      case 1:
        return <CurriculumStep />;
      case 2:
        return <LandingPageStep />;
      case 3:
        return <PricingStep />;
      default:
        return <BasicsStep />;
    }
  };

  return (
    <Wizard courseId={courseId} isEdit={true}>
      {renderStep()}
    </Wizard>
  );
}
