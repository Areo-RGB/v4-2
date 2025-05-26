import Video from "next-video"
import { Card } from "@/registry/new-york-v4/ui/card"
import { LowerThird } from "@/components/lower-third"

export default function VideoPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Video Player</h1>
        <p className="text-muted-foreground">Video player with card design</p>
      </div>        {/* Video Card - perfectly fitted to video dimensions */}
      <div className="flex justify-center">
        <Card className="p-0 overflow-hidden inline-block border border-border shadow-lg relative">
          <Video
            src="https://stream.mux.com/NYAE4oZ1WIvAoV5IQLr7I02e1dBXgLT003hdQZ1Xex6WI.m3u8"
            muted
            playsInline
            className="block"
            controls
            style={{ 
              width: 'auto',
              height: 'auto',
              minWidth: 'unset',
              minHeight: 'unset',
              maxWidth: 'none',
              maxHeight: 'none'
            }}
          />
          <LowerThird 
            playbackId="NYAE4oZ1WIvAoV5IQLr7I02e1dBXgLT003hdQZ1Xex6WI"
            show={true}
            duration={8000}
          />
        </Card>      </div>
    </div>
  )
}
