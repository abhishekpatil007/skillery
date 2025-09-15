// API Routes - String constants for all endpoints
// This ensures type safety and makes it easy to update endpoints

export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },

  // Course routes
  COURSES: {
    LIST: '/courses',
    DETAIL: (slug: string) => `/courses/${slug}`,
    SEARCH: '/courses/search',
    FEATURED: '/courses/featured',
    TRENDING: '/courses/trending',
    CATEGORIES: '/courses/categories',
    LEVELS: '/courses/levels',
  },

  // User routes
  USERS: {
    PROFILE: (userId: string) => `/users/${userId}`,
    UPDATE_PROFILE: (userId: string) => `/users/${userId}`,
    ENROLLMENTS: (userId: string) => `/users/${userId}/enrollments`,
    LEARNING_STATS: (userId: string) => `/users/${userId}/learning-stats`,
    WISHLIST: (userId: string) => `/users/${userId}/wishlist`,
    ADD_TO_WISHLIST: (userId: string) => `/users/${userId}/wishlist`,
    REMOVE_FROM_WISHLIST: (userId: string, courseId: string) => `/users/${userId}/wishlist/${courseId}`,
  },

  // Cart routes
  CART: {
    LIST: '/cart',
    ADD_ITEM: '/cart/items',
    REMOVE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
    UPDATE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear',
    APPLY_COUPON: '/cart/coupon',
    REMOVE_COUPON: '/cart/coupon',
  },

  // Order routes
  ORDERS: {
    LIST: '/orders',
    DETAIL: (orderId: string) => `/orders/${orderId}`,
    CREATE: '/orders',
    CANCEL: (orderId: string) => `/orders/${orderId}/cancel`,
    RECEIPT: (orderId: string) => `/orders/${orderId}/receipt`,
  },

  // Payment routes
  PAYMENTS: {
    PROCESS: '/payments/process',
    VERIFY: '/payments/verify',
    METHODS: '/payments/methods',
  },

  // Learning routes
  LEARNING: {
    ENROLL: (courseId: string) => `/learning/courses/${courseId}/enroll`,
    UNENROLL: (courseId: string) => `/learning/courses/${courseId}/unenroll`,
    PROGRESS: (courseId: string) => `/learning/courses/${courseId}/progress`,
    MARK_COMPLETE: (courseId: string, lectureId: string) => `/learning/courses/${courseId}/lectures/${lectureId}/complete`,
    PLAYER_STATE: (courseId: string) => `/learning/courses/${courseId}/player-state`,
    NOTES: (courseId: string) => `/learning/courses/${courseId}/notes`,
    SAVE_NOTE: (courseId: string) => `/learning/courses/${courseId}/notes`,
    DELETE_NOTE: (courseId: string, noteId: string) => `/learning/courses/${courseId}/notes/${noteId}`,
  },

  // Instructor routes
  INSTRUCTOR: {
    DASHBOARD: (instructorId: string) => `/instructor/${instructorId}/dashboard`,
    STATS: (instructorId: string) => `/instructor/${instructorId}/stats`,
    COURSES: (instructorId: string) => `/instructor/${instructorId}/courses`,
    CREATE_COURSE: (instructorId: string) => `/instructor/${instructorId}/courses`,
    UPDATE_COURSE: (instructorId: string, courseId: string) => `/instructor/${instructorId}/courses/${courseId}`,
    DELETE_COURSE: (instructorId: string, courseId: string) => `/instructor/${instructorId}/courses/${courseId}`,
    PUBLISH_COURSE: (instructorId: string, courseId: string) => `/instructor/${instructorId}/courses/${courseId}/publish`,
    UNPUBLISH_COURSE: (instructorId: string, courseId: string) => `/instructor/${instructorId}/courses/${courseId}/unpublish`,
    REVIEWS: (instructorId: string) => `/instructor/${instructorId}/reviews`,
    EARNINGS: (instructorId: string) => `/instructor/${instructorId}/earnings`,
    PAYOUTS: (instructorId: string) => `/instructor/${instructorId}/payouts`,
  },

  // Review routes
  REVIEWS: {
    LIST: (courseId: string) => `/courses/${courseId}/reviews`,
    CREATE: (courseId: string) => `/courses/${courseId}/reviews`,
    UPDATE: (courseId: string, reviewId: string) => `/courses/${courseId}/reviews/${reviewId}`,
    DELETE: (courseId: string, reviewId: string) => `/courses/${courseId}/reviews/${reviewId}`,
    HELPFUL: (courseId: string, reviewId: string) => `/courses/${courseId}/reviews/${reviewId}/helpful`,
  },

  // Coupon routes
  COUPONS: {
    VALIDATE: '/coupons/validate',
    APPLY: '/coupons/apply',
  },

  // File upload routes
  UPLOAD: {
    IMAGE: '/upload/image',
    VIDEO: '/upload/video',
    DOCUMENT: '/upload/document',
  },

  // Notification routes
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (notificationId: string) => `/notifications/${notificationId}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    PREFERENCES: '/notifications/preferences',
  },

  // Support routes
  SUPPORT: {
    TICKETS: '/support/tickets',
    CREATE_TICKET: '/support/tickets',
    TICKET_DETAIL: (ticketId: string) => `/support/tickets/${ticketId}`,
    FAQ: '/support/faq',
    CONTACT: '/support/contact',
  },

  // Analytics routes
  ANALYTICS: {
    COURSE_VIEWS: (courseId: string) => `/analytics/courses/${courseId}/views`,
    LEARNING_PROGRESS: (userId: string) => `/analytics/users/${userId}/learning-progress`,
    INSTRUCTOR_PERFORMANCE: (instructorId: string) => `/analytics/instructor/${instructorId}/performance`,
  },
} as const;

// Type for all route values
export type ApiRoute = string;

// Helper function to build query parameters
export function buildQueryParams(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Helper function to build URL with query parameters
export function buildUrl(endpoint: string, params?: Record<string, unknown>): string {
  const queryString = params ? buildQueryParams(params) : '';
  return `${endpoint}${queryString}`;
}
