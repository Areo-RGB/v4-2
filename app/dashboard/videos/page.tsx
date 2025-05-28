import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import Video from "next-video"
import CustomVideoPlayer from "@/components/custom-video-player"
import timelineMai from "/videos/timeline-mai.mp4"
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

export default function VideosPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Mai 2026 Video</CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline className="p-4">
            <TimelineItem step={1}>
              <TimelineHeader>
                <TimelineIndicator />
                <TimelineTitle>
                  Hürdenlauf 
                </TimelineTitle>
                <TimelineDate>
                  Mai 2025
                </TimelineDate>
              </TimelineHeader>
              <TimelineContent>
                <div className="mt-2 space-y-2">
                  <Video 
                    src={timelineMai} 
                    className="w-full rounded-lg aspect-video" 
                  />
                </div>
              </TimelineContent>
              <TimelineSeparator />
            </TimelineItem>
            <TimelineItem step={2}>
              <TimelineHeader>
                <TimelineIndicator />
                <TimelineTitle>
                  Hürdenlauf
                </TimelineTitle>
                <TimelineDate>
                  Mai 2026
                </TimelineDate>
              </TimelineHeader>
              <TimelineContent>
                <div className="mt-2 space-y-2">
                  <CustomVideoPlayer className="w-full rounded-lg aspect-video" />
                </div>
              </TimelineContent>
              <TimelineSeparator />
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </div>
  )
}
