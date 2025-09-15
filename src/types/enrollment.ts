export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  enrolledAt: string;
  lastAccessedAt: string;
  progress: {
    completedLectures: number;
    totalLectures: number;
    completedSections: number;
    totalSections: number;
    timeSpent: number; // in minutes
    completionPercentage: number;
  };
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  currentLecture?: {
    id: string;
    title: string;
    sectionTitle: string;
    duration: number;
    watchedDuration: number;
  };
  certificate?: {
    id: string;
    issuedAt: string;
    downloadUrl: string;
  };
}

export interface LearningStats {
  learningStreak: number; // days
  totalMinutes: number;
  certificatesEarned: number;
  quizzesPassed: number;
  coursesCompleted: number;
  coursesInProgress: number;
  averageRating: number;
  lastActivityDate: string;
}

export interface Recommendation {
  id: string;
  courseId: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: string;
  rating: number;
  studentsCount: number;
  price: number;
  reason: string; // Why this course is recommended
  matchPercentage: number; // How well it matches user's interests
}
