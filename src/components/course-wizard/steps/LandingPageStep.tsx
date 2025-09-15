"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RTE } from "../RTE";
import { useCourseWizardStore } from "@/store/courseWizardStore";
import { landingPageSchema, LandingPageFormData } from "@/lib/validations/course-wizard";
import { 
  Plus, 
  X, 
  AlertCircle, 
  Image,
  Video,
  Link as LinkIcon
} from "lucide-react";

export function LandingPageStep() {
  const { data, updateData, validateStep, currentStep } = useCourseWizardStore();
  const [learningOutcomeInput, setLearningOutcomeInput] = useState("");
  const [prerequisiteInput, setPrerequisiteInput] = useState("");

  const {
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<LandingPageFormData>({
    resolver: zodResolver(landingPageSchema),
    defaultValues: {
      description: data.description,
      whatYoullLearn: data.whatYoullLearn,
      prerequisites: data.prerequisites,
      promoVideoUrl: data.promoVideoUrl,
      courseImageUrl: data.courseImageUrl
    },
    mode: 'onChange'
  });

  // Watch individual fields to avoid infinite re-renders
  const description = watch('description');
  const whatYoullLearn = watch('whatYoullLearn');
  const prerequisites = watch('prerequisites');
  const promoVideoUrl = watch('promoVideoUrl');
  const courseImageUrl = watch('courseImageUrl');

  // Memoize the update function to prevent infinite loops
  const updateStoreData = useCallback((updates: Partial<LandingPageFormData>) => {
    updateData({
      description: updates.description || '',
      whatYoullLearn: updates.whatYoullLearn || [],
      prerequisites: updates.prerequisites || [],
      promoVideoUrl: updates.promoVideoUrl || '',
      courseImageUrl: updates.courseImageUrl || ''
    });
  }, [updateData]);

  // Update store when form values change
  useEffect(() => {
    updateStoreData({
      description,
      whatYoullLearn,
      prerequisites,
      promoVideoUrl,
      courseImageUrl
    });
  }, [description, whatYoullLearn, prerequisites, promoVideoUrl, courseImageUrl, updateStoreData]);

  // Validate step when form becomes valid
  useEffect(() => {
    if (isValid) {
      validateStep(currentStep);
    }
  }, [isValid, validateStep, currentStep]);

  const handleAddLearningOutcome = () => {
    if (learningOutcomeInput.trim() && !data.whatYoullLearn.includes(learningOutcomeInput.trim())) {
      const newOutcomes = [...data.whatYoullLearn, learningOutcomeInput.trim()];
      setValue('whatYoullLearn', newOutcomes);
      setLearningOutcomeInput("");
    }
  };

  const handleRemoveLearningOutcome = (outcomeToRemove: string) => {
    const newOutcomes = data.whatYoullLearn.filter(outcome => outcome !== outcomeToRemove);
    setValue('whatYoullLearn', newOutcomes);
  };

  const handleAddPrerequisite = () => {
    if (prerequisiteInput.trim() && !data.prerequisites.includes(prerequisiteInput.trim())) {
      const newPrerequisites = [...data.prerequisites, prerequisiteInput.trim()];
      setValue('prerequisites', newPrerequisites);
      setPrerequisiteInput("");
    }
  };

  const handleRemovePrerequisite = (prerequisiteToRemove: string) => {
    const newPrerequisites = data.prerequisites.filter(prerequisite => prerequisite !== prerequisiteToRemove);
    setValue('prerequisites', newPrerequisites);
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'learning' | 'prerequisite') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'learning') {
        handleAddLearningOutcome();
      } else {
        handleAddPrerequisite();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Landing Page</h2>
        <p className="text-gray-600">
          Create an engaging course page that convinces students to enroll.
        </p>
      </div>

      <form className="space-y-8">
        {/* Course Description */}
        <div className="space-y-4">
          <Label htmlFor="description" className="text-lg font-medium">
            Course Description *
          </Label>
          <RTE
            value={data.description}
            onChange={(value) => setValue('description', value)}
            placeholder="Write a compelling description of your course. What will students learn? What makes this course special?"
            className="min-h-[300px]"
          />
          {errors.description && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.description.message}</span>
            </div>
          )}
        </div>

        {/* What You'll Learn */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            What You&apos;ll Learn *
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Build responsive websites with HTML, CSS, and JavaScript"
              value={learningOutcomeInput}
              onChange={(e) => setLearningOutcomeInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'learning')}
            />
            <Button
              type="button"
              onClick={handleAddLearningOutcome}
              disabled={!learningOutcomeInput.trim() || data.whatYoullLearn.includes(learningOutcomeInput.trim())}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {data.whatYoullLearn.length > 0 && (
            <div className="space-y-2">
              {data.whatYoullLearn.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-sm">{outcome}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLearningOutcome(outcome)}
                    className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {errors.whatYoullLearn && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.whatYoullLearn.message}</span>
            </div>
          )}
          <p className="text-sm text-gray-500">
            Add 3-15 key learning outcomes that students will achieve
          </p>
        </div>

        {/* Prerequisites */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Prerequisites (Optional)
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Basic computer skills"
              value={prerequisiteInput}
              onChange={(e) => setPrerequisiteInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'prerequisite')}
            />
            <Button
              type="button"
              onClick={handleAddPrerequisite}
              disabled={!prerequisiteInput.trim() || data.prerequisites.includes(prerequisiteInput.trim())}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {data.prerequisites.length > 0 && (
            <div className="space-y-2">
              {data.prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-sm">{prerequisite}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePrerequisite(prerequisite)}
                    className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500">
            List any knowledge or skills students should have before taking this course
          </p>
        </div>

        {/* Course Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Image */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">
              Course Image
            </Label>
            <div className="space-y-2">
              <Input
                placeholder="https://example.com/course-image.jpg"
                value={data.courseImageUrl}
                onChange={(e) => setValue('courseImageUrl', e.target.value)}
              />
              {data.courseImageUrl && (
                <div className="relative">
                  <img
                    src={data.courseImageUrl}
                    alt="Course preview"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Image className="h-4 w-4" />
                <span>Recommended: 1280x720px (16:9 ratio)</span>
              </div>
            </div>
          </div>

          {/* Promo Video */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">
              Promo Video (Optional)
            </Label>
            <div className="space-y-2">
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={data.promoVideoUrl}
                onChange={(e) => setValue('promoVideoUrl', e.target.value)}
              />
              {data.promoVideoUrl && (
                <div className="relative">
                  <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Video preview</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Video className="h-4 w-4" />
                <span>YouTube, Vimeo, or direct video URL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <LinkIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Tips for a Great Landing Page</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Write a compelling description that highlights the value and outcomes</li>
                <li>• Use clear, specific learning outcomes that students can achieve</li>
                <li>• Include relevant prerequisites to set proper expectations</li>
                <li>• Choose an engaging course image that represents your content</li>
                <li>• Add a promo video to give students a preview of your teaching style</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
