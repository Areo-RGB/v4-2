import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card" 
import { SimpleAreaChart } from "@/app/dashboard/components/simple-area-chart"
import { PlayerMetricsChart } from "@/app/dashboard/components/player-metrics-chart"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardContent className="flex items-center justify-center min-h-32">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <Image
                src="/dfb-logo.png"
                alt="DFB Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold tracking-tight">
                Statistiken
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Techno-Motorische Leistungsdiagnostik
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Simple Area Chart for DFB Sprint data */}
      <div className="w-full">
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
  )
}

