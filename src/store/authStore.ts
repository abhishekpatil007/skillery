import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types/auth';
import { apiService, handleApiError } from '@/lib/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true });
        
        try {
          const response = await apiService.login({ email, password, rememberMe });
          
          // Store auth token
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.tokens.accessToken);
          }

          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: unknown) {
          set({ isLoading: false });
          throw new Error(handleApiError(error as { code: string; message: string; statusCode: number }));
        }
      },

      signup: async (email: string, password: string, firstName: string, lastName: string) => {
        set({ isLoading: true });
        
        try {
          const response = await apiService.signup({ email, password, firstName, lastName });
          
          // Store auth token
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.tokens.accessToken);
          }

          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: unknown) {
          set({ isLoading: false });
          throw new Error(handleApiError(error as { code: string; message: string; statusCode: number }));
        }
      },

      logout: async () => {
        try {
          await apiService.logout();
        } catch (error) {
          // Ignore logout errors
          console.warn('Logout API call failed:', error);
        } finally {
          // Clear auth token
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
          }
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
