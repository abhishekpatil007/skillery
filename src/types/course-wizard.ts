export interface CourseWizardData {
  // Basics
  title: string;
  subtitle: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language: string;
  primaryTopicTags: string[];
  
  // Curriculum
  sections: CourseSection[];
  
  // Landing Page
  description: string;
  whatYoullLearn: string[];
  prerequisites: string[];
  promoVideoUrl: string;
  courseImageUrl: string;
  
  // Pricing & Publishing
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  visibility: 'draft' | 'published';
  isSubmitted: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  description?: string;
  lectures: CourseLecture[];
  order: number;
}

export interface CourseLecture {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number; // in minutes
  isPreview: boolean;
  videoUrl?: string;
  content?: string; // for text lectures
  order: number;
  sectionId: string;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  isValid: boolean;
}

export interface WizardState {
  currentStep: number;
  steps: WizardStep[];
  data: CourseWizardData;
  isDirty: boolean;
  lastSaved: string | null;
}

export const COURSE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Design',
  'Business',
  'Marketing',
  'Photography',
  'Music',
  'Health & Fitness',
  'Lifestyle',
  'Other'
] as const;

export const COURSE_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'All Levels'
] as const;

export const LECTURE_TYPES = [
  { value: 'video', label: 'Video Lecture', icon: '🎥' },
  { value: 'text', label: 'Text Lecture', icon: '📄' },
  { value: 'quiz', label: 'Quiz', icon: '❓' },
  { value: 'assignment', label: 'Assignment', icon: '📝' }
] as const;

export const WIZARD_STEPS = [
  {
    id: 'basics',
    title: 'Course Basics',
    description: 'Set up the foundation of your course'
  },
  {
    id: 'curriculum',
    title: 'Curriculum',
    description: 'Structure your course content'
  },
  {
    id: 'landing',
    title: 'Landing Page',
    description: 'Create an engaging course page'
  },
  {
    id: 'pricing',
    title: 'Pricing & Publishing',
    description: 'Set price and publish your course'
  }
] as const;
