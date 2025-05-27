import { Card, CardContent } from "@/components/ui/card"
import Video from "next-video"

export default function FinleyBentPage() {
  const videos = [
    {
      id: 1,
      url: "https://stream.mux.com/02jqhKfg302hIMSLV6N00f1646Nskfyk2wcsrYQlu81aEU.m3u8",
      thumbnail: "https://image.mux.com/02jqhKfg302hIMSLV6N00f1646Nskfyk2wcsrYQlu81aEU/thumbnail.jpg"
    },
    {
      id: 2,
      url: "https://stream.mux.com/yz7eui2XLufzTPD7afARJ3iNznNalB02AZv00g01EDVf2Q.m3u8",
      thumbnail: "https://image.mux.com/yz7eui2XLufzTPD7afARJ3iNznNalB02AZv00g01EDVf2Q/thumbnail.jpg"
    }
  ]

  return (
    <div className="flex-1 p-1 md:p-2 h-[calc(100vh-2rem)]">
      <div className="grid grid-cols-1 gap-2 h-full sm:grid-cols-2">
        {videos.map((video) => (
          <div key={video.id} className="w-full h-full">
            <Card className="h-full overflow-hidden border-0 shadow-none bg-transparent">
              <CardContent className="h-full p-0">
                <div className="relative w-full h-full">
                  <Video
                    src={video.url}
                    className="w-full h-full object-contain bg-black rounded-lg"
                    controls
                    poster={video.thumbnail}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}