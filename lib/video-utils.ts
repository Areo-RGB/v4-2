/**
 * Extracts a thumbnail from a video URL
 * @param videoUrl The URL of the video
 * @returns The URL of the thumbnail
 */
export function extractVideoThumbnail(videoUrl: string): string {
  if (!videoUrl) return '';
  
  // For YouTube videos
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = videoUrl.includes('youtube.com') 
      ? videoUrl.split('v=')[1]?.split('&')[0]
      : videoUrl.split('youtu.be/')[1]?.split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  // For Vimeo videos
  if (videoUrl.includes('vimeo.com')) {
    // Note: This is a placeholder. Actual Vimeo thumbnail extraction requires their API
    return '';
  }

  // For local videos, we return the video URL itself
  // The video element can generate a thumbnail from the first frame
  return videoUrl;
}