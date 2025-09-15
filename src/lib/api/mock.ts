import { ApiResponse, PaginatedResponse } from '@/types/api';
import { API_ROUTES } from './routes';

// Mock data imports
import coursesData from '@/data/courses.json';
import courseDetailsData from '@/data/course-details/web-development-complete-guide.json';
import enrollmentsData from '@/data/me/enrollments.json';
import learningStatsData from '@/data/me/learning-stats.json';
import recommendationsData from '@/data/me/recommendations.json';
import instructorDashboardData from '@/data/instructor/dashboard.json';

// Mock delay function to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between 100-500ms to simulate real API
const randomDelay = () => delay(Math.random() * 400 + 100);

// Mock user data
const mockUser = {
  id: 'user_123',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  role: 'student' as const,
  isVerified: true,
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

// Mock cart data
let mockCart: unknown[] = [];

// Mock orders data
const mockOrders: unknown[] = [];

// Mock player state
const mockPlayerState: Record<string, unknown> = {};

// Mock notes data
let mockNotes: unknown[] = [];

// Helper function to create paginated response
function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    success: true,
    meta: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1,
    },
  };
}

// Mock API functions
export const mockApi = {
  // Auth endpoints
  async login(credentials: unknown): Promise<unknown> {
    await randomDelay();
    return {
      user: mockUser,
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresIn: 3600,
      },
    };
  },

  async signup(userData: unknown): Promise<unknown> {
    await randomDelay();
    return {
      user: { ...mockUser, ...(userData as Record<string, unknown>) },
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresIn: 3600,
      },
    };
  },

  async getMe(): Promise<unknown> {
    await randomDelay();
    return mockUser;
  },

  // Course endpoints
  async getCourses(params: Record<string, unknown> = {}): Promise<PaginatedResponse<unknown>> {
    await randomDelay();
    const { page = 1, limit = 10, category, level, search } = params;
    const pageNum = typeof page === 'number' ? page : 1;
    const limitNum = typeof limit === 'number' ? limit : 10;
    
    let filteredCourses = [...coursesData];
    
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    
    if (level) {
      filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    
    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchLower)
      );
    }
    
    return createPaginatedResponse(filteredCourses, pageNum, limitNum);
  },

  async getCourse(slug: string): Promise<ApiResponse<unknown>> {
    await randomDelay();
    return {
      data: courseDetailsData,
      success: true,
    };
  },

  async searchCourses(params: Record<string, unknown>): Promise<PaginatedResponse<unknown>> {
    await randomDelay();
    return this.getCourses(params);
  },

  // User endpoints
  async getUserEnrollments(userId: string, params: Record<string, unknown> = {}): Promise<ApiResponse<unknown[]>> {
    await randomDelay();
    return {
      data: enrollmentsData,
      success: true,
    };
  },

  async getLearningStats(userId: string): Promise<ApiResponse<unknown>> {
    await randomDelay();
    return {
      data: learningStatsData,
      success: true,
    };
  },

  async getRecommendations(userId: string): Promise<ApiResponse<unknown[]>> {
    await randomDelay();
    return {
      data: recommendationsData,
      success: true,
    };
  },

  // Cart endpoints
  async getCart(): Promise<ApiResponse<unknown[]>> {
    await randomDelay();
    return {
      data: mockCart,
      success: true,
    };
  },

  async addToCart(item: unknown): Promise<ApiResponse<unknown>> {
    await randomDelay();
    const itemData = item as Record<string, unknown>;
    const existingItem = mockCart.find((cartItem: unknown) => 
      (cartItem as Record<string, unknown>).id === itemData.id
    );
    
    if (!existingItem) {
      mockCart.push(item);
    }
    
    return {
      data: mockCart,
      success: true,
    };
  },

  async removeFromCart(itemId: string): Promise<ApiResponse<unknown[]>> {
    await randomDelay();
    mockCart = mockCart.filter((item: unknown) => 
      (item as Record<string, unknown>).id !== itemId
    );
    
    return {
      data: mockCart,
      success: true,
    };
  },

  async clearCart(): Promise<ApiResponse<unknown[]>> {
    await randomDelay();
    mockCart = [];
    
    return {
      data: mockCart,
      success: true,
    };
  },

  async applyCoupon(code: string): Promise<ApiResponse<unknown>> {
    await randomDelay();
    
    // Mock coupon validation
    const validCoupons: Record<string, unknown> = {
      'WELCOME10': { code: 'WELCOME10', discountType: 'percentage', value: 10, minAmount: 50 },
      'SAVE20': { code: 'SAVE20', discountType: 'percentage', value: 20, minAmount: 100 },
      'FLAT50': { code: 'FLAT50', discountType: 'fixed', value: 50, minAmount: 200 },
    };
    
    const coupon = validCoupons[code.toUpperCase()];
    
    if (!coupon) {
      throw {
        code: 'INVALID_COUPON',
        message: 'Invalid or expired coupon code',
        statusCode: 400,
      };
    }
    
    return {
      data: coupon,
      success: true,
    };
  },

  // Order endpoints
  async createOrder(orderData: unknown): Promise<ApiResponse<unknown>> {
    await randomDelay();
    
    const order = {
      id: `order_${Date.now()}`,
      orderNumber: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...(orderData as Record<string, unknown>),
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
    
    mockOrders.push(order);
    mockCart = []; // Clear cart after successful order
    
    return {
      data: order,
      success: true,
    };
  },

  async getOrders(): Promise<ApiResponse<unknown[]>> {
    await randomDelay();
    return {
      data: mockOrders,
      success: true,
    };
  },

  // Learning endpoints
  async enrollInCourse(courseId: string): Promise<ApiResponse<unknown>> {
    await randomDelay();
    return {
      data: { courseId, enrolledAt: new Date().toISOString() },
      success: true,
    };
  },

  async updateLearningProgress(courseId: string, progress: unknown): Promise<ApiResponse<unknown>> {
    await randomDelay();
    return {
      data: { courseId, progress },
      success: true,
    };
  },

  // Player endpoints
  async getPlayerState(courseId: string): Promise<ApiResponse<unknown>> {
    await randomDelay();
    return {
      data: mockPlayerState[courseId] || {
        courseId,
        playbackPosition: 0,
        playbackRate: 1,
        isPlaying: false,
        volume: 1,
        isMuted: false,
        notes: [],
      },
      success: true,
    };
  },

  async updatePlayerState(courseId: string, state: unknown): Promise<ApiResponse<unknown>> {
    await randomDelay();
    const existingState = mockPlayerState[courseId] || {};
    mockPlayerState[courseId] = { ...existingState, ...(state as Record<string, unknown>) };
    
    return {
      data: mockPlayerState[courseId],
      success: true,
    };
  },

  async saveNote(courseId: string, note: unknown): Promise<ApiResponse<unknown>> {
    await randomDelay();
    const newNote = {
      id: `note_${Date.now()}`,
      ...(note as Record<string, unknown>),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockNotes.push(newNote);
    
    return {
      data: newNote,
      success: true,
    };
  },

  async deleteNote(noteId: string): Promise<ApiResponse<void>> {
    await randomDelay();
    mockNotes = mockNotes.filter((note: unknown) => 
      (note as Record<string, unknown>).id !== noteId
    );
    
    return {
      data: undefined,
      success: true,
    };
  },

  // Instructor endpoints
  async getInstructorStats(instructorId: string): Promise<ApiResponse<unknown>> {
    await randomDelay();
    return {
      data: instructorDashboardData.kpis,
      success: true,
    };
  },

  async getInstructorCourses(instructorId: string, params: Record<string, unknown> = {}): Promise<PaginatedResponse<unknown>> {
    await randomDelay();
    const { page = 1, limit = 10 } = params;
    const pageNum = typeof page === 'number' ? page : 1;
    const limitNum = typeof limit === 'number' ? limit : 10;
    
    return createPaginatedResponse(instructorDashboardData.courses, pageNum, limitNum);
  },

  async getInstructorReviews(instructorId: string, params: Record<string, unknown> = {}): Promise<PaginatedResponse<unknown>> {
    await randomDelay();
    const { page = 1, limit = 10 } = params;
    const pageNum = typeof page === 'number' ? page : 1;
    const limitNum = typeof limit === 'number' ? limit : 10;
    
    return createPaginatedResponse(instructorDashboardData.recentReviews, pageNum, limitNum);
  },

  // Review endpoints
  async getCourseReviews(courseId: string, params: Record<string, unknown> = {}): Promise<PaginatedResponse<unknown>> {
    await randomDelay();
    const { page = 1, limit = 10 } = params;
    const pageNum = typeof page === 'number' ? page : 1;
    const limitNum = typeof limit === 'number' ? limit : 10;
    
    return createPaginatedResponse(courseDetailsData.reviews || [], pageNum, limitNum);
  },

  async createReview(courseId: string, review: unknown): Promise<ApiResponse<unknown>> {
    await randomDelay();
    const newReview = {
      id: `review_${Date.now()}`,
      ...(review as Record<string, unknown>),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      data: newReview,
      success: true,
    };
  },
};

// Route handler function
export function handleMockRoute(endpoint: string, method: string, body?: unknown): Promise<unknown> {
  const route = endpoint.replace('/api', '');
  
  // Auth routes
  if (route === API_ROUTES.AUTH.LOGIN && method === 'POST') {
    return mockApi.login(body);
  }
  if (route === API_ROUTES.AUTH.SIGNUP && method === 'POST') {
    return mockApi.signup(body);
  }
  if (route === API_ROUTES.AUTH.ME && method === 'GET') {
    return mockApi.getMe();
  }
  
  // Course routes
  if (route === API_ROUTES.COURSES.LIST && method === 'GET') {
    return mockApi.getCourses(body as Record<string, unknown>);
  }
  if (route.startsWith('/courses/') && !route.includes('/reviews') && method === 'GET') {
    const slug = route.split('/')[2];
    return mockApi.getCourse(slug);
  }
  if (route === API_ROUTES.COURSES.SEARCH && method === 'GET') {
    return mockApi.searchCourses(body as Record<string, unknown>);
  }
  
  // User routes
  if (route.includes('/enrollments') && method === 'GET') {
    const userId = route.split('/')[2];
    return mockApi.getUserEnrollments(userId, body as Record<string, unknown>);
  }
  if (route.includes('/learning-stats') && method === 'GET') {
    const userId = route.split('/')[2];
    return mockApi.getLearningStats(userId);
  }
  
  // Cart routes
  if (route === API_ROUTES.CART.LIST && method === 'GET') {
    return mockApi.getCart();
  }
  if (route === API_ROUTES.CART.ADD_ITEM && method === 'POST') {
    return mockApi.addToCart(body as Record<string, unknown>);
  }
  if (route.startsWith('/cart/items/') && method === 'DELETE') {
    const itemId = route.split('/')[3];
    return mockApi.removeFromCart(itemId);
  }
  if (route === API_ROUTES.CART.CLEAR && method === 'DELETE') {
    return mockApi.clearCart();
  }
      if (route === API_ROUTES.CART.APPLY_COUPON && method === 'POST') {
        const bodyData = body as Record<string, unknown>;
        return mockApi.applyCoupon(bodyData.code as string);
      }
  
  // Order routes
  if (route === API_ROUTES.ORDERS.CREATE && method === 'POST') {
    return mockApi.createOrder(body as Record<string, unknown>);
  }
  if (route === API_ROUTES.ORDERS.LIST && method === 'GET') {
    return mockApi.getOrders();
  }
  
  // Learning routes
  if (route.includes('/enroll') && method === 'POST') {
    const courseId = route.split('/')[3];
    return mockApi.enrollInCourse(courseId);
  }
  if (route.includes('/player-state') && method === 'GET') {
    const courseId = route.split('/')[3];
    return mockApi.getPlayerState(courseId);
  }
  if (route.includes('/player-state') && method === 'PUT') {
    const courseId = route.split('/')[3];
    return mockApi.updatePlayerState(courseId, body as Record<string, unknown>);
  }
  if (route.includes('/notes') && method === 'POST') {
    const courseId = route.split('/')[3];
    return mockApi.saveNote(courseId, body as Record<string, unknown>);
  }
  if (route.includes('/notes/') && method === 'DELETE') {
    const noteId = route.split('/').pop();
    return mockApi.deleteNote(noteId!);
  }
  
  // Instructor routes
  if (route.includes('/instructor/') && route.includes('/stats') && method === 'GET') {
    const instructorId = route.split('/')[2];
    return mockApi.getInstructorStats(instructorId);
  }
  if (route.includes('/instructor/') && route.includes('/courses') && method === 'GET') {
    const instructorId = route.split('/')[2];
    return mockApi.getInstructorCourses(instructorId, body as Record<string, unknown>);
  }
  if (route.includes('/instructor/') && route.includes('/reviews') && method === 'GET') {
    const instructorId = route.split('/')[2];
    return mockApi.getInstructorReviews(instructorId, body as Record<string, unknown>);
  }
  
  // Review routes
  if (route.includes('/reviews') && method === 'GET') {
    const courseId = route.split('/')[2];
    return mockApi.getCourseReviews(courseId, body as Record<string, unknown>);
  }
  if (route.includes('/reviews') && method === 'POST') {
    const courseId = route.split('/')[2];
    return mockApi.createReview(courseId, body as Record<string, unknown>);
  }
  
  // Default fallback
  return Promise.resolve({
    data: null,
    success: false,
    message: 'Mock endpoint not found',
  });
}
