"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DnDList } from "../DnDList";
import { useCourseWizardStore } from "@/store/courseWizardStore";
import { Plus, BookOpen, Clock, Play } from "lucide-react";

export function CurriculumStep() {
  const {
    data,
    currentStep,
    validateStep,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    addLecture,
    updateLecture,
    deleteLecture,
    reorderLectures,
    moveLecture
  } = useCourseWizardStore();

  // Validate step when sections change
  useEffect(() => {
    validateStep(currentStep);
  }, [data.sections, validateStep, currentStep]);

  const handleAddSection = () => {
    addSection({
      title: '',
      description: '',
      lectures: []
    });
  };

  const getTotalDuration = () => {
    return data.sections.reduce((total, section) => {
      return total + section.lectures.reduce((sectionTotal, lecture) => {
        return sectionTotal + lecture.duration;
      }, 0);
    }, 0);
  };

  const getTotalLectures = () => {
    return data.sections.reduce((total, section) => {
      return total + section.lectures.length;
    }, 0);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const isStepValid = data.sections.length > 0 && 
    data.sections.every(section => 
      section.title.trim() && 
      section.lectures.length > 0 &&
      section.lectures.every(lecture => lecture.title.trim())
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Curriculum</h2>
        <p className="text-gray-600">
          Structure your course content with sections and lectures. Drag to reorder.
        </p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-900">
                {data.sections.length}
              </div>
              <div className="text-sm text-blue-700">Sections</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Play className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-900">
                {getTotalLectures()}
              </div>
              <div className="text-sm text-green-700">Lectures</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {formatDuration(getTotalDuration())}
              </div>
              <div className="text-sm text-purple-700">Total Duration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Section Button */}
      <div className="mb-6">
        <Button
          onClick={handleAddSection}
          className="w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      {/* Sections List */}
      {data.sections.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No sections yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start building your course by adding your first section
          </p>
          <Button onClick={handleAddSection}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Section
          </Button>
        </div>
      ) : (
        <DnDList
          sections={data.sections}
          onReorderSections={reorderSections}
          onMoveLecture={moveLecture}
          onUpdateSection={updateSection}
          onDeleteSection={deleteSection}
          onAddLecture={addLecture}
          onUpdateLecture={updateLecture}
          onDeleteLecture={deleteLecture}
        />
      )}

      {/* Validation Message */}
      {!isStepValid && data.sections.length > 0 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            <span className="text-sm font-medium">
              Please complete all sections and lectures to continue
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
