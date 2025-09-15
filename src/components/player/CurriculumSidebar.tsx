"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePlayerStore } from "@/store/playerStore";
import { Lecture } from "@/types/player";
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CurriculumSidebarProps {
  className?: string;
}

export function CurriculumSidebar({ className }: CurriculumSidebarProps) {
  const {
    courseContent,
    currentLectureId,
    searchQuery,
    filteredSections,
    sidebarCollapsed,
    setSearchQuery,
    setCurrentLecture,
    toggleSectionExpanded,
    markLectureComplete
  } = usePlayerStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value);
    setSearchQuery(value);
  };

  const handleLectureClick = (lecture: Lecture) => {
    setCurrentLecture(lecture.id);
  };

  const handleMarkComplete = (lectureId: string, completed: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    markLectureComplete(lectureId, completed);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (lecture: Lecture) => {
    if (lecture.duration === 0) return 0;
    return Math.round((lecture.watchedDuration / lecture.duration) * 100);
  };

  if (!courseContent) {
    return (
      <div className={cn("w-80 bg-white border-r border-gray-200 p-4", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="space-y-1 ml-4">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="h-6 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-80 bg-white border-r border-gray-200 flex flex-col",
      sidebarCollapsed && "w-0 overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Course Content</h2>
          <Badge variant="secondary" className="text-xs">
            {courseContent.completedLectures}/{courseContent.totalLectures} completed
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search lectures..."
            value={localSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {filteredSections.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No lectures found</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredSections.map((section) => (
              <div key={section.id} className="mb-2">
                {/* Section Header */}
                <button
                  onClick={() => toggleSectionExpanded(section.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {section.isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="font-medium text-sm text-gray-900">
                      {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {section.completedLectures}/{section.lectures.length}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDuration(section.totalDuration)}
                    </span>
                  </div>
                </button>

                {/* Lectures */}
                {section.isExpanded && (
                  <div className="ml-4 space-y-1">
                    {section.lectures.map((lecture) => {
                      const isCurrentLecture = currentLectureId === lecture.id;
                      const progressPercentage = getProgressPercentage(lecture);
                      
                      return (
                        <div
                          key={lecture.id}
                          className={cn(
                            "group relative p-3 rounded-lg cursor-pointer transition-colors",
                            isCurrentLecture
                              ? "bg-brand-50 border border-brand-200"
                              : "hover:bg-gray-50"
                          )}
                          onClick={() => handleLectureClick(lecture)}
                        >
                          <div className="flex items-start gap-3">
                            {/* Play/Preview Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                              {lecture.isPreview ? (
                                <Eye className="h-4 w-4 text-blue-500" />
                              ) : lecture.isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Play className="h-4 w-4 text-gray-400" />
                              )}
                            </div>

                            {/* Lecture Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className={cn(
                                  "text-sm font-medium line-clamp-2",
                                  isCurrentLecture ? "text-brand-900" : "text-gray-900"
                                )}>
                                  {lecture.title}
                                </h4>
                                
                                {/* Mark Complete Button */}
                                {!lecture.isPreview && (
                                  <button
                                    onClick={(e) => handleMarkComplete(lecture.id, !lecture.isCompleted, e)}
                                    className={cn(
                                      "opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded",
                                      lecture.isCompleted
                                        ? "text-green-600 hover:bg-green-100"
                                        : "text-gray-400 hover:bg-gray-100"
                                    )}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </button>
                                )}
                              </div>

                              {/* Lecture Meta */}
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatDuration(lecture.duration)}</span>
                                </div>
                                
                                {lecture.isPreview && (
                                  <Badge variant="outline" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                
                                {lecture.isCompleted && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                    Completed
                                  </Badge>
                                )}
                              </div>

                              {/* Progress Bar */}
                              {!lecture.isPreview && lecture.watchedDuration > 0 && (
                                <div className="mt-2">
                                  <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div
                                      className="bg-brand-600 h-1 rounded-full transition-all"
                                      style={{ width: `${progressPercentage}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{progressPercentage}% watched</span>
                                    <span>{formatDuration(lecture.watchedDuration)} / {formatDuration(lecture.duration)}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          {courseContent.progress}% Complete
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <div
            className="bg-brand-600 h-1 rounded-full transition-all"
            style={{ width: `${courseContent.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
