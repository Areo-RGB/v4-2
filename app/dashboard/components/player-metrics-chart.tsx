"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"
import { Card, CardContent } from "@/registry/new-york-v4/ui/card"

// Reference data from the table in the image
const REFERENCE_DATA = [
  { 
    age: 11.00, 
    percentile: "1% - 20%", 
    height: 115, 
    height_max: 142, 
    weight: 21.00, 
    weight_max: 33.00, 
    weight_avg: 31.06 
  },
  { 
    age: 11.00, 
    percentile: "21% - 40%", 
    height: 142, 
    height_max: 146, 
    weight: 33.00, 
    weight_max: 36.00, 
    weight_avg: 34.62 
  },
  { 
    age: 11.00, 
    percentile: "41% - 60%", 
    height: 146, 
    height_max: 150, 
    weight: 36.00, 
    weight_max: 38.40, 
    weight_avg: 37.10 
  },
  { 
    age: 11.00, 
    percentile: "61% - 80%", 
    height: 150, 
    height_max: 154, 
    weight: 38.40, 
    weight_max: 42.00, 
    weight_avg: 40.02 
  },
  { 
    age: 11.00, 
    percentile: "81% - 100%", 
    height: 154, 
    height_max: 178, 
    weight: 42.00, 
    weight_max: 99.00, 
    weight_avg: 49.52 
  },
  { 
    age: 12.00, 
    percentile: "1% - 20%", 
    height: 125, 
    height_max: 143, 
    weight: 24.00, 
    weight_max: 34.00, 
    weight_avg: 31.34 
  },
  { 
    age: 12.00, 
    percentile: "21% - 40%", 
    height: 143, 
    height_max: 147, 
    weight: 34.00, 
    weight_max: 36.00, 
    weight_avg: 35.09 
  },
  { 
    age: 12.00, 
    percentile: "41% - 60%", 
    height: 147, 
    height_max: 150, 
    weight: 36.00, 
    weight_max: 39.00, 
    weight_avg: 37.80 
  },
  { 
    age: 12.00, 
    percentile: "61% - 80%", 
    height: 150, 
    height_max: 154, 
    weight: 39.00, 
    weight_max: 43.00, 
    weight_avg: 40.68 
  },
  { 
    age: 12.00, 
    percentile: "81% - 100%", 
    height: 154, 
    height_max: 179, 
    weight: 43.00, 
    weight_max: 99.00, 
    weight_avg: 51.08 
  }
];

// Player data (Finley and Bent with height = 150 and weight = 35)
const PLAYER_DATA = [
  { name: "Finley", height: 150, weight: 35 },
  { name: "Bent", height: 150, weight: 35 }
];

// Extract unique age groups
const AGE_GROUPS = [...new Set(REFERENCE_DATA.map(item => item.age))];

// Determine percentile range for a player based on height or weight
const getPercentileRange = (value: number, metric: 'height' | 'weight', ageGroup: number) => {
  const filteredData = REFERENCE_DATA.filter(item => item.age === ageGroup);
  
  for (const range of filteredData) {
    const min = metric === 'height' ? range.height : range.weight;
    const max = metric === 'height' ? range.height_max : range.weight_max;
    
    if (value >= min && value <= max) {
      return range.percentile;
    }
  }
  
  return "Unknown";
};

// Format data for chart display based on the selected metric and age group
const formatDataForChart = (metric: 'height' | 'weight', ageGroup: number) => {
  // Get reference data for the selected age group
  const referenceData = REFERENCE_DATA.filter(item => item.age === ageGroup);
  
  // Create data array for the chart
  const chartData = referenceData.map(range => {
    const rangeLabel = range.percentile;
    const minValue = metric === 'height' ? range.height : range.weight;
    const maxValue = metric === 'height' ? range.height_max : range.weight_max;
    const avgValue = metric === 'height' ? (range.height + range.height_max) / 2 : range.weight_avg;
    
    return {
      range: rangeLabel,
      min: minValue,
      max: maxValue,
      avg: avgValue
    };
  });
  
  return chartData;
};

// Available metrics
const METRICS = [
  { id: 'height', name: 'Height (cm)' },
  { id: 'weight', name: 'Weight (kg)' }
];

