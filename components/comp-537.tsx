import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
  TimelineContent,
} from "@/components/ui/timeline"
import { Card, CardContent } from "@/components/ui/card"
import Video from "next-video"

const items = [
  {
    id: 1,
    date: "Mai 2025",
    title: "Beginn",
    videoUrl: "https://stream.mux.com/o00T7zmJ4w012kbp14n2OkW026zEpqEUJ8tn6eXGijKo5M.m3u8",
    description: "Hürdenlauf (0.8m)"
  },
  {
    id: 2,
    date: "-- 2026",
    title: "Upcoming",
    description: "Future milestone - details to be determined"
  },
  {
    id: 3,
    date: "-- 2026",
    title: "Upcoming",
    description: "Future milestone - details to be determined"
  },
  {
    id: 4,
    date: "-- 2026",
    title: "Upcoming",
    description: "Future milestone - details to be determined"
  },
  {
    id: 5,
    date: "-- 2026",
    title: "Upcoming",
    description: "Future milestone - details to be determined"
  },
  {
    id: 6,
    date: "-- 2026",
    title: "Upcoming",
    description: "Future milestone - details to be determined"
  },
]

export default function Component() {
  return (
    <Timeline defaultValue={3}>
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="w-full md:w-[calc(60%-1.5rem)] odd:ms-auto even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:-right-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:translate-x-1/2 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:-right-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:translate-x-1/2"
        >
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineIndicator />
          </TimelineHeader>
          <TimelineContent className="mt-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {item.videoUrl ? (
                  <div className="aspect-video relative">
                    <Video 
                      src={item.videoUrl}
                      controls 
                      className="w-full h-full bg-black"
                    />
                  </div>
                ) : null}
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
