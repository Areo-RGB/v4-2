import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import Video from "next-video"

// Import videos
import finielyVideo from '../../../videos/finleykomplett00000000.mov'
import bentVideo from '../../../videos/bentkomplett00000000.mov'

export default function VideosPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      {/* First Video Card */}
      <Card className="overflow-hidden p-0 rounded-none">
        <CardContent className="p-0 m-0">
          <Video src={finielyVideo} className="w-full aspect-video rounded-lg m-0" />
        </CardContent>
      </Card>

      {/* Second Video Card */}
      <Card className="overflow-hidden p-0 rounded-none">
        <CardContent className="p-0 m-0">
          <Video src={bentVideo} className="w-full aspect-video rounded-lg m-0" />
        </CardContent>
      </Card>
    </div>
  )
}
