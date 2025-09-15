"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User, Play, Award, Users, Zap, Sparkles, BookOpen } from "lucide-react";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";

export const HeroParallax = ({
  courses,
}: {
  courses: Course[];
}) => {
  const router = useRouter();
  const firstRow = courses.slice(0, 5);
  const secondRow = courses.slice(5, 10);
  const thirdRow = courses.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  
  return (
    <div
      ref={ref}
      className="h-[300vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20"
      style={{ position: 'relative' }}
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((course) => (
            <CourseCard
              course={course}
              translate={translateX}
              key={course.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((course) => (
            <CourseCard
              course={course}
              translate={translateXReverse}
              key={course.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((course) => (
            <CourseCard
              course={course}
              translate={translateX}
              key={course.id}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <div className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100/80 to-blue-200/80 border border-blue-300/50 text-blue-800 mb-12 shadow-lg backdrop-blur-sm">
          <Zap className="h-5 w-5 mr-3 text-blue-600" />
          <span className="text-sm font-semibold">New: AI-Powered Learning Paths</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mb-10 tracking-tight">
          Master Skills That{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
            Move You Forward
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-4xl text-lg md:text-xl lg:text-2xl text-gray-600 mx-auto mb-16 leading-relaxed font-light">
          Join over 500,000 learners mastering in-demand skills with our AI-powered platform. 
          Learn from industry experts, build real projects, and advance your career.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <Button
            size="xl"
            variant="gradient"
            className="px-12 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Start Learning Free
            </span>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="px-12 py-4 text-lg font-bold rounded-2xl border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-800 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Browse Courses
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">2,500+</div>
            <div className="text-gray-600 text-sm md:text-base font-medium">Expert-Led Courses</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">500K+</div>
            <div className="text-gray-600 text-sm md:text-base font-medium">Active Learners</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">95%</div>
            <div className="text-gray-600 text-sm md:text-base font-medium">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseCard = ({
  course,
  translate,
}: {
  course: Course;
  translate: MotionValue<number>;
}) => {
  const router = useRouter();

  const handleCourseClick = () => {
    router.push(`/course/${course.slug}`);
  };

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/course/${course.slug}`);
  };
  // Generate course-specific images based on category
  const getCourseImage = (category: string, index: number) => {
    const imageMap: { [key: string]: string[] } = {
      "Web Development": [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center"
      ],
      "Data Science": [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
      ],
      "Design": [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center"
      ],
      "AI/ML": [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center"
      ],
      "Mobile Development": [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center"
      ]
    };
    
    const images = imageMap[category] || imageMap["Web Development"];
    return images[index % images.length];
  };

  const levelColorClasses = {
    Beginner: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Intermediate: "bg-amber-100 text-amber-800 border-amber-200",
    Advanced: "bg-red-100 text-red-800 border-red-200"
  };

  const categoryColorClasses = {
    "Web Development": "bg-blue-100 text-blue-800 border-blue-200",
    "Data Science": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Design": "bg-purple-100 text-purple-800 border-purple-200",
    "Cloud Computing": "bg-orange-100 text-orange-800 border-orange-200",
    "Programming": "bg-pink-100 text-pink-800 border-pink-200",
    "AI/ML": "bg-indigo-100 text-indigo-800 border-indigo-200",
    "Marketing": "bg-cyan-100 text-cyan-800 border-cyan-200",
    "Cybersecurity": "bg-red-100 text-red-800 border-red-200",
    "Mobile Development": "bg-teal-100 text-teal-800 border-teal-200",
    "Business": "bg-gray-100 text-gray-800 border-gray-200",
    "Blockchain": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "DevOps": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Finance": "bg-amber-100 text-amber-800 border-amber-200",
    "CRM": "bg-violet-100 text-violet-800 border-violet-200",
    "Software Architecture": "bg-rose-100 text-rose-800 border-rose-200"
  };

  // Use course ID to generate a deterministic index for consistent SSR/client rendering
  const courseIndex = course.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5;

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        scale: 1.02,
      }}
      key={course.id}
      className="group/course h-96 w-[30rem] relative shrink-0 cursor-pointer"
      onClick={handleCourseClick}
    >
      <div className="block group-hover/course:shadow-2xl bg-white rounded-xl overflow-hidden h-full w-full relative transition-all duration-300">
        {/* Course Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={getCourseImage(course.category, courseIndex)}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/course:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/course:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
              <Play className="h-8 w-8 text-gray-800 ml-1" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4">
            <Badge className={cn("text-xs font-semibold border", categoryColorClasses[course.category as keyof typeof categoryColorClasses] || "bg-gray-100 text-gray-800 border-gray-200")}>
              {course.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className={cn("text-xs font-semibold border", levelColorClasses[course.level as keyof typeof levelColorClasses])}>
              {course.level}
            </Badge>
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-800 text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-5 h-48 flex flex-col justify-between bg-white/90 backdrop-blur-sm">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover/course:text-blue-600 transition-colors text-base leading-tight">
              {course.title}
            </h3>
            
            <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <User className="h-3.5 w-3.5" />
                <span className="truncate font-medium">{course.instructor?.name || course.instructor}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-medium">{course.hours}h</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {course.isFree ? (
                <span className="text-lg font-bold text-emerald-600">Free</span>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">${course.price?.sale || course.price}</span>
                  {course.price?.list && course.price.list > (course.price?.sale || course.price) && (
                    <span className="text-xs text-gray-500 line-through">${course.price.list}</span>
                  )}
                </div>
              )}
            </div>
            <Button 
              size="sm" 
              variant="gradient"
              className="font-bold rounded-xl px-6 py-2 text-xs shadow-lg hover:shadow-blue-500/40 transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
              onClick={handleEnrollClick}
            >
              <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-1">
                <Play className="h-3 w-3" />
                Enroll Now
              </span>
            </Button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/course:opacity-100 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent pointer-events-none rounded-2xl transition-opacity duration-300"></div>
        
        {/* Hover Content */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover/course:opacity-100 text-white transition-opacity duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Certificate</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-blue-300" />
              <span className="text-sm">{course.lectures} lectures</span>
            </div>
          </div>
          <p className="text-sm text-white/90 line-clamp-2">{course.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function for conditional classes
function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
