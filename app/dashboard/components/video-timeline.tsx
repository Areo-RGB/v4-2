"use client"

import * as React from "react"
import { useState } from "react"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

// Import only the timeline-mai video
import timelineVideo from '@/videos/timeline-mai.mp4.json'

// Create a type for the video data based on the JSON structure
type VideoData = {
  status: string
  originalFilePath: string
  provider: string
  providerMetadata: {
    mux: {
      uploadId: string
      assetId?: string
      playbackId?: string
    }
  }
  createdAt: number
  updatedAt: number
  size: number
  sources?: {
    src: string
    type: string
  }[]
  poster?: string
  blurDataURL?: string
}

export function VideoTimeline() {
  // Use only the timeline video
  const videos: VideoData[] = [
    timelineVideo
  ].filter(video => video && video.originalFilePath);

  return (
    <Timeline className="p-4">
      {videos.map((video, index) => (
        <TimelineItem key={video.originalFilePath || index} step={index + 1}>
          <TimelineHeader>
            <TimelineIndicator />
            <TimelineTitle>
              {video.originalFilePath?.includes('timeline-mai') 
                ? 'Mai 2025' 
                : (video.originalFilePath?.split('/').pop()?.replace('.mp4', '') || `Video ${index + 1}`)}
            </TimelineTitle>
            <TimelineDate>
              {video.originalFilePath?.includes('timeline-mai')
                ? 'Mai 2025'
                : (video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'No date')}
            </TimelineDate>
          </TimelineHeader>
          <TimelineContent>
            <div className="mt-2 space-y-2">
              {video.poster && (
                <video 
                  controls 
                  poster={video.poster} 
                  className="w-full rounded-lg"
                  style={{ maxHeight: "240px" }}
                >
                  {video.sources?.map((source, idx) => (
                    <source key={idx} src={source.src} type={source.type} />
                  ))}
                  Your browser does not support the video tag.
                </video>
              )}
              {!video.poster && (
                <div className="bg-muted flex items-center justify-center h-40 rounded-lg">
                  No video preview available
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {video.size ? `${(video.size / 1024 / 1024).toFixed(2)} MB` : 'Size unknown'}
              </p>
            </div>
          </TimelineContent>
          <TimelineSeparator />
        </TimelineItem>
      ))}
    </Timeline>
  )
} 