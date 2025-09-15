"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerState, Note, CourseContent, Section, Lecture } from '@/types/player';
import { apiService, handleApiError } from '@/lib/api';

interface PlayerStore extends PlayerState {
  courseId: string | null;
  courseContent: CourseContent | null;
  notes: Note[];
  
  // Actions
  setCourseId: (courseId: string) => void;
  setCourseContent: (content: CourseContent) => void;
  setCurrentLecture: (lectureId: string) => void;
  updatePlaybackState: (state: Partial<Pick<PlayerState, 'isPlaying' | 'currentTime' | 'duration' | 'playbackRate' | 'volume' | 'isMuted' | 'showCaptions' | 'selectedLanguage' | 'isFullscreen' | 'isPictureInPicture'>>) => void;
  toggleSidebar: () => void;
  setRightSidebarTab: (tab: PlayerState['rightSidebarTab']) => void;
  setSearchQuery: (query: string) => void;
  toggleSectionExpanded: (sectionId: string) => void;
  markLectureComplete: (lectureId: string, completed: boolean) => void;
  updateLectureProgress: (lectureId: string, watchedDuration: number) => void;
  
  // Notes
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  getNotesForLecture: (lectureId: string) => Note[];
  
  // Filtering
  filterSections: () => void;
  
  // API methods
  loadPlayerState: (courseId: string) => Promise<void>;
  savePlayerState: (courseId: string) => Promise<void>;
  saveNoteToAPI: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteNoteFromAPI: (noteId: string) => Promise<void>;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      // Initial state
      courseId: null,
      currentLectureId: null,
      playbackPosition: 0,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      volume: 1,
      isMuted: false,
      showCaptions: false,
      selectedLanguage: 'en',
      availableLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
      isFullscreen: false,
      isPictureInPicture: false,
      sidebarCollapsed: false,
      rightSidebarTab: 'overview',
      searchQuery: '',
      filteredSections: [],
      courseContent: null,
      notes: [],

      // Actions
      setCourseId: (courseId) => {
        set({ courseId });
      },
      
      setCourseContent: (content) => {
        set({ courseContent: content, filteredSections: content.sections });
      },

      setCurrentLecture: (lectureId) => {
        set({ currentLectureId: lectureId });
      },

      updatePlaybackState: (state) => {
        set(state);
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },

      setRightSidebarTab: (tab) => {
        set({ rightSidebarTab: tab });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterSections();
      },

      toggleSectionExpanded: (sectionId) => {
        const { courseContent } = get();
        if (!courseContent) return;

        const updatedSections = courseContent.sections.map(section =>
          section.id === sectionId
            ? { ...section, isExpanded: !section.isExpanded }
            : section
        );

        set({
          courseContent: { ...courseContent, sections: updatedSections },
          filteredSections: updatedSections
        });
      },

      markLectureComplete: (lectureId, completed) => {
        const { courseContent } = get();
        if (!courseContent) return;

        const updatedSections = courseContent.sections.map(section => ({
          ...section,
          lectures: section.lectures.map(lecture =>
            lecture.id === lectureId
              ? { ...lecture, isCompleted: completed }
              : lecture
          )
        }));

        // Recalculate completed lectures count
        const updatedSectionsWithCounts = updatedSections.map(section => ({
          ...section,
          completedLectures: section.lectures.filter(lecture => lecture.isCompleted).length
        }));

        const totalCompletedLectures = updatedSectionsWithCounts.reduce(
          (total, section) => total + section.completedLectures,
          0
        );

        const progress = Math.round((totalCompletedLectures / courseContent.totalLectures) * 100);

        set({
          courseContent: {
            ...courseContent,
            sections: updatedSectionsWithCounts,
            completedLectures: totalCompletedLectures,
            progress
          },
          filteredSections: updatedSectionsWithCounts
        });
      },

