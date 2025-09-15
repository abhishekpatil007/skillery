import { api, shouldUseMock } from './client';
import { handleMockRoute } from './mock';
import { API_ROUTES } from './routes';
import {
  // Request types
  GetCoursesRequest,
  GetCourseRequest,
  GetUserEnrollmentsRequest,
  GetLearningStatsRequest,
  GetInstructorStatsRequest,
  GetInstructorCoursesRequest,
  GetInstructorReviewsRequest,
  ApplyCouponRequest,
  CreateOrderRequest,
  UpdatePlayerStateRequest,
  SavePlayerNoteRequest,
  DeletePlayerNoteRequest,
  LoginRequest,
  SignupRequest,
  
  // Response types
  GetCoursesResponse,
  GetCourseResponse,
  GetUserEnrollmentsResponse,
  GetLearningStatsResponse,
  GetInstructorStatsResponse,
  GetInstructorCoursesResponse,
  GetInstructorReviewsResponse,
  ApplyCouponResponse,
  CreateOrderResponse,
  UpdatePlayerStateResponse,
  SavePlayerNoteResponse,
  DeletePlayerNoteResponse,
  AuthResponse,
  ApiResponse,
  
  // Data types
  Course,
  User,
  Enrollment,
  LearningStats,
  InstructorStats,
  InstructorCourse,
  InstructorReview,
  AppliedCoupon,
  Order,
  PlayerState,
  PlayerNote,
  CartItem,
} from '@/types/api';

