"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card" 
import { DFB_AGE_GROUPS, getDfbSprintDataForChart, getDfbSprintMeanValues } from "@/lib/dfb-data" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define test types and their display names
const TEST_TYPES = [
  { id: "10m_sprint", name: "10m Sprint", key: "Antritt (10 m)" },
  { id: "20m_sprint", name: "20m Sprint", key: "Schnelligkeit (20 m)" },
  { id: "agility", name: "Agility", key: "Gewandtheit" },
  { id: "dribbling", name: "Dribbling", key: "Dribbling" },
  { id: "ball_control", name: "Ball Control", key: "Ballkontrolle" },
  { id: "juggling", name: "Ball Juggling", key: "Balljonglieren" },
]

// Player performance data
const PLAYER_DATA = {
  "Antritt (10 m)": [
    { name: "Finley", value: 2.00 },
    { name: "Bent", value: 2.87 }
  ],
  "Schnelligkeit (20 m)": [
    { name: "Finley", value: 3.59 },
    { name: "Bent", value: 3.95 }
  ],
  "Gewandtheit": [
    { name: "Finley", value: 7.81 },
    { name: "Bent", value: 7.92 }
  ],
  "Dribbling": [
    { name: "Finley", value: 10.27 },
    { name: "Bent", value: 12.15 }
  ],
  "Balljonglieren": [
    { name: "Finley", value: 0.00 },
    { name: "Bent", value: 11 }
  ],
  "Ballkontrolle": [
    { name: "Finley", value: 10.82 },
    { name: "Bent", value: 8.95 }
  ]
};

// Function to get player data with percentile context for U11
function getPlayerDataWithPercentiles(testKey: string) {
  const players = PLAYER_DATA[testKey as keyof typeof PLAYER_DATA] || [];
  const u11Data = getDfbSprintDataForChart(testKey);
  
  if (u11Data.length === 0 || players.length === 0) return [];

  // Create chart data with percentile bands and player positions
  const chartData = u11Data.map(percentile => ({
    percentile: percentile.categoryLabel,
    value: percentile.U11,
    type: 'percentile'
  }));

  // Add players to the data
  players.forEach(player => {
    chartData.push({
      percentile: `${player.name}`,
      value: player.value,
      type: 'player'
    });
  });

  return chartData;
}

export function SimpleAreaChart() {
  const [activeTest, setActiveTest] = React.useState<string>(TEST_TYPES[0].id)
  const ageGroups = [...DFB_AGE_GROUPS];
  
  // Simple color palette
  const colors = {
    U11: "#3b82f6", // Blue
    U12: "#f97316", // Orange
    U13: "#ef4444", // Red
    U14: "#22c55e", // Green
    U15: "#8b5cf6", // Purple
  }

  // Get the active test configuration
  const activeTestConfig = TEST_TYPES.find(test => test.id === activeTest) || TEST_TYPES[0];
  const activeTestName = activeTestConfig.name;
  const activeTestKey = activeTestConfig.key;

  // Get unit for the active test (either 's' for seconds or 'P.' for points)
  const isPointsTest = activeTest === "juggling"; // Ball juggling is measured in points

  // Get chart data for the currently active test
  const chartData = getDfbSprintDataForChart(activeTestKey);
  
  // Debug logging
  console.log('Active test:', activeTest, 'Key:', activeTestKey);
  console.log('Chart data:', chartData);
  console.log('Data values:', chartData.map(d => ({ 
    label: d.categoryLabel, 
    U11: d.U11, 
    U12: d.U12, 
    U13: d.U13, 
    U14: d.U14, 
    U15: d.U15 
  })));
  
  // Debug logging to see what data we're getting
  React.useEffect(() => {
    console.log('Active test:', activeTest, 'Key:', activeTestKey);
    console.log('Chart data:', chartData);
    console.log('Is points test:', isPointsTest);    if (chartData.length > 0) {
      const allValues = chartData.flatMap(item => 
        [item.U11, item.U12, item.U13, item.U14, item.U15]
      ).filter(val => val !== null && val !== undefined);
      console.log('All numeric values:', allValues);
      console.log('Min value:', Math.min(...allValues));
      console.log('Max value:', Math.max(...allValues));
    }
  }, [activeTest, activeTestKey, chartData, isPointsTest]);
  return (
    <div className="space-y-6">
      {/* Player Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Player Performance - U11 Context</CardTitle>
          <CardDescription>
            Player performance compared to U11 percentile distribution for {activeTestName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={getPlayerDataWithPercentiles(activeTestKey)} 
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tickFormatter={(value) => isPointsTest ? `${value} pts` : `${value.toFixed(2)}s`}
                />
                <YAxis 
                  type="category" 
                  dataKey="percentile" 
                  width={70}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [
                    isPointsTest ? `${value} points` : `${value.toFixed(2)} seconds`, 
                    'Performance'
                  ]}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {getPlayerDataWithPercentiles(activeTestKey).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.type === 'player' ? '#ef4444' : '#94a3b8'} 
                      fillOpacity={entry.type === 'player' ? 0.9 : 0.4}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Main Performance Distribution Chart */}
      <Card>
      <CardHeader>
        <CardTitle>Performance Distribution by Age Group</CardTitle>
        <CardDescription>
          Comparison of {activeTestName} performance across percentiles (U11-U15).
        </CardDescription>
      </CardHeader>
      <CardContent>        <Tabs defaultValue={activeTest} onValueChange={setActiveTest} className="mb-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            {TEST_TYPES.map(test => (
              <TabsTrigger key={test.id} value={test.id}>{test.name}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeTest}>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <defs>
                    {ageGroups.map((age) => (
                      <linearGradient key={`fill-${age}-${activeTest}`} id={`fill-${age}-${activeTest}`} x1="0" y1="0" x2="0" y2="1">
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
                    tickFormatter={(value) => `${typeof value === 'number' ? value.toFixed(2) : value}${isPointsTest ? 'p' : 's'}`}
                    domain={isPointsTest ? [0, 'dataMax + 2'] : ['dataMin - 0.05', 'dataMax + 0.05']}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`${value.toFixed(2)}${isPointsTest ? ' points' : 's'}`, ``]} 
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
                      fill={`url(#fill-${age}-${activeTest})`}
                      strokeWidth={1.5}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-center text-muted-foreground">              {!isPointsTest && "Lower values indicate better performance (seconds)"}
              {isPointsTest && "Higher values indicate better performance (points)"}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </div>
  )
}