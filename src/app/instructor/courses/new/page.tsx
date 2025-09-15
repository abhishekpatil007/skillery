"use client";

import { Wizard } from "@/components/course-wizard/Wizard";
import { BasicsStep } from "@/components/course-wizard/steps/BasicsStep";
import { CurriculumStep } from "@/components/course-wizard/steps/CurriculumStep";
import { LandingPageStep } from "@/components/course-wizard/steps/LandingPageStep";
import { PricingStep } from "@/components/course-wizard/steps/PricingStep";
import { useCourseWizardStore } from "@/store/courseWizardStore";

export default function NewCoursePage() {
  const { currentStep } = useCourseWizardStore();

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
    <Wizard courseId="new" isEdit={false}>
      {renderStep()}
    </Wizard>
  );
}
