/**
 * lib/dfb-data.ts
 * 
 * This module provides hardcoded DFB performance data for chart visualization.
 * It provides structured data for use in components, particularly charts focusing on different test types.
 */

export interface PerformanceMetric {
  value: number | null;
  unit: 's' | 'P.' | null; // 'P.' for Points
}

export interface ChartDataPoint {
  categoryLabel: string;
  U11: number;
  U12: number;
  U13: number;
  U14: number;
  U15: number;
}

export const DFB_AGE_GROUPS = ['U11', 'U12', 'U13', 'U14', 'U15'] as const;

// Hardcoded performance data by test type and age group
// Values represent different percentiles (3%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 97%)
const PERFORMANCE_DATA = {
  "Antritt (10 m)": {
    U11: [2.39, 2.33, 2.28, 2.24, 2.21, 2.18, 2.16, 2.13, 2.10, 2.05, 1.99],
    U12: [2.34, 2.28, 2.22, 2.19, 2.16, 2.13, 2.11, 2.08, 2.05, 2.00, 1.94],
    U13: [2.29, 2.22, 2.17, 2.13, 2.11, 2.08, 2.06, 2.03, 2.00, 1.96, 1.89],
    U14: [2.22, 2.16, 2.11, 2.07, 2.04, 2.02, 1.99, 1.97, 1.93, 1.89, 1.82],
    U15: [2.16, 2.09, 2.04, 2.01, 1.98, 1.96, 1.93, 1.90, 1.87, 1.83, 1.78]
  },
  "Schnelligkeit (20 m)": {
    U11: [4.14, 4.01, 3.93, 3.87, 3.82, 3.78, 3.74, 3.69, 3.64, 3.57, 3.47],
    U12: [4.02, 3.91, 3.82, 3.77, 3.72, 3.68, 3.64, 3.60, 3.55, 3.48, 3.39],
    U13: [3.92, 3.80, 3.72, 3.68, 3.62, 3.58, 3.54, 3.50, 3.46, 3.38, 3.29],
    U14: [3.80, 3.68, 3.60, 3.55, 3.50, 3.46, 3.42, 3.38, 3.32, 3.25, 3.16],
    U15: [3.67, 3.56, 3.47, 3.42, 3.37, 3.32, 3.28, 3.24, 3.19, 3.13, 3.05]
  },
  "Gewandtheit": {
    U11: [9.66, 9.33, 9.07, 8.90, 8.77, 8.66, 8.54, 8.42, 8.28, 8.11, 7.91],
    U12: [9.47, 9.10, 8.87, 8.72, 8.59, 8.48, 8.38, 8.26, 8.14, 7.98, 7.76],
    U13: [9.23, 8.89, 8.66, 8.51, 8.39, 8.29, 8.19, 8.08, 7.97, 7.81, 7.62],
    U14: [9.05, 8.71, 8.50, 8.37, 8.25, 8.15, 8.06, 7.96, 7.85, 7.70, 7.50],
    U15: [8.93, 8.60, 8.39, 8.26, 8.15, 8.05, 7.96, 7.85, 7.74, 7.60, 7.41]
  },
  "Dribbling": {
    U11: [14.37, 13.42, 12.84, 12.46, 12.15, 11.90, 11.68, 11.44, 11.16, 10.84, 10.43],
    U12: [13.49, 12.62, 12.11, 11.79, 11.53, 11.32, 11.12, 10.92, 10.70, 10.42, 10.07],
    U13: [12.81, 12.01, 11.57, 11.28, 11.06, 10.88, 10.70, 10.52, 10.33, 10.09, 9.78],
    U14: [12.33, 11.61, 11.22, 10.97, 10.76, 10.59, 10.43, 10.27, 10.09, 9.85, 9.57],
    U15: [12.12, 11.43, 11.02, 10.78, 10.58, 10.41, 10.25, 10.10, 9.93, 9.71, 9.40]
  },
  "Ballkontrolle": {
    U11: [15.29, 13.81, 12.86, 12.28, 11.78, 11.36, 10.99, 10.59, 10.18, 9.66, 9.00],
    U12: [14.39, 12.95, 12.09, 11.56, 11.12, 10.75, 10.40, 10.04, 9.69, 9.21, 8.60],
    U13: [13.07, 11.86, 11.06, 10.58, 10.20, 9.89, 9.60, 9.30, 8.98, 8.57, 8.07],
    U14: [12.49, 11.20, 10.50, 10.09, 9.78, 9.47, 9.19, 8.91, 8.60, 8.23, 7.78],
    U15: [12.10, 10.86, 10.10, 9.67, 9.35, 9.07, 8.80, 8.53, 8.26, 7.91, 7.48]
  },
  "Balljonglieren": {
    U11: [0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 6],
    U12: [0, 0, 0, 1, 1, 1, 1, 2, 3, 4, 9],
    U13: [0, 0, 1, 1, 1, 2, 3, 4, 6, 9, 14],
    U14: [0, 1, 1, 2, 3, 4, 5, 7, 9, 13, 18],
    U15: [0, 1, 2, 3, 4, 5, 7, 9, 12, 16, 20]
  }
};

// Percentile labels for chart visualization
const PERCENTILE_LABELS = [
  "Min (3%)",
  "10%", 
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "Good (80%)",
  "Very Good (90%)",
  "Excellent (97%)"
];

/**
 * Get chart data for a specific test type across all age groups
 */
export function getDfbSprintDataForChart(testName: string): ChartDataPoint[] {
  console.log('getDfbSprintDataForChart called with:', testName);
  
  const testData = PERFORMANCE_DATA[testName as keyof typeof PERFORMANCE_DATA];
  
  if (!testData) {
    console.warn('No data found for test:', testName);
    return [];
  }

  console.log('Raw test data:', testData);

  const chartData = PERCENTILE_LABELS.map((label, index) => ({
    categoryLabel: label,
    U11: testData.U11[index],
    U12: testData.U12[index], 
    U13: testData.U13[index],
    U14: testData.U14[index],
    U15: testData.U15[index]
  }));

  console.log('Generated chart data:', chartData);
  return chartData;
}

/**
 * Get mean values for a specific test across age groups
 */
export function getDfbSprintMeanValues(testName: string): Record<string, number> {
  const testData = PERFORMANCE_DATA[testName as keyof typeof PERFORMANCE_DATA];
  
  if (!testData) {
    return {};
  }

  // Return the 50th percentile (median) values
  return {
    U11: testData.U11[5], // Index 5 is the 50% value
    U12: testData.U12[5],
    U13: testData.U13[5],
    U14: testData.U14[5],
    U15: testData.U15[5]
  };
}