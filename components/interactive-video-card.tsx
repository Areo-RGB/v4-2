"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Video } from "@/app/dashboard/videos/types";
import { Play, Pause } from "lucide-react";

interface InteractiveVideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  className?: string;
}

export default function InteractiveVideoCard({ 
  video, 
  onClick, 
  className 
}: InteractiveVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Video autoplay failed:', error);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out",
          "hover:shadow-2xl hover:scale-[1.02] cursor-pointer",
          "bg-gradient-to-br from-slate-900 to-slate-800",
          "border border-slate-700/50 hover:border-slate-600/80"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(video)}
      >
        {/* Aspect ratio container */}
        <div className="relative aspect-video">
          {/* Background Image (thumbnail) */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-all duration-500",
              isHovered && isLoaded ? "opacity-0 scale-110" : "opacity-100 scale-100"
            )}
            style={{
              backgroundImage: `url(${video.thumbnailUrl})`,
            }}
          />
          
          {/* Background Video */}
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoaded}
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play/Pause icon */}
          <div className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "transition-all duration-300 ease-in-out",
            isHovered ? "opacity-80 scale-110" : "opacity-90 scale-100"
          )}>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white ml-0" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </div>
          </div>

          {/* Loading indicator */}
          {isHovered && !isLoaded && (
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-sm">
          <h3 className={cn(
            "font-semibold text-white transition-colors duration-300",
            "group-hover:text-blue-300 text-lg leading-tight"
          )}>
            {video.title}
          </h3>
          <p className="text-slate-300 text-sm mt-1 opacity-80">
            Hover to preview • Click to watch
          </p>
        </div>

        {/* Hover effect overlay */}
        <div className={cn(
          "absolute inset-0 bg-blue-500/10 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
      </div>
    </div>
  );
}
