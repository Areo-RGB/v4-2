"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card" 
import { DFB_AGE_GROUPS, getDfbSprintDataForChart, getDfbSprintMeanValues } from "@/lib/dfb-data" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Label } from "@/registry/new-york-v4/ui/label"
import dashboardData from "../data.json"
import { Badge } from "@/registry/new-york-v4/ui/badge"

// Define test types and their display names
const TEST_TYPES = [
  { id: "10m_sprint", name: "10m Sprint", key: "Antritt (10 m)" },
  { id: "20m_sprint", name: "20m Sprint", key: "Schnelligkeit (20 m)" },
  { id: "agility", name: "Agility", key: "Gewandtheit" },
  { id: "dribbling", name: "Dribbling", key: "Dribbling" },
  { id: "ball_control", name: "Ball Control", key: "Ballkontrolle" },
  { id: "juggling", name: "Ball Juggling", key: "Balljonglieren" },
]

// Map test IDs to exercise names in data.json
const TEST_TO_EXERCISE_MAP = {
  "10m_sprint": "10m Sprint",
  "20m_sprint": "20m Sprint",
  "agility": "Gewandtheit",
  "dribbling": "Dribbling",
  "ball_control": "Ballkontrolle",
  "juggling": "Balljonglieren"
}

// Extract player data by exercise
const getPlayerDataByExercise = (exercise: string) => {
  // Special case handling for Dribbling exercise
  if (exercise === "Dribbling") {
    return dashboardData
      .filter(item => 
        (item.exercise === exercise || 
         (item.name === "Bent" && item.category === "Gewandtheit" && item.exercise === exercise)) && 
        item.isplayer === "YES"
      )
      .map(item => ({
        name: item.name,
        result: parseFloat(item.result),
        exercise: item.exercise,
        category: item.category
      }));
  }
  
  return dashboardData
    .filter(item => item.exercise === exercise && item.isplayer === "YES")
    .map(item => ({
      name: item.name,
      result: parseFloat(item.result),
      exercise: item.exercise,
      category: item.category
    }));
};

// Custom legend component to display age groups and player references
const CustomLegend = ({ 
  ageGroups, 
  colors, 
  showPlayerRef, 
  playerData, 
  playerColors 
}: { 
  ageGroups: string[],
  colors: Record<string, string>,
  showPlayerRef: boolean,
  playerData: { name: string, result: number }[],
  playerColors: Record<string, string>
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {/* Age group legend items */}
      {ageGroups.map(age => (
        <Badge 
          key={age} 
          variant="outline" 
          style={{ 
            borderColor: colors[age as keyof typeof colors],
            color: colors[age as keyof typeof colors]
          }}
          className="font-semibold"
        >
          {age}
        </Badge>
      ))}
      
      {/* Player reference legend items when enabled */}
      {showPlayerRef && playerData.map(player => (
        <Badge 
          key={player.name} 
          variant="outline" 
          style={{ 
            borderColor: playerColors[player.name as keyof typeof playerColors] || '#000',
            color: playerColors[player.name as keyof typeof playerColors] || '#000'
          }}
          className="font-semibold"
        >
          {player.name} ({player.result})
        </Badge>
      ))}
    </div>
  );
};

export function SimpleAreaChart() {
  const [activeTest, setActiveTest] = React.useState<string>(TEST_TYPES[0].id)
  const [showPlayerRef, setShowPlayerRef] = React.useState<boolean>(false)
  const ageGroups = [...DFB_AGE_GROUPS];
  
  // Simple color palette
  const colors = {
    U11: "#3b82f6", // Blue
    U12: "#f97316", // Orange
    U13: "#ef4444", // Red
    U14: "#22c55e", // Green
    U15: "#8b5cf6", // Purple
  }

  // Player reference line colors
  const playerColors = {
    "Finley": "#e11d48", // Rose
    "Bent": "#0ea5e9",   // Sky blue
  }

  // Get the active test configuration
  const activeTestConfig = TEST_TYPES.find(test => test.id === activeTest) || TEST_TYPES[0];
  const activeTestName = activeTestConfig.name;
  const activeTestKey = activeTestConfig.key;

  // Get exercise name from data.json format
  const activeExercise = TEST_TO_EXERCISE_MAP[activeTest as keyof typeof TEST_TO_EXERCISE_MAP];

  // Get player data for the current exercise
  const playerData = React.useMemo(() => 
    getPlayerDataByExercise(activeExercise),
  [activeExercise]);

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
    console.log('Is points test:', isPointsTest);
    if (chartData.length > 0) {
      const allValues = chartData.flatMap(item =>
        DFB_AGE_GROUPS.map(age => item[age])
      ).filter(val => val !== null && val !== undefined);
      console.log('All numeric values:', allValues);
      console.log('Min value:', Math.min(...allValues));
      console.log('Max value:', Math.max(...allValues));
    }
  }, [activeTest, activeTestKey, chartData, isPointsTest]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Distribution by Age Group</CardTitle>
        <CardDescription>
          Comparison of {activeTestName} performance across percentiles (U11-U15).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="include-players" 
            checked={showPlayerRef}
            onCheckedChange={(checked) => setShowPlayerRef(!!checked)}
          />
          <Label htmlFor="include-players" className="text-sm">
            Include player results as reference lines
          </Label>
        </div>
        
        <Tabs defaultValue={activeTest} onValueChange={setActiveTest} className="mb-4">
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
                  <CartesianGrid stroke="#ffffff" strokeOpacity={0.15} strokeWidth={0.5} />
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
                  
                  {/* Player reference lines */}
                  {showPlayerRef && playerData.map(player => (
                    <ReferenceLine 
                      key={`ref-${player.name}`}
                      y={player.result}
                      label={{ 
                        value: `${player.name} (${player.result}${isPointsTest ? 'p' : 's'})`,
                        position: 'insideBottomRight',
                        fill: playerColors[player.name as keyof typeof playerColors] || '#000',
                        fontSize: 12,
                      }}
                      stroke={playerColors[player.name as keyof typeof playerColors] || '#000'}
                      strokeDasharray="3 3"
                      strokeWidth={2}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom legend */}
            <CustomLegend 
              ageGroups={ageGroups}
              colors={colors}
              showPlayerRef={showPlayerRef}
              playerData={playerData}
              playerColors={playerColors}
            />
            
            <div className="mt-2 text-sm text-center text-muted-foreground">
              {!isPointsTest && "Lower values indicate better performance (seconds)"}
              {isPointsTest && "Higher values indicate better performance (points)"}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}