/**
 * Utility to extract video thumbnail/first frame
 * This can be used to generate thumbnails from video files
 */

export const extractVideoFrame = (videoUrl: string, time = 0): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.crossOrigin = 'anonymous';
    video.currentTime = time;

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    video.onseeked = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/jpeg', 0.8);
      resolve(dataURL);
    };

    video.onerror = () => {
      reject(new Error('Failed to load video'));
    };

    video.src = videoUrl;
  });
};

/**
 * Generate a thumbnail blob from video URL
 */
export const generateVideoThumbnail = async (
  videoUrl: string, 
  time = 0,
  width = 600,
  height = 400
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.crossOrigin = 'anonymous';
    video.currentTime = time;
    canvas.width = width;
    canvas.height = height;

    video.onseeked = () => {
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, width, height);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/jpeg', 0.8);
    };

    video.onerror = () => {
      reject(new Error('Failed to load video'));
    };

    video.src = videoUrl;
  });
};
