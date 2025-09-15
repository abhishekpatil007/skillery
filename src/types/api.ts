// Base API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

// Pagination metadata
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Course related types
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: Instructor;
  rating: CourseRating;
  studentsCount: number;
  lastUpdated: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  subcategory: string;
  tags: string[];
  badges: ('Bestseller' | 'New' | 'Hot & New' | 'Highest Rated')[];
  price: Price;
  includes: CourseIncludes;
  whatYoullLearn: string[];
  requirements: string[];
  curriculum: Section[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  bio: string;
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface CourseRating {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface Price {
  current: number;
  original?: number;
  currency: string;
}

export interface CourseIncludes {
  hours: number;
  articles: number;
  downloadableResources: number;
  access: 'Lifetime' | 'Limited';
  certificate: boolean;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  duration: number;
  order: number;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  title: string;
  description?: string;
  duration: number;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  isPreview: boolean;
  videoUrl?: string;
  content?: string;
  order: number;
  sectionId: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

// User and Auth types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  isVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Cart and Order types
export interface CartItem {
  id: string;
  courseId: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  duration: string;
  rating: number;
  studentsCount: number;
  language: string;
  level: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface AppliedCoupon {
  code: string;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  total: number;
  savings: number;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state?: string;
  city: string;
  postalCode: string;
  address: string;
  phone?: string;
}

export interface PaymentMethod {
  type: 'card' | 'upi' | 'paypal';
  last4?: string;
  brand?: string;
  upiId?: string;
  paypalEmail?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  totals: CartTotals;
  appliedCoupon?: AppliedCoupon;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

// Learning and Progress types
export interface Enrollment {
  id: string;
  courseId: string;
  course: Course;
  userId: string;
  enrolledAt: string;
  progress: number;
  lastWatchedAt?: string;
  completedAt?: string;
  certificateUrl?: string;
}

export interface LearningStats {
  totalMinutes: number;
  coursesCompleted: number;
  certificatesEarned: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface PlayerState {
  courseId: string;
  currentLectureId?: string;
  playbackPosition: number;
  playbackRate: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  notes: PlayerNote[];
}

export interface PlayerNote {
  id: string;
  lectureId: string;
  timestamp: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Instructor Dashboard types
export interface InstructorStats {
  totalRevenue: number;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  conversionRate: number;
  monthlyRevenue: number;
  monthlyStudents: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'archived';
  studentsCount: number;
  rating: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorReview {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  content: string;
  createdAt: string;
  isPublic: boolean;
}

// Search and Filter types
export interface SearchFilters {
  category?: string;
  level?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  duration?: {
    min: number;
    max: number;
  };
  language?: string;
  features?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: SearchFilters;
  sortBy?: 'relevance' | 'rating' | 'price' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// API Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

// Request/Response types for specific endpoints
export type GetCoursesRequest = SearchParams;
export type GetCoursesResponse = PaginatedResponse<Course>;
export type GetCourseRequest = { slug: string };
export type GetCourseResponse = ApiResponse<Course>;
export type GetUserEnrollmentsRequest = { userId: string; status?: 'all' | 'in_progress' | 'completed' };
export type GetUserEnrollmentsResponse = ApiResponse<Enrollment[]>;
export type GetLearningStatsRequest = { userId: string };
export type GetLearningStatsResponse = ApiResponse<LearningStats>;
export type GetInstructorStatsRequest = { instructorId: string; period?: 'week' | 'month' | 'year' };
export type GetInstructorStatsResponse = ApiResponse<InstructorStats>;
export type GetInstructorCoursesRequest = { instructorId: string; status?: 'all' | 'draft' | 'published' | 'archived'; page?: number; limit?: number };
export type GetInstructorCoursesResponse = PaginatedResponse<InstructorCourse>;
export type GetInstructorReviewsRequest = { instructorId: string; page?: number; limit?: number };
export type GetInstructorReviewsResponse = PaginatedResponse<InstructorReview>;
export type ApplyCouponRequest = { code: string; cartItems: CartItem[] };
export type ApplyCouponResponse = ApiResponse<AppliedCoupon>;
export type CreateOrderRequest = { items: CartItem[]; billingAddress: BillingAddress; paymentMethod: PaymentMethod; couponCode?: string };
export type CreateOrderResponse = ApiResponse<Order>;
export type UpdatePlayerStateRequest = { courseId: string; lectureId?: string; playbackPosition: number; playbackRate?: number; isPlaying?: boolean; volume?: number; isMuted?: boolean };
export type UpdatePlayerStateResponse = ApiResponse<PlayerState>;
export type SavePlayerNoteRequest = { lectureId: string; timestamp: number; content: string };
export type SavePlayerNoteResponse = ApiResponse<PlayerNote>;
export type DeletePlayerNoteRequest = { noteId: string };
export type DeletePlayerNoteResponse = ApiResponse<void>;
