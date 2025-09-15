export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  instructor: {
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
  };
  rating: {
    average: number;
    count: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  studentsCount: number;
  lastUpdated: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  subcategory: string;
  tags: string[];
  badges: ('Bestseller' | 'New' | 'Hot & New' | 'Highest Rated')[];
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  includes: {
    hours: number;
    articles: number;
    downloadableResources: number;
    access: 'Lifetime' | 'Limited';
    certificate: boolean;
  };
  whatYoullLearn: string[];
  requirements: string[];
  curriculum: {
    id: string;
    title: string;
    duration: number;
    lectures: {
      id: string;
      title: string;
      duration: number;
      type: 'video' | 'article' | 'quiz' | 'assignment';
      isPreview: boolean;
      description?: string;
    }[];
  }[];
  reviews: {
    id: string;
    author: {
      name: string;
      image: string;
      verified: boolean;
    };
    rating: number;
    title: string;
    content: string;
    helpful: number;
    date: string;
    verified: boolean;
  }[];
  frequentlyBoughtTogether: {
    id: string;
    title: string;
    price: number;
    image: string;
    discount?: number;
  }[];
  thumbnail: string;
  previewVideo?: string;
  previewVideoPoster?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  instructor: string;
  slug: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}
