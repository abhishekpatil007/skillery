"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/store/playerStore";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Captions,
  PictureInPicture,
  Globe,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  className?: string;
}

export function VideoPlayer({ className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const {
    currentLectureId,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    showCaptions,
    selectedLanguage,
    availableLanguages,
    isFullscreen,
    updatePlaybackState,
    updateLectureProgress
  } = usePlayerStore();

  // Mock video URL - in real app, this would come from the lecture data
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Handle video events
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      updatePlaybackState({ duration: videoRef.current.duration });
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      updatePlaybackState({ currentTime });
      
      // Update lecture progress every 5 seconds
      if (Math.floor(currentTime) % 5 === 0) {
        updateLectureProgress(currentLectureId!, Math.floor(currentTime));
      }
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      updatePlaybackState({ isPlaying: true });
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      updatePlaybackState({ isPlaying: false });
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      updatePlaybackState({ currentTime: value[0] });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value[0];
      updatePlaybackState({ volume: value[0], isMuted: value[0] === 0 });
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      updatePlaybackState({ isMuted: !isMuted });
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      updatePlaybackState({ playbackRate: rate });
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      updatePlaybackState({ isFullscreen: true });
    } else {
      document.exitFullscreen();
      updatePlaybackState({ isFullscreen: false });
    }
  };

  const handlePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      updatePlaybackState({ isPictureInPicture: false });
    } else {
      videoRef.current?.requestPictureInPicture();
      updatePlaybackState({ isPictureInPicture: true });
    }
  };

  const handleCaptionsToggle = () => {
    updatePlaybackState({ showCaptions: !showCaptions });
  };

  const handleLanguageChange = (language: string) => {
    updatePlaybackState({ selectedLanguage: language });
    setShowLanguageMenu(false);
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'ru': 'Русский',
      'ja': '日本語',
      'ko': '한국어',
      'zh': '中文'
    };
    return languages[code] || code;
  };

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target !== videoRef.current) return;

    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault();
        isPlaying ? handlePause() : handlePlay();
        break;
      case 'j':
        e.preventDefault();
        handleSkipBackward();
        break;
      case 'l':
        e.preventDefault();
        handleSkipForward();
        break;
      case 'k':
        e.preventDefault();
        isPlaying ? handlePause() : handlePlay();
        break;
      case 'm':
        e.preventDefault();
        handleMuteToggle();
        break;
      case 'f':
        e.preventDefault();
        handleFullscreen();
        break;
      case 'c':
        e.preventDefault();
        handleCaptionsToggle();
        break;
      case '+':
      case '=':
        e.preventDefault();
        const newRate = Math.min(2, playbackRate + 0.25);
        handlePlaybackRateChange(newRate);
        break;
      case '-':
        e.preventDefault();
        const slowerRate = Math.max(0.25, playbackRate - 0.25);
        handlePlaybackRateChange(slowerRate);
        break;
    }
  }, [isPlaying, playbackRate, handlePause, handlePlay, handleSkipBackward, handleSkipForward, handleMuteToggle, handleFullscreen, handlePlaybackRateChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto-hide controls
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageMenu) {
        const target = event.target as Element;
        if (!target.closest('[data-language-menu]')) {
          setShowLanguageMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLanguageMenu]);

  // Sync video state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentLectureId) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-black text-white",
        className
      )}>
        <div className="text-center">
          <Play className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg">Select a lecture to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative bg-black group",
      className
    )}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={() => isPlaying ? handlePause() : handlePlay()}
      >
        {/* Subtitles/Captions */}
        {showCaptions && (
          <track
            kind="subtitles"
            src={`/subtitles/sample-${selectedLanguage}.vtt`}
            srcLang={selectedLanguage}
            label={getLanguageName(selectedLanguage)}
            default
          />
        )}
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCaptionsToggle}
            className={cn(
              "text-white hover:bg-white/20",
              showCaptions && "bg-white/20"
            )}
            title="Toggle Subtitles"
          >
            <Captions className="h-4 w-4" />
          </Button>
          
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="text-white hover:bg-white/20"
              title="Change Language"
            >
              <Globe className="h-4 w-4" />
            </Button>
            
            {showLanguageMenu && (
              <div 
                data-language-menu
                className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-40 max-h-60 overflow-y-auto"
              >
                <div className="text-white text-xs mb-2 font-medium">Select Language</div>
                <div className="space-y-1">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 text-white flex items-center gap-2",
                        selectedLanguage === lang && "bg-white/20"
                      )}
                    >
                      <Languages className="h-3 w-3" />
                      {getLanguageName(lang)}
                      {selectedLanguage === lang && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePictureInPicture}
            className="text-white hover:bg-white/20"
            title="Picture in Picture"
          >
            <PictureInPicture className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
            className="text-white hover:bg-white/20"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={isPlaying ? handlePause : handlePlay}
            className="text-white hover:bg-white/20 h-16 w-16 rounded-full"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              onValueChange={handleSeek}
              max={duration}
              step={1}
              className="w-full"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkipBackward}
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? handlePause : handlePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkipForward}
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMuteToggle}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 min-w-32">
                    <div className="space-y-2">
                      <div className="text-white text-xs mb-2">Playback Speed</div>
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            handlePlaybackRateChange(rate);
                            setShowSettings(false);
                          }}
                          className={cn(
                            "w-full text-left px-2 py-1 text-xs rounded hover:bg-white/20 text-white",
                            playbackRate === rate && "bg-white/20"
                          )}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
          <div className="space-y-1">
            <div>Space: Play/Pause</div>
            <div>J: -10s | L: +10s</div>
            <div>M: Mute | F: Fullscreen</div>
            <div>+/-: Speed | C: Captions</div>
            <div>Click Globe: Change Language</div>
          </div>
        </div>
      </div>
    </div>
  );
}
