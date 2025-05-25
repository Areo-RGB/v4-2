"use client";

import { useRef, useState, useCallback, useEffect } from 'react';

interface UseVideoPlayerProps {
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: Error) => void;
}

export const useVideoPlayer = ({ onPlay, onPause, onError }: UseVideoPlayerProps = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const play = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    } catch (error) {
      console.warn('Video play failed:', error);
      setHasError(true);
      onError?.(error as Error);
    }
  }, [onPlay, onError]);

  const pause = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.pause();
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  const reset = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
  }, []);

  const seek = useCallback((time: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolumeLevel = useCallback((level: number) => {
    if (!videoRef.current) return;
    
    const clampedLevel = Math.max(0, Math.min(1, level));
    videoRef.current.volume = clampedLevel;
    setVolume(clampedLevel);
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, []);

  const setSpeed = useCallback((rate: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Event handlers
  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.(new Error('Video failed to load'));
  }, [onError]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const videoProps = {
    ref: videoRef,
    onLoadedData: handleLoadedData,
    onTimeUpdate: handleTimeUpdate,
    onError: handleError,
    onEnded: handleEnded,
  };

  return {
    videoRef,
    videoProps,
    isPlaying,
    isLoaded,
    hasError,
    duration,
    currentTime,
    volume,
    muted,
    playbackRate,
    play,
    pause,
    reset,
    seek,
    setVolumeLevel,
    toggleMute,
    setSpeed,
    togglePlayPause,
  };
};
