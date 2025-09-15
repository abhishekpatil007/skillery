"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CourseWizardData, WizardStep, WizardState, CourseSection, CourseLecture } from '@/types/course-wizard';
import { WIZARD_STEPS } from '@/types/course-wizard';
import { basicsSchema, curriculumSchema, landingPageSchema, pricingSchema } from '@/lib/validations/course-wizard';

const createEmptyCourseData = (): CourseWizardData => ({
  title: '',
  subtitle: '',
  category: '',
  level: 'All Levels',
  language: 'English',
  primaryTopicTags: [],
  sections: [],
  description: '',
  whatYoullLearn: [],
  prerequisites: [],
  promoVideoUrl: '',
  courseImageUrl: '',
  price: 0,
  originalPrice: undefined,
  discountPercentage: undefined,
  visibility: 'draft',
  isSubmitted: false
});

const createInitialSteps = (): WizardStep[] => 
  WIZARD_STEPS.map((step, index) => ({
    ...step,
    isCompleted: false,
    isActive: index === 0,
    isValid: false
  }));

interface CourseWizardStore extends WizardState {
  // Actions
  setCurrentStep: (step: number) => void;
  updateStep: (stepIndex: number, updates: Partial<WizardStep>) => void;
  updateData: (updates: Partial<CourseWizardData>) => void;
  validateStep: (stepIndex: number) => boolean;
  validateAllSteps: () => void;
  saveDraft: () => void;
  loadDraft: (courseId?: string) => void;
  exportCourse: () => CourseWizardData | null;
  resetWizard: () => void;
  
  // Curriculum actions
  addSection: (section: Omit<CourseSection, 'id' | 'order'>) => void;
  updateSection: (sectionId: string, updates: Partial<CourseSection>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (sections: CourseSection[]) => void;
  
  addLecture: (sectionId: string, lecture: Omit<CourseLecture, 'id' | 'order' | 'sectionId'>) => void;
  updateLecture: (lectureId: string, updates: Partial<CourseLecture>) => void;
  deleteLecture: (lectureId: string) => void;
  reorderLectures: (sectionId: string, lectures: CourseLecture[]) => void;
  moveLecture: (lectureId: string, fromSectionId: string, toSectionId: string, newOrder: number) => void;
}

export const useCourseWizardStore = create<CourseWizardStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      steps: createInitialSteps(),
      data: createEmptyCourseData(),
      isDirty: false,
      lastSaved: null,

      // Actions
      setCurrentStep: (step) => {
        const { steps } = get();
        const updatedSteps = steps.map((s, index) => ({
          ...s,
          isActive: index === step
        }));
        
        set({ 
          currentStep: step, 
          steps: updatedSteps 
        });
      },

      updateStep: (stepIndex, updates) => {
        const { steps } = get();
        const updatedSteps = steps.map((step, index) => 
          index === stepIndex ? { ...step, ...updates } : step
        );
        
        set({ steps: updatedSteps });
      },

      updateData: (updates) => {
        set((state) => ({
          data: { ...state.data, ...updates },
          isDirty: true
        }));
      },

      validateStep: (stepIndex) => {
        const { data } = get();
        let isValid = false;

        try {
          switch (stepIndex) {
            case 0: // Basics
              basicsSchema.parse({
                title: data.title,
                subtitle: data.subtitle,
                category: data.category,
                level: data.level,
                language: data.language,
                primaryTopicTags: data.primaryTopicTags
              });
              isValid = true;
              break;
            case 1: // Curriculum
              curriculumSchema.parse({
                sections: data.sections
              });
              isValid = true;
              break;
            case 2: // Landing Page
              landingPageSchema.parse({
                description: data.description,
                whatYoullLearn: data.whatYoullLearn,
                prerequisites: data.prerequisites,
                promoVideoUrl: data.promoVideoUrl,
                courseImageUrl: data.courseImageUrl
              });
              isValid = true;
              break;
            case 3: // Pricing
              pricingSchema.parse({
                price: data.price,
                originalPrice: data.originalPrice,
                discountPercentage: data.discountPercentage,
                visibility: data.visibility,
                isSubmitted: data.isSubmitted
              });
              isValid = true;
              break;
          }
        } catch (error) {
          isValid = false;
        }

        // Update step validation status
        get().updateStep(stepIndex, { isValid });
        return isValid;
      },

      validateAllSteps: () => {
        const { steps } = get();
        const updatedSteps = steps.map((_, index) => ({
          ...steps[index],
          isValid: get().validateStep(index)
        }));
        
        set({ steps: updatedSteps });
      },

      saveDraft: () => {
        // Only save draft on client side
        if (typeof window === 'undefined') return;
        
        const { data } = get();
        const draftData = {
          ...data,
          lastSaved: new Date().toISOString()
        };
        
        localStorage.setItem('course-wizard-draft', JSON.stringify(draftData));
        set({ 
          isDirty: false, 
          lastSaved: new Date().toISOString() 
        });
      },

