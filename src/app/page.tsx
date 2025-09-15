"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CourseCard } from "@/components/ui/CourseCard";
import { CTABox } from "@/components/ui/CTABox";
import { HeroParallax } from "@/components/ui/HeroParallax";
import { TestimonialsSection } from "@/components/ui/testimonials-columns-1";
import { 
  Brain, 
  Clock, 
  Award, 
  Users, 
  CheckCircle, 
  ArrowRight
} from "lucide-react";
import { 
  features, 
  motivationChecklist 
} from "@/data/home";
import coursesData from "@/data/courses.json";
import { Course } from "@/types/course";

const iconMap = {
  Brain,
  Clock,
  Award,
  Users
};

// Enhanced thumbnail mapping for better course visuals
const getThumbnailForCourse = (category: string, courseId: string) => {
  const thumbnailMap: { [key: string]: string[] } = {
    'Web Development': [
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center', // React
      'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center', // JavaScript
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=center', // HTML/CSS
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop&crop=center', // Code
    ],
    'Data Science': [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center', // Analytics
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop&crop=center', // Python
      'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&h=300&fit=crop&crop=center', // Data viz
    ],
    'Design': [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center', // Design
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop&crop=center', // UI/UX
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop&crop=center', // Creative
    ],
    'Programming': [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center', // Code
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop&crop=center', // Programming
      'https://images.unsplash.com/photo-1607970875337-c3fb6565de8f?w=400&h=300&fit=crop&crop=center', // Coding
    ],
    'Cloud Computing': [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center', // Cloud
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&crop=center', // Server
    ],
    'Marketing': [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center', // Marketing
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop&crop=center', // Digital
    ],
    'AI/ML': [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop&crop=center', // AI
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop&crop=center', // Tech
    ],
    'default': [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center', // Generic
    ]
  };

  const categoryImages = thumbnailMap[category] || thumbnailMap['default'];
  const courseIndex = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % categoryImages.length;
  return categoryImages[courseIndex];
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Simulate loading courses
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Parallax Section */}
      <HeroParallax courses={coursesData as Course[]} />

      {/* Value Grid Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Skillery?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to help you learn efficiently, stay motivated, 
              and achieve your career goals faster than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={Icon}
                  color={feature.color as "brand" | "accent" | "purple" | "blue" | "green" | "orange"}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {/* Motivation Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built to Keep You Going
              </h2>
              <p className="text-xl text-gray-600 mb-8">
              We understand that learning new skills can be challenging. That&apos;s why we&apos;ve 
              built features specifically designed to keep you motivated and on track.
              </p>
              
              <ul className="space-y-4">
                {motivationChecklist.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-accent-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI-Powered Progress Tracking
                </h3>
                <p className="text-gray-600 mb-6">
                  Our intelligent system adapts to your learning style and provides 
                  personalized recommendations to keep you engaged.
                </p>
                <Button 
                  className="bg-brand-500 hover:bg-brand-600 text-white"
                  onClick={() => router.push('/catalog')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/* Trending Courses */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium text-sm mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Hot & Trending
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trending Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the most popular courses that are helping learners advance their careers and stay ahead in today's competitive market.
            </p>
          </div>

          {/* Enhanced Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {(coursesData as Course[]).slice(0, 6).map((course, index) => {
              // Enhanced course data with better thumbnails
              const enhancedCourse = {
                ...course,
                thumbnail: getThumbnailForCourse(course.category, course.id)
              };

              return (
                <div
                  key={course.id}
                  className="group transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <CourseCard
                    course={enhancedCourse}
                    isLoading={isLoading}
                    className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              );
            })}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => router.push('/catalog')}
              >
                <span className="flex items-center gap-3">
                  View All Courses
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              
              <Button 
                size="xl" 
                variant="outline"
                className="px-10 py-4 text-lg font-semibold rounded-2xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => router.push('/auth/signup')}
              >
                Start Learning Free
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                500,000+ Students
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                4.8★ Average Rating
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Industry Experts
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Animated Testimonials */}
      <TestimonialsSection />


      {/* Primary CTA Banner */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <Container className="relative z-10">
          <CTABox
            title="Ready to Grow with Skillery?"
            description="Join 500,000+ learners leveling up their careers. Learn smarter. Move faster. Achieve more."
            primaryButton={{
              text: "Get Started",
              onClick: () => router.push('/auth/signup')
            }}
            variant="brand"
            className="bg-transparent border-white/20 text-white shadow-2xl"
          />
        </Container>
      </section>
    </div>
  );
}