import { VideoOverlayData, VideoOverlayStore } from './data-overlay'

// Utility functions for fetching video overlay data
export class VideoOverlayUtils {
  // Fetch overlay data for a specific video by playback ID
  static async fetchOverlayByPlaybackId(playbackId: string): Promise<VideoOverlayData | null> {
    try {
      const overlay = VideoOverlayStore.getByPlaybackId(playbackId)
      return overlay || null
    } catch (error) {
      console.error('Error fetching overlay by playback ID:', error)
      return null
    }
  }

  // Fetch overlay data for a specific athlete
  static async fetchOverlayByAthlete(name: string): Promise<VideoOverlayData | null> {
    try {
      const overlay = VideoOverlayStore.getByName(name)
      return overlay || null
    } catch (error) {
      console.error('Error fetching overlay by athlete name:', error)
      return null
    }
  }

  // Fetch all overlays for a specific event
  static async fetchOverlaysByEvent(event: string): Promise<VideoOverlayData[]> {
    try {
      const overlays = VideoOverlayStore.getByEvent(event)
      return overlays
    } catch (error) {
      console.error('Error fetching overlays by event:', error)
      return []
    }
  }

  // Fetch all available overlay data
  static async fetchAllOverlays(): Promise<VideoOverlayData[]> {
    try {
      const overlays = VideoOverlayStore.getAll()
      return overlays
    } catch (error) {
      console.error('Error fetching all overlays:', error)
      return []
    }
  }

  // Format time for display (e.g., 2.87 -> "2.87s")
  static formatTime(time: number): string {
    return `${time.toFixed(2)}s`
  }

  // Format athlete name and time for lower third display
  static formatLowerThird(overlay: VideoOverlayData): {
    primaryText: string
    secondaryText: string
    timeText: string
  } {
    return {
      primaryText: overlay.name,
      secondaryText: overlay.event,
      timeText: this.formatTime(overlay.time)
    }
  }

  // Get best time for an event (lowest time)
  static async getBestTimeForEvent(event: string): Promise<VideoOverlayData | null> {
    try {
      const overlays = await this.fetchOverlaysByEvent(event)
      if (overlays.length === 0) return null
      
      return overlays.reduce((best, current) => 
        current.time < best.time ? current : best
      )
    } catch (error) {
      console.error('Error getting best time for event:', error)
      return null
    }
  }

  // Check if a video has overlay data
  static async hasOverlayData(playbackId: string): Promise<boolean> {
    const overlay = await this.fetchOverlayByPlaybackId(playbackId)
    return overlay !== null
  }
}
