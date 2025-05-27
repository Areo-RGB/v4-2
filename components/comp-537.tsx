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
    title: "Techno-Motorische Leistungsdiagnostik",
    videoUrl: [
      {
        url: "https://stream.mux.com/02jqhKfg302hIMSLV6N00f1646Nskfyk2wcsrYQlu81aEU.m3u8",
        title: "Bent - Komplett"
      },
      {
        url: "https://stream.mux.com/yz7eui2XLufzTPD7afARJ3iNznNalB02AZv00g01EDVf2Q.m3u8",
        title: "Finley - Komplett"
      }
    ],
    description: "Vergleich der kompletten Diagnostik beider Spieler"
  },
  {
    id: 2,
    date: "-- 2026",
    title: "Upcoming",
    description: "Zukünftiger Meilenstein - Details folgen"
  },
  {
    id: 3,
    date: "-- 2026",
    title: "Upcoming",
    description: "Zukünftiger Meilenstein - Details folgen"
  },
  {
    id: 4,
    date: "-- 2026",
    title: "Upcoming",
    description: "Zukünftiger Meilenstein - Details folgen"
  },
  {
    id: 5,
    date: "-- 2026",
    title: "Upcoming",
    description: "Zukünftiger Meilenstein - Details folgen"
  },
  {
    id: 6,
    date: "-- 2026",
    title: "Upcoming",
    description: "Zukünftiger Meilenstein - Details folgen"
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
                {Array.isArray(item.videoUrl) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {item.videoUrl.map((video, index) => (
                      <div key={index} className="space-y-2">
                        <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
                          <Video 
                            src={video.url}
                            controls
                            className="w-full h-full"
                          />
                        </div>
                        <p className="text-sm font-medium text-center">{video.title}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="px-4 pb-4">
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
