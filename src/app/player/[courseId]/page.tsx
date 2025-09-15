"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CurriculumSidebar } from "@/components/player/CurriculumSidebar";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { RightSidebar } from "@/components/player/RightSidebar";
import { BottomNavigation } from "@/components/player/BottomNavigation";
import { usePlayerStore } from "@/store/playerStore";
import { CourseContent } from "@/types/player";
import { 
  Menu, 
  X, 
  ChevronLeft,
  Maximize2,
  Minimize2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock course content - in real app, this would be fetched from API
import courseContentData from "@/data/courses/web-development-complete-guide-content.json";

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lectureId = searchParams.get('l');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const {
    courseContent,
    currentLectureId,
    sidebarCollapsed,
    setCourseContent,
    setCurrentLecture,
    toggleSidebar
  } = usePlayerStore();

  // Load course content
  useEffect(() => {
    const loadCourseContent = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourseContent(courseContentData as CourseContent);
      setIsLoading(false);
    };

    loadCourseContent();
  }, [setCourseContent]);

  // Set current lecture from URL
  useEffect(() => {
    if (courseContent && lectureId) {
      const lecture = courseContent.sections
        .flatMap(section => section.lectures)
        .find(lecture => lecture.id === lectureId);
      
      if (lecture) {
        setCurrentLecture(lectureId);
      }
    } else if (courseContent && !lectureId) {
      // Set first lecture as default
      const firstLecture = courseContent.sections[0]?.lectures[0];
      if (firstLecture) {
        setCurrentLecture(firstLecture.id);
        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set('l', firstLecture.id);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [courseContent, lectureId, setCurrentLecture, router]);

  // Update URL when lecture changes
  useEffect(() => {
    if (currentLectureId && courseContent) {
      const url = new URL(window.location.href);
      url.searchParams.set('l', currentLectureId);
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [currentLectureId, courseContent, router]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleBackToCourse = () => {
    router.push(`/course/${params.courseId}`);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!courseContent) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg mb-4">Course not found</p>
          <Button onClick={() => router.push('/catalog')}>
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-screen bg-black flex flex-col",
      isFullscreen && "fixed inset-0 z-50"
    )}>
      {/* Top Bar */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToCourse}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          
          <div className="text-white">
            <h1 className="font-semibold text-sm line-clamp-1">
              {courseContent.title}
            </h1>
            <p className="text-xs text-gray-300">
              by {courseContent.instructor}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-white hover:bg-white/10"
          >
            {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen();
              }
            }}
            className="text-white hover:bg-white/10"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Curriculum */}
        {!sidebarCollapsed && (
          <CurriculumSidebar />
        )}

        {/* Center - Video Player */}
        <div className="flex-1 flex flex-col">
          <VideoPlayer className="flex-1" />
          
          {/* Bottom Navigation */}
          <BottomNavigation />
        </div>

        {/* Right Sidebar - Tabs */}
        <RightSidebar />
      </div>
    </div>
  );
}
