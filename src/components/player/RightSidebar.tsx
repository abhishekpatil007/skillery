"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { usePlayerStore } from "@/store/playerStore";
import { 
  BookOpen, 
  StickyNote, 
  Download, 
  MessageCircle,
  Plus,
  Trash2,
  Edit3,
  Clock,
  User,
  ThumbsUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  className?: string;
}

export function RightSidebar({ className }: RightSidebarProps) {
  const {
    courseContent,
    currentLectureId,
    rightSidebarTab,
    setRightSidebarTab,
    addNote,
    updateNote,
    deleteNote,
    getNotesForLecture
  } = usePlayerStore();

  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const currentLecture = courseContent?.sections
    .flatMap(section => section.lectures)
    .find(lecture => lecture.id === currentLectureId);

  const currentNotes = currentLectureId ? getNotesForLecture(currentLectureId) : [];

  const handleAddNote = () => {
    if (!newNote.trim() || !currentLectureId) return;

    addNote({
      lectureId: currentLectureId,
      timestamp: 0, // In real app, this would be current video time
      content: newNote.trim()
    });

    setNewNote("");
  };

  const handleEditNote = (noteId: string, content: string) => {
    setEditingNoteId(noteId);
    setEditingContent(content);
  };

  const handleSaveEdit = () => {
    if (editingNoteId && editingContent.trim()) {
      updateNote(editingNoteId, editingContent.trim());
    }
    setEditingNoteId(null);
    setEditingContent("");
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Mock resources data
  const resources = [
    {
      id: "1",
      title: "Course Slides (PDF)",
      type: "pdf" as const,
      url: "#",
      size: "2.3 MB",
      description: "Complete course presentation slides"
    },
    {
      id: "2",
      title: "Source Code Repository",
      type: "zip" as const,
      url: "#",
      size: "15.2 MB",
      description: "All code examples and projects"
    },
    {
      id: "3",
      title: "Additional Reading",
      type: "link" as const,
      url: "#",
      description: "Recommended articles and documentation"
    }
  ];

  // Mock Q&A data
  const qaMessages = [
    {
      id: "1",
      type: "question" as const,
      content: "Can someone explain the difference between flexbox and grid?",
      author: "John Doe",
      timestamp: 1640995200000,
      upvotes: 12,
      isInstructor: false
    },
    {
      id: "2",
      type: "answer" as const,
      content: "Great question! Flexbox is for 1D layouts (row or column) while Grid is for 2D layouts (both row and column). Use flexbox for components and grid for page layouts.",
      author: "Sarah Chen",
      timestamp: 1640995800000,
      upvotes: 8,
      isInstructor: true
    }
  ];

  return (
    <div className={cn("w-80 bg-white border-l border-gray-200 flex flex-col", className)}>
      <Tabs value={rightSidebarTab} onValueChange={(value) => setRightSidebarTab(value as 'overview' | 'notes' | 'resources' | 'qa')} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
          <TabsTrigger value="overview" className="text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs">
            <StickyNote className="h-3 w-3 mr-1" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs">
            <Download className="h-3 w-3 mr-1" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="qa" className="text-xs">
            <MessageCircle className="h-3 w-3 mr-1" />
            Q&A
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="overview" className="p-4 space-y-4">
            {currentLecture ? (
              <>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {currentLecture.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLecture.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{formatTime(currentLecture.duration)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <Badge 
                      variant={currentLecture.isCompleted ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {currentLecture.isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                  </div>

                  {currentLecture.watchedDuration > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {Math.round((currentLecture.watchedDuration / currentLecture.duration) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-brand-600 h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(currentLecture.watchedDuration / currentLecture.duration) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {currentLecture.isPreview && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      This is a preview lecture. Enroll in the course to access all content.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Select a lecture to view details</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <Button
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || !currentLectureId}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {currentNotes.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <StickyNote className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No notes yet</p>
                    <p className="text-xs text-gray-400">Add your first note above</p>
                  </div>
                ) : (
                  currentNotes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                      {editingNoteId === note.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSaveEdit}
                              size="sm"
                              className="text-xs"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingNoteId(null)}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{formatTime(note.timestamp)}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                onClick={() => handleEditNote(note.id, note.content)}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteNote(note.id)}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-900">{note.content}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="p-4 space-y-4">
            <div className="space-y-3">
              {resources.map((resource) => (
                <div key={resource.id} className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Download className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        {resource.title}
                      </h4>
                      {resource.description && (
                        <p className="text-xs text-gray-600 mb-2">
                          {resource.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.type.toUpperCase()}
                        </Badge>
                        {resource.size && (
                          <span className="text-xs text-gray-500">{resource.size}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qa" className="p-4 space-y-4">
            <div className="space-y-4">
              {qaMessages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                        message.isInstructor 
                          ? "bg-brand-100 text-brand-800" 
                          : "bg-gray-100 text-gray-800"
                      )}>
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          {message.author}
                        </span>
                        {message.isInstructor && (
                          <Badge variant="secondary" className="text-xs">
                            Instructor
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {message.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {message.upvotes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
