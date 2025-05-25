import React from 'react';
import { Video } from '../types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card'; // Removed unused CardContent, CardFooter

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <Card
      onClick={() => onClick(video)}
      className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg overflow-hidden group"
    >
      <div className="relative w-full aspect-video">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover" // Ensure h-full to fill aspect-video container
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <CardHeader className="p-0"> {/* Remove default padding from CardHeader */}
            <CardTitle className="text-white text-lg font-semibold group-hover:text-primary transition-colors duration-300">
              {video.title}
            </CardTitle>
          </CardHeader>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
