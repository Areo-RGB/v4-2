import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { VideoTimeline } from "@/app/dashboard/components/video-timeline"

export default function VideosPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Mai 2025 Video</CardTitle>
        </CardHeader>
        <CardContent>
          <VideoTimeline />
        </CardContent>
      </Card>
    </div>
  )
}
