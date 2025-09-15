import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Enrollment } from "@/types/enrollment";
import { 
  Play, 
  Clock, 
  Award,
  BookOpen,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressCourseCardProps {
  enrollment: Enrollment;
  variant?: 'default' | 'compact' | 'continue-watching';
  onClick?: () => void;
  className?: string;
}

export function ProgressCourseCard({ 
  enrollment, 
  variant = 'default',
  onClick,
  className 
}: ProgressCourseCardProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (variant === 'compact') {
    return (
      <div 
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <img
          src={enrollment.thumbnail}
          alt={enrollment.courseTitle}
          className="w-16 h-12 rounded object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 truncate">
            {enrollment.courseTitle}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-brand-600 h-1.5 rounded-full transition-all"
                style={{ width: `${enrollment.progress.completionPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {enrollment.progress.completionPercentage}%
            </span>
          </div>
        </div>
        <Play className="h-4 w-4 text-gray-400" />
      </div>
    );
  }

  if (variant === 'continue-watching') {
    return (
      <div 
        className={cn(
          "flex-shrink-0 w-80 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group",
          className
        )}
        onClick={onClick}
      >
        <div className="relative">
          <img
            src={enrollment.thumbnail}
            alt={enrollment.courseTitle}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-white h-1 rounded-full transition-all"
                style={{ width: `${enrollment.progress.completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
              {enrollment.courseTitle}
            </h3>
            <Badge 
              variant="secondary" 
              className={cn("text-xs", getStatusColor(enrollment.status))}
            >
              {enrollment.status.replace('_', ' ')}
            </Badge>
          </div>
          
          <p className="text-xs text-gray-600 mb-3">
            by {enrollment.instructor}
          </p>
          
          {enrollment.currentLecture && (
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs font-medium text-gray-900 mb-1">
                Continue with:
              </p>
              <p className="text-xs text-gray-600 truncate">
                {enrollment.currentLecture.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {enrollment.currentLecture.watchedDuration}m / {enrollment.currentLecture.duration}m
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {enrollment.progress.completionPercentage}% complete
            </span>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {enrollment.progress.completedLectures}/{enrollment.progress.totalLectures}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={enrollment.thumbnail}
          alt={enrollment.courseTitle}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
          <Play className="h-10 w-10 text-white" />
        </div>
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className={cn("text-xs", getStatusColor(enrollment.status))}
          >
            {enrollment.status.replace('_', ' ')}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-brand-600 h-2 rounded-full transition-all"
              style={{ width: `${enrollment.progress.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {enrollment.courseTitle}
          </h3>
          <Badge 
            variant="outline" 
            className={cn("text-xs ml-2", getLevelColor(enrollment.level))}
          >
            {enrollment.level}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          by {enrollment.instructor}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{enrollment.progress.completionPercentage}%</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Lectures</span>
            <span className="font-medium">
              {enrollment.progress.completedLectures}/{enrollment.progress.totalLectures}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Time spent</span>
            <span className="font-medium">{formatTime(enrollment.progress.timeSpent)}</span>
          </div>
        </div>
        
        {enrollment.currentLecture && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Continue with:
            </p>
            <p className="text-sm text-gray-600 truncate">
              {enrollment.currentLecture.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {enrollment.currentLecture.watchedDuration}m / {enrollment.currentLecture.duration}m
              </span>
            </div>
          </div>
        )}
        
        {enrollment.certificate && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Award className="h-4 w-4" />
            <span>Certificate earned</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Last accessed {new Date(enrollment.lastAccessedAt).toLocaleDateString()}</span>
          </div>
          <Button size="sm" className="text-xs">
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
}
