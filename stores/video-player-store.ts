import React from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface VideoPlayerState {
  // State
  isPlaying: boolean
  isLoaded: boolean
  hasError: boolean
  duration: number
  currentTime: number
  volume: number
  muted: boolean
  playbackRate: number
  videoElement: HTMLVideoElement | null
  
  // Actions
  setVideoElement: (element: HTMLVideoElement | null) => void
  setIsPlaying: (playing: boolean) => void
  setIsLoaded: (loaded: boolean) => void
  setHasError: (error: boolean) => void
  setDuration: (duration: number) => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
  setMuted: (muted: boolean) => void
  setPlaybackRate: (rate: number) => void
  
  // Video controls
  play: () => Promise<void>
  pause: () => void
  reset: () => void
  seek: (time: number) => void
  setVolumeLevel: (level: number) => void
  toggleMute: () => void
  setSpeed: (rate: number) => void
  togglePlayPause: () => void
  
  // Error handling
  handleError: (error?: Error) => void
  clearError: () => void
}

export const useVideoPlayerStore = create<VideoPlayerState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isPlaying: false,
      isLoaded: false,
      hasError: false,
      duration: 0,
      currentTime: 0,
      volume: 1,
      muted: false,
      playbackRate: 1,
      videoElement: null,
      
      // State setters
      setVideoElement: (element) => set({ videoElement: element }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setIsLoaded: (loaded) => set({ isLoaded: loaded }),
      setHasError: (error) => set({ hasError: error }),
      setDuration: (duration) => set({ duration }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setVolume: (volume) => set({ volume }),
      setMuted: (muted) => set({ muted }),
      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      
      // Video controls
      play: async () => {
        const { videoElement } = get()
        if (!videoElement) return
        
        try {
          await videoElement.play()
          set({ isPlaying: true, hasError: false })
        } catch (error) {
          console.warn('Video play failed:', error)
          set({ hasError: true })
        }
      },
      
      pause: () => {
        const { videoElement } = get()
        if (!videoElement) return
        
        videoElement.pause()
        set({ isPlaying: false })
      },
      
      reset: () => {
        const { videoElement } = get()
        if (!videoElement) return
        
        videoElement.currentTime = 0
        set({ currentTime: 0 })
      },
      
      seek: (time: number) => {
        const { videoElement } = get()
        if (!videoElement) return
        
        videoElement.currentTime = time
        set({ currentTime: time })
      },
      
      setVolumeLevel: (level: number) => {
        const { videoElement } = get()
        if (!videoElement) return
        
        const clampedLevel = Math.max(0, Math.min(1, level))
        videoElement.volume = clampedLevel
        set({ volume: clampedLevel })
      },
      
      toggleMute: () => {
        const { videoElement } = get()
        if (!videoElement) return
        
        videoElement.muted = !videoElement.muted
        set({ muted: videoElement.muted })
      },
      
      setSpeed: (rate: number) => {
        const { videoElement } = get()
        if (!videoElement) return
        
        videoElement.playbackRate = rate
        set({ playbackRate: rate })
      },
      
      togglePlayPause: () => {
        const { isPlaying, play, pause } = get()
        if (isPlaying) {
          pause()
        } else {
          play()
        }
      },
      
      // Error handling
      handleError: (error?: Error) => {
        console.error('Video error:', error)
        set({ hasError: true, isLoaded: false })
      },
      
      clearError: () => {
        set({ hasError: false })
      },
    }),
    {
      name: 'video-player-store',
    }
  )
)

// Helper hook to sync video element events with store
export const useVideoPlayerSync = (videoElement: HTMLVideoElement | null) => {
  const {
    setVideoElement,
    setIsLoaded,
    setDuration,
    setCurrentTime,
    setIsPlaying,
    handleError,
  } = useVideoPlayerStore()
  
  React.useEffect(() => {
    setVideoElement(videoElement)
    
    if (!videoElement) return
    
    const handleLoadedData = () => {
      setIsLoaded(true)
      setDuration(videoElement.duration)
    }
    
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }
    
    const handleError = () => {
      handleError(new Error('Video failed to load'))
    }
    
    const handleEnded = () => {
      setIsPlaying(false)
    }
    
    videoElement.addEventListener('loadeddata', handleLoadedData)
    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('error', handleError)
    videoElement.addEventListener('ended', handleEnded)
    
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData)
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('error', handleError)
      videoElement.removeEventListener('ended', handleEnded)
    }
  }, [videoElement, setVideoElement, setIsLoaded, setDuration, setCurrentTime, setIsPlaying, handleError])
}