export function PlayerMetricsChart() {
  const [activeMetric, setActiveMetric] = React.useState<'height' | 'weight'>('height');
  const [activeAge, setActiveAge] = React.useState<number>(11);
  
  // Format chart data based on selections
  const chartData = formatDataForChart(activeMetric, activeAge);
  
  // Calculate min/max values for better Y-axis scaling
  const minValue = Math.min(...chartData.map(item => item.min)) * 0.95;
  const maxValue = Math.max(...chartData.map(item => 
    Math.max(item.max, 
      // Include player values in calculation
      ...PLAYER_DATA.map(p => activeMetric === 'height' ? p.height : p.weight)
    )
  )) * 1.05;
  
  // Get player values for the active metric
  const playerValues = PLAYER_DATA.map(player => ({
    ...player,
    percentile: getPercentileRange(
      activeMetric === 'height' ? player.height : player.weight,
      activeMetric,
      activeAge
    )
  }));
  
  // Colors
  const metricColors = {
    min: "#9ca3af",
    max: "#4b5563",
    avg: "#2563eb"
  };
  
  const playerColors = {
    "Finley": "#e11d48",
    "Bent": "#0ea5e9"
  };

  return (
    <div className="space-y-3">
      {/* Controls Card */}
      <Card className="shadow-sm">
        <CardContent className="p-3">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div>
              <p className="text-xs font-medium mb-1">Metric:</p>
              <Tabs 
                value={activeMetric} 
                onValueChange={(value) => setActiveMetric(value as 'height' | 'weight')}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 h-8">
                  {METRICS.map(metric => (
                    <TabsTrigger key={metric.id} value={metric.id} className="text-xs py-1">{metric.name}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <p className="text-xs font-medium mb-1">Age Group:</p>
              <Tabs 
                value={activeAge.toString()} 
                onValueChange={(value) => setActiveAge(parseFloat(value))}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 h-8">
                  {AGE_GROUPS.map(age => (
                    <TabsTrigger key={age} value={age.toString()} className="text-xs py-1">{age} Years</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Chart Card */}
      <Card className="shadow-sm">
        <CardContent className="p-2">
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 50 }}
                barGap={2}
                barSize={16}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
                <XAxis 
                  dataKey="range" 
                  angle={-45} 
                  textAnchor="end"
                  height={50}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}${activeMetric === 'height' ? 'cm' : 'kg'}`}
                  width={45}
                  domain={[minValue, maxValue]}
                  padding={{ top: 10 }}
                  allowDecimals={false}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    const unit = activeMetric === 'height' ? 'cm' : 'kg';
                    const formattedName = name === 'min' ? 'Minimum' : name === 'max' ? 'Maximum' : 'Average';
                    return [`${value}${unit}`, formattedName];
                  }}
                />
                <Legend 
                  align="center"
                  verticalAlign="top"
                  height={20}
                  iconSize={10}
                  wrapperStyle={{ fontSize: 11, paddingBottom: 5 }}
                />
                <Bar dataKey="min" name="Minimum" fill={metricColors.min} />
                <Bar dataKey="max" name="Maximum" fill={metricColors.max} />
                <Bar dataKey="avg" name="Average" fill={metricColors.avg} />
                
                {/* Player reference lines */}
                {PLAYER_DATA.map(player => (
                  <ReferenceLine 
                    key={player.name}
                    y={activeMetric === 'height' ? player.height : player.weight} 
                    stroke={playerColors[player.name as keyof typeof playerColors]} 
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    label={{ 
                      value: `${player.name}`,
                      position: 'right',
                      fill: playerColors[player.name as keyof typeof playerColors],
                      fontSize: 10,
                      offset: 5
                    }}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Player Percentiles Card */}
      <Card className="shadow-sm">
        <CardContent className="py-2 px-3">
          <div className="flex flex-wrap gap-2 justify-center">
            <p className="text-xs font-medium mr-1">Player Percentiles:</p>
            {playerValues.map(player => (
              <Badge 
                key={player.name}
                variant="outline"
                style={{
                  borderColor: playerColors[player.name as keyof typeof playerColors],
                  color: playerColors[player.name as keyof typeof playerColors]
                }}
                className="font-medium text-xs py-0 h-5"
              >
                {player.name}: {player.percentile}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 