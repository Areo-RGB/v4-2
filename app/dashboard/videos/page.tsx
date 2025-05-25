"use client"; // Required for useState

import React, { useState } from 'react';
import { mockVideos } from './data';
import VideoCard from './components/video-card';
import { Video } from './types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york-v4/ui/dialog";

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoCardClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedVideo(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">Video Library</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {mockVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={handleVideoCardClick}
          />
        ))}
      </div>

      <Dialog open={selectedVideo !== null} onOpenChange={handleOpenChange}>
        {selectedVideo && (
          <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col bg-card rounded-lg p-0">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="text-xl">{selectedVideo.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full overflow-hidden p-1"> {/* Added p-1 to prevent video overflow on some browsers */}
              <video
                key={selectedVideo.id}
                src={selectedVideo.videoUrl}
                controls
                width="100%"
                height="100%"
                className="rounded-b-lg w-full h-full object-contain" // Changed to rounded-b-lg as header is separate, object-contain
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}