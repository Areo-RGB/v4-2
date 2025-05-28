import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import Video from "next-video"
import timelineMai from "/videos/timeline-mai.mp4"

export default function VideosPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Mai 2025 Video</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Video 
            src={timelineMai} 
            className="w-full aspect-video rounded-lg" 
          />
          <p className="p-4 text-sm text-muted-foreground">Mai 2025</p>
        </CardContent>
      </Card>
    </div>
  )
}
