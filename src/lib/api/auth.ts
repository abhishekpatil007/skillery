import { AuthResponse, LoginFormData, SignupFormData } from '@/types/auth';

// Mock API functions - in a real app, these would make actual HTTP requests

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (data.email === 'test@example.com' && data.password === 'password123') {
      return {
        success: true,
        user: {
          id: '1',
          email: data.email,
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isVerified: true,
          createdAt: '2024-01-01T00:00:00Z',
          lastLoginAt: new Date().toISOString(),
        },
        message: 'Login successful',
      };
    }
    
    return {
      success: false,
      message: 'Invalid email or password',
      errors: {
        email: ['Invalid email or password'],
      },
    };
  },

  signup: async (data: SignupFormData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (data.email === 'existing@example.com') {
      return {
        success: false,
        message: 'Email already exists',
        errors: {
          email: ['An account with this email already exists'],
        },
      };
    }
    
    return {
      success: true,
      user: {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isVerified: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      },
      message: 'Account created successfully',
    };
  },

  forgotPassword: async (_email: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      message: 'Password reset email sent',
    };
  },

  oauthLogin: async (provider: 'google' | 'apple'): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      user: {
        id: '1',
        email: `user@${provider}.com`,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isVerified: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastLoginAt: new Date().toISOString(),
      },
      message: `${provider} login successful`,
    };
  },
};
