"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseDetail } from "@/types/course-detail";
import { 
  Play, 
  Clock, 
  FileText, 
  HelpCircle, 
  CheckCircle,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CurriculumAccordionProps {
  curriculum: CourseDetail['curriculum'];
  onPreview?: (lectureId: string) => void;
  className?: string;
}

export function CurriculumAccordion({ curriculum, onPreview, className }: CurriculumAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play;
      case 'article':
        return FileText;
      case 'quiz':
        return HelpCircle;
      case 'assignment':
        return CheckCircle;
      default:
        return Play;
    }
  };

  const getLectureIconColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-blue-600';
      case 'article':
        return 'text-green-600';
      case 'quiz':
        return 'text-purple-600';
      case 'assignment':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  // Handle both array format and object format with sections property
  const sections = Array.isArray(curriculum) ? curriculum : (curriculum?.sections || []);
  const totalLectures = sections.reduce((acc, section) => acc + (section.lectures?.length || 0), 0);
  const totalDuration = sections.reduce((acc, section) => {
    const sectionDuration = section.duration || section.totalDuration || 
      (section.lectures?.reduce((lectureAcc, lecture) => lectureAcc + (lecture.duration || 0), 0) || 0);
    return acc + sectionDuration;
  }, 0);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Curriculum Header */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Curriculum</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{curriculum.length} sections</span>
          <span>•</span>
          <span>{totalLectures} lectures</span>
          <span>•</span>
          <span>{formatDuration(totalDuration)} total length</span>
        </div>
      </div>

      {/* Curriculum Accordion */}
      <Accordion 
        type="multiple" 
        value={expandedSections}
        onValueChange={setExpandedSections}
        className="space-y-2"
      >
        {sections.map((section, sectionIndex) => {
          const sectionId = `section-${sectionIndex}`;
          
          return (
            <AccordionItem 
              key={section.id} 
              value={sectionId}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">
                      {section.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>{section.lectures?.length || 0} lectures</span>
                      <span>•</span>
                      <span>{formatDuration(section.duration || section.totalDuration || (section.lectures?.reduce((acc, lecture) => acc + (lecture.duration || 0), 0) || 0))}</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-0">
                <div className="border-t bg-gray-50">
                  {(section.lectures || []).map((lecture, lectureIndex) => {
                    const LectureIcon = getLectureIcon(lecture.type);
                    const iconColor = getLectureIconColor(lecture.type);
                    
                    return (
                      <div 
                        key={lecture.id}
                        className={cn(
                          "flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-white transition-colors",
                          lecture.isPreview && "bg-blue-50"
                        )}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <LectureIcon className={cn("h-4 w-4", iconColor)} />
                            <span className="text-sm text-gray-600">
                              {lectureIndex + 1}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 mb-1">
                              {lecture.title}
                            </h5>
                            {lecture.description && (
                              <p className="text-sm text-gray-600">
                                {lecture.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {formatDuration(lecture.duration)}
                            </span>
                          </div>
                          
                          {lecture.isPreview ? (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Preview
                            </Badge>
                          ) : (
                            <Lock className="h-4 w-4 text-gray-400" />
                          )}
                          
                          {lecture.isPreview && onPreview && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onPreview(lecture.id)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
