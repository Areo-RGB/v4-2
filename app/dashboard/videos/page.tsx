import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import Video from "next-video"
import CustomVideoPlayer from "@/components/custom-video-player"
import timelineMai from "/videos/timeline-mai.mp4"
import finleyGw from "/videos/finley-gw.mov"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

export default function VideosPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Training Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bent" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="bent">Bent</TabsTrigger>
              <TabsTrigger value="finley">Finley</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bent">
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
                      <CustomVideoPlayer 
                        src="/videos/timeline-mai.mp4" 
                        className="w-full rounded-lg aspect-video" 
                      />
                    </div>
                  </TimelineContent>
                  <TimelineSeparator />
                </TimelineItem>
              </Timeline>
            </TabsContent>
            
            <TabsContent value="finley">
              <Timeline className="p-4">
                <TimelineItem step={1}>
                  <TimelineHeader>
                    <TimelineIndicator />
                    <TimelineTitle>
                      Gewandtheit
                    </TimelineTitle>
                    <TimelineDate>
                      April 2025
                    </TimelineDate>
                  </TimelineHeader>
                  <TimelineContent>
                    <div className="mt-2 space-y-2">
                      <Video 
                        src={finleyGw} 
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
                      Gewandtheit
                    </TimelineTitle>
                    <TimelineDate>
                      April 2026
                    </TimelineDate>
                  </TimelineHeader>
                  <TimelineContent>
                    <div className="mt-2 space-y-2">
                      <CustomVideoPlayer 
                        src="/videos/finley-gw.mov" 
                        className="w-full rounded-lg aspect-video" 
                      />
                    </div>
                  </TimelineContent>
                  <TimelineSeparator />
                </TimelineItem>
              </Timeline>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
