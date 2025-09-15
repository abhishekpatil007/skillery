"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseSection, CourseLecture, LECTURE_TYPES } from "@/types/course-wizard";
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DnDListProps {
  sections: CourseSection[];
  onReorderSections: (sections: CourseSection[]) => void;
  onMoveLecture: (lectureId: string, fromSectionId: string, toSectionId: string, newOrder: number) => void;
  onUpdateSection: (sectionId: string, updates: Partial<CourseSection>) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddLecture: (sectionId: string, lecture: Omit<CourseLecture, 'id' | 'order' | 'sectionId'>) => void;
  onUpdateLecture: (lectureId: string, updates: Partial<CourseLecture>) => void;
  onDeleteLecture: (lectureId: string) => void;
}

interface SortableSectionProps {
  section: CourseSection;
  onUpdate: (updates: Partial<CourseSection>) => void;
  onDelete: () => void;
  onAddLecture: (lecture: Omit<CourseLecture, 'id' | 'order' | 'sectionId'>) => void;
  onUpdateLecture: (lectureId: string, updates: Partial<CourseLecture>) => void;
  onDeleteLecture: (lectureId: string) => void;
}

interface SortableLectureProps {
  lecture: CourseLecture;
  onUpdate: (updates: Partial<CourseLecture>) => void;
  onDelete: () => void;
}

function SortableLecture({ lecture, onUpdate, onDelete }: SortableLectureProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lecture.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'text': return <Edit3 className="h-4 w-4" />;
      case 'quiz': return <span className="text-sm">❓</span>;
      case 'assignment': return <span className="text-sm">📝</span>;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'text': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'quiz': return 'bg-green-100 text-green-800 border-green-200';
      case 'assignment': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white border border-gray-200 rounded-lg p-4 mb-2",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={cn("text-xs", getTypeColor(lecture.type))}>
              {getTypeIcon(lecture.type)}
              <span className="ml-1">{lecture.type}</span>
            </Badge>
            {lecture.isPreview && (
              <Badge variant="outline" className="text-xs">
                Preview
              </Badge>
            )}
          </div>

          <Input
            value={lecture.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Lecture title"
            className="mb-2"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-500">Duration (minutes)</label>
              <Input
                type="number"
                value={lecture.duration}
                onChange={(e) => onUpdate({ duration: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
                max="600"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Type</label>
              <Select
                value={lecture.type}
                onValueChange={(value) => onUpdate({ type: value as 'video' | 'text' | 'quiz' | 'assignment' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LECTURE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={lecture.isPreview}
                  onChange={(e) => onUpdate({ isPreview: e.target.checked })}
                  className="rounded"
                />
                Preview
              </label>
            </div>
          </div>

          {lecture.type === 'text' && (
            <Textarea
              value={lecture.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Lecture content..."
              rows={3}
              className="mt-2"
            />
          )}

          {lecture.type === 'video' && (
            <Input
              value={lecture.videoUrl || ''}
              onChange={(e) => onUpdate({ videoUrl: e.target.value })}
              placeholder="Video URL"
              className="mt-2"
            />
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SortableSection({ 
  section, 
  onUpdate, 
  onDelete, 
  onAddLecture, 
  onUpdateLecture, 
  onDeleteLecture
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddLecture = () => {
    onAddLecture({
      title: '',
      type: 'video',
      duration: 0,
      isPreview: false
    });
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white border border-gray-200 rounded-lg mb-4",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      {/* Section Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <Input
              value={section.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Section title"
              className="text-lg font-semibold border-none p-0 h-auto"
            />
            <Textarea
              value={section.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Section description (optional)"
              rows={2}
              className="mt-2 border-none p-0 resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Eye className={cn("h-4 w-4", isExpanded && "rotate-180")} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">
              Lectures ({section.lectures.length})
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddLecture}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Lecture
            </Button>
          </div>

          <SortableContext
            items={section.lectures.map(l => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {section.lectures.map((lecture) => (
                <SortableLecture
                  key={lecture.id}
                  lecture={lecture}
                  onUpdate={(updates) => onUpdateLecture(lecture.id, updates)}
                  onDelete={() => onDeleteLecture(lecture.id)}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      )}
    </div>
  );
}

export function DnDList({
  sections,
  onReorderSections,
  onMoveLecture,
  onUpdateSection,
  onDeleteSection,
  onAddLecture,
  onUpdateLecture,
  onDeleteLecture,
}: DnDListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    
    // Check if we're dragging a section or lecture
    const section = sections.find(s => s.id === event.active.id);
    if (section) {
      // Section is being dragged
    } else {
      // Lecture is being dragged
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    // Check if we're reordering sections
    const activeSection = sections.find(s => s.id === active.id);
    if (activeSection) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);
      
      if (oldIndex !== newIndex) {
        const newSections = arrayMove(sections, oldIndex, newIndex);
        onReorderSections(newSections);
      }
    } else {
      // We're reordering lectures within a section
      const activeLecture = sections
        .flatMap(s => s.lectures)
        .find(l => l.id === active.id);
      
      if (activeLecture) {
        const section = sections.find(s => s.lectures.some(l => l.id === active.id));
        if (section) {
          const oldIndex = section.lectures.findIndex(l => l.id === active.id);
          const newIndex = section.lectures.findIndex(l => l.id === over.id);
          
          if (oldIndex !== newIndex) {
            const newLectures = arrayMove(section.lectures, oldIndex, newIndex);
            // Reorder lectures within the section
            const reorderedLectures = newLectures.map((lecture, index) => ({
              ...lecture,
              order: index + 1
            }));
            // Update the section with reordered lectures
            onUpdateSection(section.id, { lectures: reorderedLectures });
          }
        }
      }
    }

    setActiveId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    // Handle moving lectures between sections
    const activeLecture = sections
      .flatMap(s => s.lectures)
      .find(l => l.id === active.id);
    
    if (activeLecture) {
      const overSection = sections.find(s => s.id === over.id);
      if (overSection && overSection.id !== activeLecture.sectionId) {
        const newOrder = overSection.lectures.length;
        onMoveLecture(activeLecture.id, activeLecture.sectionId, overSection.id, newOrder);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <SortableContext
        items={sections.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              onUpdate={(updates) => onUpdateSection(section.id, updates)}
              onDelete={() => onDeleteSection(section.id)}
              onAddLecture={(lecture) => onAddLecture(section.id, lecture)}
              onUpdateLecture={onUpdateLecture}
              onDeleteLecture={onDeleteLecture}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">
                {sections.find(s => s.id === activeId)?.title || 
                 sections.flatMap(s => s.lectures).find(l => l.id === activeId)?.title}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
