export interface Lecture {
  id: string;
  title: string;
  duration: number; // in seconds
  videoUrl: string;
  thumbnail: string;
  description?: string;
  isPreview: boolean;
  isCompleted: boolean;
  watchedDuration: number; // in seconds
  lastWatchedAt?: string;
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
  isExpanded: boolean;
  totalDuration: number; // in seconds
  completedLectures: number;
}

export interface CourseContent {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  sections: Section[];
  totalDuration: number;
  totalLectures: number;
  completedLectures: number;
  progress: number; // percentage
}

export interface PlayerState {
  currentLectureId: string | null;
  playbackPosition: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  showCaptions: boolean;
  selectedLanguage: string;
  availableLanguages: string[];
  isFullscreen: boolean;
  isPictureInPicture: boolean;
  sidebarCollapsed: boolean;
  rightSidebarTab: 'overview' | 'notes' | 'resources' | 'qa';
  searchQuery: string;
  filteredSections: Section[];
}

export interface Note {
  id: string;
  lectureId: string;
  timestamp: number; // in seconds
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'link' | 'code';
  url: string;
  size?: string;
  description?: string;
}

export interface QAMessage {
  id: string;
  type: 'question' | 'answer';
  content: string;
  author: string;
  timestamp: number;
  upvotes: number;
  isInstructor: boolean;
  replies?: QAMessage[];
}