      loadDraft: (courseId) => {
        // Only load draft on client side
        if (typeof window === 'undefined') return;
        
        try {
          const draftKey = courseId ? `course-wizard-draft-${courseId}` : 'course-wizard-draft';
          const draftData = localStorage.getItem(draftKey);
          
          if (draftData) {
            const parsed = JSON.parse(draftData);
            set({ 
              data: { ...createEmptyCourseData(), ...parsed },
              isDirty: false,
              lastSaved: parsed.lastSaved || null
            });
            get().validateAllSteps();
          }
        } catch {
          console.error('Failed to load draft');
        }
      },

      exportCourse: () => {
        // Only export on client side
        if (typeof window === 'undefined') return null;
        
        const { data } = get();
        
        // Normalize the data for backend
        const normalizedCourse = {
          ...data,
          sections: data.sections.map((section, sectionIndex) => ({
            ...section,
            order: sectionIndex + 1,
            lectures: section.lectures.map((lecture, lectureIndex) => ({
              ...lecture,
              order: lectureIndex + 1
            }))
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        return normalizedCourse;
      },

      resetWizard: () => {
        set({
          currentStep: 0,
          steps: createInitialSteps(),
          data: createEmptyCourseData(),
          isDirty: false,
          lastSaved: null
        });
      },

      // Curriculum actions
      addSection: (sectionData) => {
        const { data } = get();
        const newSection: CourseSection = {
          ...sectionData,
          id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          order: data.sections.length + 1
        };
        
        set((state) => ({
          data: {
            ...state.data,
            sections: [...state.data.sections, newSection]
          },
          isDirty: true
        }));
      },

      updateSection: (sectionId, updates) => {
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map(section =>
              section.id === sectionId ? { ...section, ...updates } : section
            )
          },
          isDirty: true
        }));
      },

      deleteSection: (sectionId) => {
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.filter(section => section.id !== sectionId)
          },
          isDirty: true
        }));
      },

      reorderSections: (sections) => {
        const reorderedSections = sections.map((section, index) => ({
          ...section,
          order: index + 1
        }));
        
        set((state) => ({
          data: {
            ...state.data,
            sections: reorderedSections
          },
          isDirty: true
        }));
      },

      addLecture: (sectionId, lectureData) => {
        const { data } = get();
        const section = data.sections.find(s => s.id === sectionId);
        if (!section) return;

        const newLecture: CourseLecture = {
          ...lectureData,
          id: `lecture-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          order: section.lectures.length + 1,
          sectionId
        };

        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map(section =>
              section.id === sectionId
                ? { ...section, lectures: [...section.lectures, newLecture] }
                : section
            )
          },
          isDirty: true
        }));
      },

      updateLecture: (lectureId, updates) => {
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map(section => ({
              ...section,
              lectures: section.lectures.map(lecture =>
                lecture.id === lectureId ? { ...lecture, ...updates } : lecture
              )
            }))
          },
          isDirty: true
        }));
      },

      deleteLecture: (lectureId) => {
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map(section => ({
              ...section,
              lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
            }))
          },
          isDirty: true
        }));
      },

      reorderLectures: (sectionId, lectures) => {
        const reorderedLectures = lectures.map((lecture, index) => ({
          ...lecture,
          order: index + 1
        }));

        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map(section =>
              section.id === sectionId
                ? { ...section, lectures: reorderedLectures }
                : section
            )
          },
          isDirty: true
        }));
      },

      moveLecture: (lectureId, fromSectionId, toSectionId, newOrder) => {
        const { data } = get();
        const fromSection = data.sections.find(s => s.id === fromSectionId);
        const toSection = data.sections.find(s => s.id === toSectionId);
        
        if (!fromSection || !toSection) return;

        const lecture = fromSection.lectures.find(l => l.id === lectureId);
        if (!lecture) return;

        // Remove from source section
        const updatedFromSection = {
          ...fromSection,
          lectures: fromSection.lectures.filter(l => l.id !== lectureId)
        };

        // Add to target section
        const updatedToSection = {
          ...toSection,
          lectures: [
            ...toSection.lectures.slice(0, newOrder),
            { ...lecture, sectionId: toSectionId, order: newOrder + 1 },
            ...toSection.lectures.slice(newOrder).map(l => ({ ...l, order: l.order + 1 }))
          ]
        };

        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map(section => {
              if (section.id === fromSectionId) return updatedFromSection;
              if (section.id === toSectionId) return updatedToSection;
              return section;
            })
          },
          isDirty: true
        }));
      }
    }),
    {
      name: 'course-wizard-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        data: state.data,
        isDirty: state.isDirty,
        lastSaved: state.lastSaved
      })
    }
  )
);
