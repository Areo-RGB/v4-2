// Video overlay data store
export interface VideoOverlayData {
  id: string
  name: string
  time: number
  event: string
  muxId: string
  muxAssetId: string
  playbackId: string
  streamUrl: string
  posterUrl: string
}

export const videoOverlayData: VideoOverlayData[] = [
  {
    id: "10m-bent",
    name: "Bent",
    time: 2.87,
    event: "10m Sprint",
    muxId: "Q902hAs1HNAGjMqZBkIB02JD6wIJF2i3mdX9MgQ00LDNyc",
    muxAssetId: "NFN3hZvw3AkAJA400V5DVsYWWhYwGAwGl5mfb54laMT00",
    playbackId: "NYAE4oZ1WIvAoV5IQLr7I02e1dBXgLT003hdQZ1Xex6WI",
    streamUrl: "https://stream.mux.com/NYAE4oZ1WIvAoV5IQLr7I02e1dBXgLT003hdQZ1Xex6WI.m3u8",
    posterUrl: "https://image.mux.com/NYAE4oZ1WIvAoV5IQLr7I02e1dBXgLT003hdQZ1Xex6WI/thumbnail.webp"
  }
  // Add more entries as needed
]

// Database-like operations
export class VideoOverlayStore {
  private static data = videoOverlayData

  // Get all overlay data
  static getAll(): VideoOverlayData[] {
    return this.data
  }

  // Get by ID
  static getById(id: string): VideoOverlayData | undefined {
    return this.data.find(item => item.id === id)
  }

  // Get by name
  static getByName(name: string): VideoOverlayData | undefined {
    return this.data.find(item => item.name.toLowerCase() === name.toLowerCase())
  }

  // Get by event type
  static getByEvent(event: string): VideoOverlayData[] {
    return this.data.filter(item => item.event.toLowerCase() === event.toLowerCase())
  }

  // Get by playback ID
  static getByPlaybackId(playbackId: string): VideoOverlayData | undefined {
    return this.data.find(item => item.playbackId === playbackId)
  }

  // Add new entry
  static add(entry: VideoOverlayData): void {
    this.data.push(entry)
  }

  // Update entry
  static update(id: string, updates: Partial<VideoOverlayData>): boolean {
    const index = this.data.findIndex(item => item.id === id)
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updates }
      return true
    }
    return false
  }

  // Delete entry
  static delete(id: string): boolean {
    const index = this.data.findIndex(item => item.id === id)
    if (index !== -1) {
      this.data.splice(index, 1)
      return true
    }
    return false
  }
}