      updateLectureProgress: (lectureId, watchedDuration) => {
        const { courseContent } = get();
        if (!courseContent) return;

        const updatedSections = courseContent.sections.map(section => ({
          ...section,
          lectures: section.lectures.map(lecture =>
            lecture.id === lectureId
              ? { 
                  ...lecture, 
                  watchedDuration,
                  lastWatchedAt: new Date().toISOString()
                }
              : lecture
          )
        }));

        set({
          courseContent: { ...courseContent, sections: updatedSections },
          filteredSections: updatedSections
        });
      },

      // Notes
      addNote: (noteData) => {
        const newNote: Note = {
          ...noteData,
          id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        set((state) => ({
          notes: [...state.notes, newNote]
        }));
      },

      updateNote: (noteId, content) => {
        set((state) => ({
          notes: state.notes.map(note =>
            note.id === noteId
              ? { ...note, content, updatedAt: new Date().toISOString() }
              : note
          )
        }));
      },

      deleteNote: (noteId) => {
        set((state) => ({
          notes: state.notes.filter(note => note.id !== noteId)
        }));
      },

      getNotesForLecture: (lectureId) => {
        return get().notes.filter(note => note.lectureId === lectureId);
      },

      // Filtering
      filterSections: () => {
        const { courseContent, searchQuery } = get();
        if (!courseContent) return;

        if (!searchQuery.trim()) {
          set({ filteredSections: courseContent.sections });
          return;
        }

        const filtered = courseContent.sections.map(section => ({
          ...section,
          lectures: section.lectures.filter(lecture =>
            lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lecture.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })).filter(section => section.lectures.length > 0);

        set({ filteredSections: filtered });
      },
      
      // API methods
      loadPlayerState: async (courseId: string) => {
        try {
          const state = await apiService.getPlayerState(courseId);
          set({
            currentLectureId: state.currentLectureId,
            playbackPosition: state.playbackPosition,
            playbackRate: state.playbackRate,
            isPlaying: state.isPlaying,
            volume: state.volume,
            isMuted: state.isMuted,
            notes: state.notes || [],
          });
        } catch (error: unknown) {
          console.error('Failed to load player state:', handleApiError(error as { code: string; message: string; statusCode: number }));
        }
      },
      
      savePlayerState: async (courseId: string) => {
        try {
          const { currentLectureId, playbackPosition, playbackRate, isPlaying, volume, isMuted } = get();
          await apiService.updatePlayerState(courseId, {
            lectureId: currentLectureId || undefined,
            playbackPosition,
            playbackRate,
            isPlaying,
            volume,
            isMuted,
          });
        } catch (error: unknown) {
          console.error('Failed to save player state:', handleApiError(error as { code: string; message: string; statusCode: number }));
        }
      },
      
      saveNoteToAPI: async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
          const { courseId } = get();
          if (!courseId) return;
          
          const savedNote = await apiService.saveNote(courseId, {
            lectureId: note.lectureId,
            timestamp: note.timestamp,
            content: note.content,
          });
          
          // Update local notes with the saved note
          const { notes } = get();
          set({ notes: [...notes, savedNote] });
        } catch (error: unknown) {
          console.error('Failed to save note:', handleApiError(error as { code: string; message: string; statusCode: number }));
        }
      },
      
      deleteNoteFromAPI: async (noteId: string) => {
        try {
          const { courseId } = get();
          if (!courseId) return;
          
          await apiService.deleteNote(courseId, noteId);
          
          // Remove note from local state
          const { notes } = get();
          set({ notes: notes.filter(note => note.id !== noteId) });
        } catch (error: unknown) {
          console.error('Failed to delete note:', handleApiError(error as { code: string; message: string; statusCode: number }));
        }
      }
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        currentLectureId: state.currentLectureId,
        playbackRate: state.playbackRate,
        volume: state.volume,
        isMuted: state.isMuted,
        showCaptions: state.showCaptions,
        selectedLanguage: state.selectedLanguage,
        sidebarCollapsed: state.sidebarCollapsed,
        rightSidebarTab: state.rightSidebarTab,
        notes: state.notes,
        courseContent: state.courseContent
      })
    }
  )
);
