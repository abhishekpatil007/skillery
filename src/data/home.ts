export interface HeroStats {
  courses: string;
  students: string;
  instructors: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  tag: string;
  tagColor: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export const heroStats: HeroStats = {
  courses: "2,500+",
  students: "500K+",
  instructors: "1,200+"
};

export const features: Feature[] = [
  {
    id: "learn-smarter",
    title: "Learn Smarter",
    description: "AI-powered learning paths adapt to your pace and goals, ensuring you master skills efficiently.",
    icon: "Brain",
    color: "brand"
  },
  {
    id: "built-for-schedule",
    title: "Built for Your Schedule",
    description: "Learn anytime, anywhere with mobile-optimized content and offline access to keep you on track.",
    icon: "Clock",
    color: "accent"
  },
  {
    id: "learn-from-best",
    title: "Learn from the Best",
    description: "Industry experts and top instructors share real-world insights and practical knowledge.",
    icon: "Award",
    color: "purple"
  },
  {
    id: "community-powered",
    title: "Community-Powered",
    description: "Connect with fellow learners, share projects, and get feedback from a supportive community.",
    icon: "Users",
    color: "blue"
  }
];

export const courses: Course[] = [
  {
    id: "react-complete",
    title: "Complete React Developer Course",
    instructor: "Sarah Johnson",
    rating: 4.8,
    reviewCount: 1247,
    price: 89,
    originalPrice: 199,
    isFree: false,
    tag: "Web Development",
    tagColor: "blue",
    thumbnail: "/api/placeholder/300/200",
    duration: "32 hours",
    level: "Intermediate"
  },
  {
    id: "python-data-science",
    title: "Python for Data Science",
    instructor: "Dr. Michael Chen",
    rating: 4.9,
    reviewCount: 892,
    price: 0,
    isFree: true,
    tag: "Data Science",
    tagColor: "green",
    thumbnail: "/api/placeholder/300/200",
    duration: "28 hours",
    level: "Beginner"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Rodriguez",
    rating: 4.7,
    reviewCount: 654,
    price: 79,
    originalPrice: 149,
    isFree: false,
    tag: "Design",
    tagColor: "purple",
    thumbnail: "/api/placeholder/300/200",
    duration: "24 hours",
    level: "Beginner"
  },
  {
    id: "aws-certification",
    title: "AWS Solutions Architect",
    instructor: "James Wilson",
    rating: 4.9,
    reviewCount: 1123,
    price: 149,
    originalPrice: 299,
    isFree: false,
    tag: "Cloud Computing",
    tagColor: "orange",
    thumbnail: "/api/placeholder/300/200",
    duration: "45 hours",
    level: "Advanced"
  },
  {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    instructor: "Alex Thompson",
    rating: 4.6,
    reviewCount: 2156,
    price: 0,
    isFree: true,
    tag: "Programming",
    tagColor: "yellow",
    thumbnail: "/api/placeholder/300/200",
    duration: "18 hours",
    level: "Beginner"
  },
  {
    id: "machine-learning",
    title: "Machine Learning with Python",
    instructor: "Dr. Lisa Park",
    rating: 4.8,
    reviewCount: 743,
    price: 129,
    originalPrice: 249,
    isFree: false,
    tag: "AI/ML",
    tagColor: "pink",
    thumbnail: "/api/placeholder/300/200",
    duration: "38 hours",
    level: "Intermediate"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Maria Garcia",
    role: "Software Engineer",
    company: "Google",
    content: "Skillery transformed my career. The structured learning paths and expert instructors helped me land my dream job at Google within 6 months.",
    avatar: "/api/placeholder/60/60",
    rating: 5
  },
  {
    id: "testimonial-2",
    name: "David Kim",
    role: "Product Manager",
    company: "Microsoft",
    content: "The community aspect is incredible. I've made valuable connections and learned from peers who are now colleagues in the industry.",
    avatar: "/api/placeholder/60/60",
    rating: 5
  },
  {
    id: "testimonial-3",
    name: "Sarah Johnson",
    role: "UX Designer",
    company: "Figma",
    content: "The courses are practical and up-to-date. I was able to apply what I learned immediately in my design projects.",
    avatar: "/api/placeholder/60/60",
    rating: 5
  },
  {
    id: "testimonial-4",
    name: "Ahmed Hassan",
    role: "Data Scientist",
    company: "Netflix",
    content: "The AI-powered learning recommendations were spot-on. I progressed much faster than I thought possible.",
    avatar: "/api/placeholder/60/60",
    rating: 5
  },
  {
    id: "testimonial-5",
    name: "Jennifer Lee",
    role: "DevOps Engineer",
    company: "Amazon",
    content: "The hands-on projects and real-world scenarios made all the difference. I felt confident applying for senior positions.",
    avatar: "/api/placeholder/60/60",
    rating: 5
  }
];

export const motivationChecklist = [
  "Personalized learning paths that adapt to your progress",
  "Gamified achievements and milestones to keep you motivated",
  "Regular check-ins and progress tracking",
  "Flexible scheduling that fits your lifestyle",
  "Expert support and mentorship available 24/7",
  "Real-world projects to build your portfolio"
];
