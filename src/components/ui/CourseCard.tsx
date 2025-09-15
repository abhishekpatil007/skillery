import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
  isLoading?: boolean;
  className?: string;
  variant?: 'grid' | 'list';
}

export function CourseCard({ 
  course, 
  isLoading = false, 
  className, 
  variant = 'grid' 
}: CourseCardProps) {
  const router = useRouter();

  const handleCourseClick = () => {
    router.push(`/course/${course.slug}`);
  };

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/course/${course.slug}`);
  };
  if (isLoading) {
    if (variant === 'list') {
      return (
        <div className={cn("bg-white rounded-2xl border border-gray-200 p-6", className)}>
          <div className="flex space-x-4">
            <Skeleton className="h-32 w-48 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className={cn("bg-white rounded-2xl border border-gray-200 overflow-hidden", className)}>
        <Skeleton className="h-48 w-full" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2 w-16" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }


  if (variant === 'list') {
    return (
      <div 
        className={cn("bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer", className)}
        onClick={handleCourseClick}
      >
        <div className="flex space-x-4">
          {/* Thumbnail */}
          <div className="relative h-32 w-48 rounded-xl overflow-hidden flex-shrink-0">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                  <Play className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge className="text-xs font-medium text-gray-500 bg-transparent px-0">
                {course.category.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-lg mb-2">
              {course.title}
            </h3>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-600">{course.rating}</span>
              <span className="text-sm text-gray-600">({course.ratingCount.toLocaleString()}+ reviews)</span>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="flex items-center justify-between">
              {/* Instructor */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{course.instructor?.name || course.instructor}</div>
                  <div className="text-xs text-gray-500">Instructor</div>
                </div>
              </div>

              {/* Enroll Button */}
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-4 py-2"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default) - Matching Dribbble reference exactly
  return (
    <div 
      className={cn("bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer", className)}
      onClick={handleCourseClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <Play className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        )}
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <Badge className="text-xs font-medium text-gray-500 bg-transparent px-0">
            {course.category.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors text-lg">
          {course.title}
        </h3>
        
        {/* Rating and Reviews */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-600">{course.rating}</span>
          <span className="text-sm text-gray-600">({course.ratingCount.toLocaleString()}+ reviews)</span>
        </div>

        {/* Course Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor and Enroll Button */}
        <div className="flex items-center justify-between">
          {/* Instructor */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">{course.instructor?.name || course.instructor}</div>
              <div className="text-xs text-gray-500">Instructor</div>
            </div>
          </div>

          {/* Enroll Button */}
          <Button 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-4 py-2"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}