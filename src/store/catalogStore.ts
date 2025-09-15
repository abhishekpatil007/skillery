import { create } from 'zustand';
import { Course } from '@/types/course';

export type SortOption = 
  | 'best-match' 
  | 'highest-rated' 
  | 'newest' 
  | 'price-low-high' 
  | 'price-high-low';

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  // Search
  searchQuery: string;
  
  // Filters
  categories: string[];
  levels: string[];
  price: string[];
  rating: number | null;
  duration: string[];
  language: string[];
  features: string[];
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // UI
  sortBy: SortOption;
  viewMode: ViewMode;
  
  // Results
  allCourses: Course[];
  filteredCourses: Course[];
  totalResults: number;
  isLoading: boolean;
}

export interface CatalogActions {
  // Search
  setSearchQuery: (query: string) => void;
  
  // Filters
  toggleCategory: (category: string) => void;
  toggleLevel: (level: string) => void;
  togglePrice: (price: string) => void;
  setRating: (rating: number | null) => void;
  toggleDuration: (duration: string) => void;
  toggleLanguage: (language: string) => void;
  toggleFeature: (feature: string) => void;
  clearAllFilters: () => void;
  
  // Pagination
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  
  // UI
  setSortBy: (sort: SortOption) => void;
  setViewMode: (mode: ViewMode) => void;
  
  // Data
  setCourses: (courses: Course[]) => void;
  filterCourses: () => void;
  resetPagination: () => void;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  categories: [],
  levels: [],
  price: [],
  rating: null,
  duration: [],
  language: [],
  features: [],
  currentPage: 1,
  itemsPerPage: 24,
  sortBy: 'best-match',
  viewMode: 'grid',
  allCourses: [],
  filteredCourses: [],
  totalResults: 0,
  isLoading: false,
};

export const useCatalogStore = create<FilterState & CatalogActions>((set, get) => ({
  ...initialFilterState,

  // Search
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().resetPagination();
    get().filterCourses();
  },

  // Filters
  toggleCategory: (category: string) => {
    const { categories } = get();
    const newCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    set({ categories: newCategories });
    get().resetPagination();
    get().filterCourses();
  },

  toggleLevel: (level: string) => {
    const { levels } = get();
    const newLevels = levels.includes(level)
      ? levels.filter(l => l !== level)
      : [...levels, level];
    set({ levels: newLevels });
    get().resetPagination();
    get().filterCourses();
  },

  togglePrice: (price: string) => {
    const { price: currentPrice } = get();
    const newPrice = currentPrice.includes(price)
      ? currentPrice.filter(p => p !== price)
      : [...currentPrice, price];
    set({ price: newPrice });
    get().resetPagination();
    get().filterCourses();
  },

  setRating: (rating: number | null) => {
    set({ rating });
    get().resetPagination();
    get().filterCourses();
  },

  toggleDuration: (duration: string) => {
    const { duration: currentDuration } = get();
    const newDuration = currentDuration.includes(duration)
      ? currentDuration.filter(d => d !== duration)
      : [...currentDuration, duration];
    set({ duration: newDuration });
    get().resetPagination();
    get().filterCourses();
  },

  toggleLanguage: (language: string) => {
    const { language: currentLanguage } = get();
    const newLanguage = currentLanguage.includes(language)
      ? currentLanguage.filter(l => l !== language)
      : [...currentLanguage, language];
    set({ language: newLanguage });
    get().resetPagination();
    get().filterCourses();
  },

  toggleFeature: (feature: string) => {
    const { features } = get();
    const newFeatures = features.includes(feature)
      ? features.filter(f => f !== feature)
      : [...features, feature];
    set({ features: newFeatures });
    get().resetPagination();
    get().filterCourses();
  },

  clearAllFilters: () => {
    set({
      searchQuery: '',
      categories: [],
      levels: [],
      price: [],
      rating: null,
      duration: [],
      language: [],
      features: [],
    });
    get().resetPagination();
    get().filterCourses();
  },

  // Pagination
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  setItemsPerPage: (items: number) => {
    set({ itemsPerPage: items, currentPage: 1 });
    get().filterCourses();
  },

  // UI
  setSortBy: (sort: SortOption) => {
    set({ sortBy: sort });
    get().filterCourses();
  },

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
  },

  // Data
  setCourses: (courses: Course[]) => {
    set({ 
      allCourses: courses,
      filteredCourses: courses, 
      totalResults: courses.length,
      isLoading: false 
    });
  },

  filterCourses: () => {
    const state = get();
    set({ isLoading: true });

    // Simulate API delay
    setTimeout(() => {
      // Use allCourses as the source for filtering
      let filtered = [...state.allCourses];

      // Apply search filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(course =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
        );
      }

      // Apply category filter
      if (state.categories.length > 0) {
        filtered = filtered.filter(course =>
          state.categories.includes(course.category)
        );
      }

      // Apply level filter
      if (state.levels.length > 0) {
        filtered = filtered.filter(course =>
          state.levels.includes(course.level)
        );
      }

      // Apply price filter
      if (state.price.length > 0) {
        filtered = filtered.filter(course => {
          if (state.price.includes('free') && course.isFree) return true;
          if (state.price.includes('paid') && !course.isFree) return true;
          return false;
        });
      }

      // Apply rating filter
      if (state.rating !== null) {
        filtered = filtered.filter(course => course.rating >= state.rating!);
      }

      // Apply duration filter
      if (state.duration.length > 0) {
        filtered = filtered.filter(course => {
          const hours = course.hours;
          return state.duration.some(duration => {
            switch (duration) {
              case '0-5': return hours <= 5;
              case '6-10': return hours >= 6 && hours <= 10;
              case '11-20': return hours >= 11 && hours <= 20;
              case '21-40': return hours >= 21 && hours <= 40;
              case '40+': return hours > 40;
              default: return true;
            }
          });
        });
      }

      // Apply language filter
      if (state.language.length > 0) {
        filtered = filtered.filter(course =>
          state.language.includes(course.language)
        );
      }

      // Apply features filter
      if (state.features.length > 0) {
        filtered = filtered.filter(course => {
          return state.features.every(feature => {
            switch (feature) {
              case 'certificate': return course.hasCertificate;
              case 'quizzes': return course.hasQuizzes;
              case 'subtitles': return course.hasSubtitles;
              default: return true;
            }
          });
        });
      }

      // Apply sorting
      switch (state.sortBy) {
        case 'highest-rated':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Assuming newer courses have higher IDs (simplified)
          filtered.sort((a, b) => b.id.localeCompare(a.id));
          break;
        case 'price-low-high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'best-match':
        default:
          // Keep original order for best match
          break;
      }

      set({
        filteredCourses: filtered,
        totalResults: filtered.length,
        isLoading: false,
      });
    }, 300);
  },

  resetPagination: () => {
    set({ currentPage: 1 });
  },
}));
