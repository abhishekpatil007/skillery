export interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

export interface CoursePrice {
  list: number;
  sale: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  instructor: string | Instructor;
  rating: number;
  ratingCount: number;
  price: number | CoursePrice;
  discountPrice?: number;
  isFree: boolean;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  hours: number;
  lectures: number;
  language: string;
  hasSubtitles: boolean;
  hasCertificate: boolean;
  hasQuizzes: boolean;
  thumbnail: string;
  description: string;
  bestSeller?: boolean;
}
