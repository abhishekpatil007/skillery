"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePlayerStore } from "@/store/playerStore";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  className?: string;
}

export function BottomNavigation({ className }: BottomNavigationProps) {
  const {
    courseContent,
    currentLectureId,
    setCurrentLecture,
    markLectureComplete
  } = usePlayerStore();

  if (!courseContent) return null;

  // Get all lectures in order
  const allLectures = courseContent.sections.flatMap(section => section.lectures);
  const currentIndex = allLectures.findIndex(lecture => lecture.id === currentLectureId);
  const currentLecture = allLectures[currentIndex];
  
  const previousLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
  const nextLecture = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null;

  const handlePrevious = () => {
    if (previousLecture) {
      setCurrentLecture(previousLecture.id);
    }
  };

  const handleNext = () => {
    if (nextLecture) {
      setCurrentLecture(nextLecture.id);
    }
  };

  const handleMarkComplete = () => {
    if (currentLecture && !currentLecture.isPreview) {
      markLectureComplete(currentLecture.id, !currentLecture.isCompleted);
    }
  };

  const getProgressPercentage = () => {
    if (!currentLecture) return 0;
    return Math.round((currentLecture.watchedDuration / currentLecture.duration) * 100);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "bg-white border-t border-gray-200 p-4",
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!previousLecture}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <div className="text-left">
            <div className="text-xs text-gray-500">Previous</div>
            <div className="text-sm font-medium">
              {previousLecture ? previousLecture.title : "No previous lecture"}
            </div>
          </div>
        </Button>

        {/* Center Content */}
        <div className="flex-1 mx-6">
          {currentLecture && (
            <div className="space-y-3">
              {/* Lecture Info */}
              <div className="text-center">
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                  {currentLecture.title}
                </h3>
                <div className="flex items-center justify-center gap-4 mt-1 text-xs text-gray-500">
                  <span>{formatTime(currentLecture.duration)}</span>
                  <span>•</span>
                  <span>{getProgressPercentage()}% watched</span>
                  {currentLecture.isPreview && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600">Preview</span>
                    </>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <Progress 
                  value={getProgressPercentage()} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(currentLecture.watchedDuration)}</span>
                  <span>{formatTime(currentLecture.duration)}</span>
                </div>
              </div>

              {/* Mark Complete Button */}
              {!currentLecture.isPreview && (
                <div className="flex justify-center">
                  <Button
                    variant={currentLecture.isCompleted ? "default" : "outline"}
                    size="sm"
                    onClick={handleMarkComplete}
                    className={cn(
                      "flex items-center gap-2",
                      currentLecture.isCompleted && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {currentLecture.isCompleted ? "Completed" : "Mark as Complete"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={!nextLecture}
          className="flex items-center gap-2"
        >
          <div className="text-right">
            <div className="text-xs text-gray-500">Next</div>
            <div className="text-sm font-medium">
              {nextLecture ? nextLecture.title : "No next lecture"}
            </div>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Course Progress */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Course Progress</span>
          <span className="font-medium">
            {courseContent.completedLectures} of {courseContent.totalLectures} lectures completed
          </span>
        </div>
        <Progress 
          value={courseContent.progress} 
          className="h-2 mt-2"
        />
      </div>
    </div>
  );
}
