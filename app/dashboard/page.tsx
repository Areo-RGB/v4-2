import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { DataTable } from "@/app/dashboard/components/data-table"
import data from "@/app/dashboard/data.json"
import { SimpleAreaChart } from "@/app/dashboard/components/simple-area-chart"
import { PlayerMetricsChart } from "@/app/dashboard/components/player-metrics-chart"

export default function Page() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardContent className="flex items-center justify-center min-h-36 py-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/dfb-logo.png"
                  alt="DFB Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold tracking-tight">
                  Spieler:Ergebnisse
                </h3>
              </div>
              <p className="text-base text-muted-foreground">
                Techno-Motorische Leistungsdiagnostik
              </p>
            </div>
          </CardContent>
        </Card>
        
        <DataTable data={data} />

        {/* Analytics content moved from /dashboard/analytics */}
        <div className="w-full mt-8">
          <SimpleAreaChart />
        </div>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3"> 
          <CardHeader className="pb-2 text-center">
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <div className="w-full max-w-4xl">
              <PlayerMetricsChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
