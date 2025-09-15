"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  posterUrl?: string;
  title: string;
  description?: string;
}

export function PreviewModal({ 
  isOpen, 
  onClose, 
  videoUrl, 
  posterUrl, 
  title, 
  description 
}: PreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {description && (
            <p className="text-gray-600 mt-2">{description}</p>
          )}
        </DialogHeader>
        
        <div className="relative flex-1 bg-black rounded-lg overflow-hidden mx-6 mb-6">
          {videoUrl ? (
            <video
              className="w-full h-full object-cover"
              poster={posterUrl}
              controls
              autoPlay={isPlaying}
              muted={isMuted}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8" />
                </div>
                <p className="text-lg font-medium">Preview not available</p>
                <p className="text-gray-400 text-sm mt-2">
                  This lecture doesn&apos;t have a preview video
                </p>
              </div>
            </div>
          )}
          
          {/* Custom Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={handlePlayPause}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                onClick={handleMuteToggle}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button
              size="sm"
              variant="secondary"
              onClick={handleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              This is a preview of the course content
            </p>
            <Button onClick={onClose} variant="outline">
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