// Main API service class
class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    method: string = 'GET',
    body?: unknown
  ): Promise<T> {
    if (shouldUseMock()) {
      return handleMockRoute(endpoint, method, body) as T;
    }
    
    // Real API call - fetchJson returns ApiResponse<T>, extract data
    let response: ApiResponse<T>;
    switch (method) {
      case 'GET':
        response = await api.get<T>(endpoint);
        break;
      case 'POST':
        response = await api.post<T>(endpoint, body);
        break;
      case 'PUT':
        response = await api.put<T>(endpoint, body);
        break;
      case 'PATCH':
        response = await api.patch<T>(endpoint, body);
        break;
      case 'DELETE':
        response = await api.delete<T>(endpoint);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    
    return response.data;
  }

  // Auth API
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(API_ROUTES.AUTH.LOGIN, 'POST', credentials);
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(API_ROUTES.AUTH.SIGNUP, 'POST', userData);
  }

  async logout(): Promise<void> {
    return this.makeRequest<void>(API_ROUTES.AUTH.LOGOUT, 'POST');
  }

  async getMe(): Promise<User> {
    return this.makeRequest<User>(API_ROUTES.AUTH.ME, 'GET');
  }

  // Course API
  async getCourses(params: GetCoursesRequest = {}): Promise<GetCoursesResponse> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    
    const endpoint = `${API_ROUTES.COURSES.LIST}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return this.makeRequest<GetCoursesResponse>(endpoint, 'GET');
  }

  async getCourse(slug: string): Promise<GetCourseResponse> {
    return this.makeRequest<GetCourseResponse>(API_ROUTES.COURSES.DETAIL(slug), 'GET');
  }

  async searchCourses(params: GetCoursesRequest): Promise<GetCoursesResponse> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    
    const endpoint = `${API_ROUTES.COURSES.SEARCH}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return this.makeRequest<GetCoursesResponse>(endpoint, 'GET');
  }

  // User API
  async getUserEnrollments(userId: string, params: Omit<GetUserEnrollmentsRequest, 'userId'> = {}): Promise<GetUserEnrollmentsResponse> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    
    const endpoint = `${API_ROUTES.USERS.ENROLLMENTS(userId)}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return this.makeRequest<GetUserEnrollmentsResponse>(endpoint, 'GET');
  }

  async getLearningStats(userId: string): Promise<GetLearningStatsResponse> {
    return this.makeRequest<GetLearningStatsResponse>(API_ROUTES.USERS.LEARNING_STATS(userId), 'GET');
  }

  // Cart API
  async getCart(): Promise<CartItem[]> {
    return this.makeRequest<CartItem[]>(API_ROUTES.CART.LIST, 'GET');
  }

  async addToCart(item: CartItem): Promise<CartItem[]> {
    return this.makeRequest<CartItem[]>(API_ROUTES.CART.ADD_ITEM, 'POST', item);
  }

  async removeFromCart(itemId: string): Promise<CartItem[]> {
    return this.makeRequest<CartItem[]>(API_ROUTES.CART.REMOVE_ITEM(itemId), 'DELETE');
  }

  async clearCart(): Promise<CartItem[]> {
    return this.makeRequest<CartItem[]>(API_ROUTES.CART.CLEAR, 'DELETE');
  }

  async applyCoupon(request: ApplyCouponRequest): Promise<AppliedCoupon> {
    return this.makeRequest<AppliedCoupon>(API_ROUTES.CART.APPLY_COUPON, 'POST', request);
  }

  // Order API
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return this.makeRequest<Order>(API_ROUTES.ORDERS.CREATE, 'POST', orderData);
  }

  async getOrders(): Promise<Order[]> {
    return this.makeRequest<Order[]>(API_ROUTES.ORDERS.LIST, 'GET');
  }

  // Learning API
  async enrollInCourse(courseId: string): Promise<void> {
    await this.makeRequest<void>(API_ROUTES.LEARNING.ENROLL(courseId), 'POST');
  }

  async updateLearningProgress(courseId: string, progress: unknown): Promise<void> {
    await this.makeRequest<void>(API_ROUTES.LEARNING.PROGRESS(courseId), 'PUT', progress);
  }

  // Player API
  async getPlayerState(courseId: string): Promise<PlayerState> {
    return this.makeRequest<PlayerState>(API_ROUTES.LEARNING.PLAYER_STATE(courseId), 'GET');
  }

  async updatePlayerState(courseId: string, state: Omit<UpdatePlayerStateRequest, 'courseId'>): Promise<PlayerState> {
    return this.makeRequest<PlayerState>(API_ROUTES.LEARNING.PLAYER_STATE(courseId), 'PUT', { ...state, courseId });
  }

  async saveNote(courseId: string, note: SavePlayerNoteRequest): Promise<PlayerNote> {
    return this.makeRequest<PlayerNote>(API_ROUTES.LEARNING.SAVE_NOTE(courseId), 'POST', note);
  }

  async deleteNote(courseId: string, noteId: string): Promise<void> {
    await this.makeRequest<void>(API_ROUTES.LEARNING.DELETE_NOTE(courseId, noteId), 'DELETE');
  }

  // Instructor API
  async getInstructorStats(instructorId: string): Promise<InstructorStats> {
    return this.makeRequest<InstructorStats>(API_ROUTES.INSTRUCTOR.STATS(instructorId), 'GET');
  }

  async getInstructorCourses(instructorId: string, params: Omit<GetInstructorCoursesRequest, 'instructorId'> = {}): Promise<GetInstructorCoursesResponse> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    
    const endpoint = `${API_ROUTES.INSTRUCTOR.COURSES(instructorId)}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return this.makeRequest<GetInstructorCoursesResponse>(endpoint, 'GET');
  }

  async getInstructorReviews(instructorId: string, params: Omit<GetInstructorReviewsRequest, 'instructorId'> = {}): Promise<GetInstructorReviewsResponse> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    
    const endpoint = `${API_ROUTES.INSTRUCTOR.REVIEWS(instructorId)}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return this.makeRequest<GetInstructorReviewsResponse>(endpoint, 'GET');
  }

  // Review API
  async getCourseReviews(courseId: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    
    const endpoint = `${API_ROUTES.REVIEWS.LIST(courseId)}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return this.makeRequest<unknown>(endpoint, 'GET');
  }

  async createReview(courseId: string, review: unknown): Promise<unknown> {
    return this.makeRequest<unknown>(API_ROUTES.REVIEWS.CREATE(courseId), 'POST', review);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual functions for convenience
export const {
  // Auth
  login,
  signup,
  logout,
  getMe,
  
  // Courses
  getCourses,
  getCourse,
  searchCourses,
  
  // User
  getUserEnrollments,
  getLearningStats,
  
  // Cart
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  applyCoupon,
  
  // Orders
  createOrder,
  getOrders,
  
  // Learning
  enrollInCourse,
  updateLearningProgress,
  
  // Player
  getPlayerState,
  updatePlayerState,
  saveNote,
  deleteNote,
  
  // Instructor
  getInstructorStats,
  getInstructorCourses,
  getInstructorReviews,
  
  // Reviews
  getCourseReviews,
  createReview,
} = apiService;

// Export types
export * from './client';
export * from './routes';
export * from '@/types/api';
