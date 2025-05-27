import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card" 
import { SimpleAreaChart } from "@/app/dashboard/components/simple-area-chart"
import { PlayerMetricsChart } from "@/app/dashboard/components/player-metrics-chart"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

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

