export interface InstructorKPIs {
  totalRevenue: number;
  monthlyRevenue: number;
  totalStudents: number;
  monthlyStudents: number;
  averageRating: number;
  totalReviews: number;
  conversionRate: number;
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  status: 'published' | 'draft' | 'archived';
  price: number;
  originalPrice?: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  revenue: number;
  lastUpdated: string;
  createdAt: string;
  publishedAt?: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: number; // in minutes
  lecturesCount: number;
}

export interface InstructorReview {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  isInstructorResponse: boolean;
  instructorResponse?: {
    content: string;
    createdAt: string;
  };
  helpfulCount: number;
  isHelpful?: boolean;
}

export interface PayoutInfo {
  nextPayoutDate: string;
  pendingAmount: number;
  lastPayoutAmount: number;
  lastPayoutDate: string;
  totalEarnings: number;
  currency: string;
}

export interface InstructorStats {
  kpis: InstructorKPIs;
  courses: InstructorCourse[];
  recentReviews: InstructorReview[];
  payoutInfo: PayoutInfo;
}
