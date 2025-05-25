"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card" 
import { DFB_AGE_GROUPS, getDfbSprintDataForChart, getDfbSprintMeanValues } from "@/lib/dfb-data" 

export function SimpleAreaChart() {
  const chartData = getDfbSprintDataForChart();
  const ageGroups = [...DFB_AGE_GROUPS];
  
  // Simple color palette
  const colors = {
    U11: "#3b82f6", // Blue
    U12: "#f97316", // Orange
    U13: "#ef4444", // Red
    U14: "#22c55e", // Green
    U15: "#8b5cf6", // Purple
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>10m Sprint Distribution by Age Group</CardTitle>
        <CardDescription>
          Comparison of 10m sprint times (seconds) across percentiles (U11-U15). Lower values are better.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
              <defs>
                {ageGroups.map((age) => (
                  <linearGradient key={`fill-${age}`} id={`fill-${age}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[age as keyof typeof colors]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[age as keyof typeof colors]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="categoryLabel" 
                angle={-45} 
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={(value) => `${typeof value === 'number' ? value.toFixed(2) : value}s`}
                domain={['dataMin - 0.05', 'dataMax + 0.05']}
              />
              <Tooltip 
                formatter={(value: any) => [`${value.toFixed(2)}s`, ``]} 
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              {ageGroups.map((age) => (
                <Area
                  key={age}
                  type="monotone"
                  dataKey={age}
                  name={age}
                  stroke={colors[age as keyof typeof colors]}
                  fill={`url(#fill-${age})`}
                  strokeWidth={1.5}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 