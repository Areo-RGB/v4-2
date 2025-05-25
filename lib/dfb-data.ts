/**
 * lib/dfb-data.ts
 * 
 * This module stores and parses the DFB performance data from the provided CSV.
 * It provides structured data for use in components, particularly charts focusing on 10m sprint.
 */

// --- START OF CSV DATA ---
const dfbCsvData: string = `
U11,,,,,,,,,,,,,,
,,,,C (0 – 30 %): unterdurchschnittlich (Below average),,,,B (31 – 70 %): durchschnittlich (Average),,,,A (71 – 100 %),,
Test,n,MW,STD,Min. (3%),10%,20%,30%,40%,50%,60%,70%,gut (Good) (80%),sehr gut (Very good) (90%),ausgezeichnet (Excellent) (Max. / 97%)
Schnelligkeit (20 m),6203,"3,79 s","0,18 s","4,14 s","4,01 s","3,93 s","3,87 s","3,82 s","3,78 s","3,74 s","3,69 s","3,64 s","3,57 s","3,47 s"
Antritt (10 m),6165,"2,19 s","0,11 s","2,39 s","2,33 s","2,28 s","2,24 s","2,21 s","2,18 s","2,16 s","2,13 s","2,10 s","2,05 s","1,99 s"
Gewandtheit,6152,"8,69 s","0,47 s","9,66 s","9,33 s","9,07 s","8,90 s","8,77 s","8,66 s","8,54 s","8,42 s","8,28 s","8,11 s","7,91 s"
Dribbling,6207,"12,04 s","1,05 s","14,37 s","13,42 s","12,84 s","12,46 s","12,15 s","11,90 s","11,68 s","11,44 s","11,16 s","10,84 s","10,43 s"
Ballkontrolle,6123,"11,59 s","1,68 s","15,29 s","13,81 s","12,86 s","12,28 s","11,78 s","11,36 s","10,99 s","10,59 s","10,18 s","9,66 s","9,00 s"
Balljonglieren,6119,"1,37 P.","1,86 P.","0,00 P.","0,00 P.","0,00 P.","0,00 P.","1,00 P.","1,00 P.","1,00 P.","1,00 P.","2,00 P.","3,00 P.","6,00 P."
Gesamtleistung,5950,"99,26 P.","1,93 P.","95,53 P.","96,78 P.","97,65 P.","98,29 P.","98,80 P.","99,30 P.","99,81 P.","100,30 P.","100,90 P.","101,66 P.","102,84 P."
,,,,,,,,,,,,,,
U12,,,,,,,,,,,,,,
,,,,C (0 – 30 %): unterdurchschnittlich (Below average),,,,B (31 – 70 %): durchschnittlich (Average),,,,A (71 – 100 %),,
Test,n,MW,STD,Min. (3%),10%,20%,30%,40%,50%,60%,70%,gut (Good) (80%),sehr gut (Very good) (90%),ausgezeichnet (Excellent) (Max. / 97%)
Schnelligkeit (20 m),24929,"3,69 s","0,17 s","4,02 s","3,91 s","3,82 s","3,77 s","3,72 s","3,68 s","3,64 s","3,60 s","3,55 s","3,48 s","3,39 s"
Antritt (10 m),24812,"2,14 s","0,11 s","2,34 s","2,28 s","2,22 s","2,19 s","2,16 s","2,13 s","2,11 s","2,08 s","2,05 s","2,00 s","1,94 s"
Gewandtheit,24861,"8,51 s","0,45 s","9,47 s","9,10 s","8,87 s","8,72 s","8,59 s","8,48 s","8,38 s","8,26 s","8,14 s","7,98 s","7,76 s"
Dribbling,24959,"11,45 s","0,92 s","13,49 s","12,62 s","12,11 s","11,79 s","11,53 s","11,32 s","11,12 s","10,92 s","10,70 s","10,42 s","10,07 s"
Ballkontrolle,24634,"10,96 s","1,56 s","14,39 s","12,95 s","12,09 s","11,56 s","11,12 s","10,75 s","10,40 s","10,04 s","9,69 s","9,21 s","8,60 s"
Balljonglieren,24871,"1,78 P.","2,54 P.","0,00 P.","0,00 P.","0,00 P.","1,00 P.","1,00 P.","1,00 P.","1,00 P.","2,00 P.","3,00 P.","4,00 P.","9,00 P."
Gesamtleistung,24160,"100,48 P.","1,76 P.","97,00 P.","98,20 P.","99,02 P.","99,60 P.","100,07 P.","100,51 P.","100,93 P.","101,40 P.","101,95 P.","102,73 P.","103,83 P."
,,,,,,,,,,,,,,
U13,,,,,,,,,,,,,,
,,,,C (0 – 30 %): unterdurchschnittlich (Below average),,,,B (31 – 70 %): durchschnittlich (Average),,,,A (71 – 100 %),,
Test,n,MW,STD,Min. (3%),10%,20%,30%,40%,50%,60%,70%,gut (Good) (80%),sehr gut (Very good) (90%),ausgezeichnet (Excellent) (Max. / 97%)
Schnelligkeit (20 m),21257,"3,59 s","0,17 s","3,92 s","3,80 s","3,72 s","3,68 s","3,62 s","3,58 s","3,54 s","3,50 s","3,46 s","3,38 s","3,29 s"
Antritt (10 m),21177,"2,08 s","0,10 s","2,29 s","2,22 s","2,17 s","2,13 s","2,11 s","2,08 s","2,06 s","2,03 s","2,00 s","1,96 s","1,89 s"
Gewandtheit,21271,"8,33 s","0,43 s","9,23 s","8,89 s","8,66 s","8,51 s","8,39 s","8,29 s","8,19 s","8,08 s","7,97 s","7,81 s","7,62 s"
Dribbling,21289,"10,99 s","0,82 s","12,81 s","12,01 s","11,57 s","11,28 s","11,06 s","10,88 s","10,70 s","10,52 s","10,33 s","10,09 s","9,78 s"
Ballkontrolle,21134,"10,09 s","1,37 s","13,07 s","11,86 s","11,06 s","10,58 s","10,20 s","9,89 s","9,60 s","9,30 s","8,98 s","8,57 s","8,07 s"
Balljonglieren,21285,"3,46 P.","3,92 P.","0,00 P.","0,00 P.","1,00 P.","1,00 P.","1,00 P.","2,00 P.","3,00 P.","4,00 P.","6,00 P.","9,00 P.","14,00 P."
Gesamtleistung,20879,"102,08 P.","1,79 P.","98,62 P.","99,79 P.","100,59 P.","101,15 P.","101,65 P.","102,09 P.","102,55 P.","103,03 P.","103,60 P.","104,35 P.","105,34 P."
,,,,,,,,,,,,,,
U14,,,,,,,,,,,,,,
,,,,C (0 – 30 %): unterdurchschnittlich (Below average),,,,B (31 – 70 %): durchschnittlich (Average),,,,A (71 – 100 %),,
Test,n,MW,STD,Min. (3%),10%,20%,30%,40%,50%,60%,70%,gut (Good) (80%),sehr gut (Very good) (90%),ausgezeichnet (Excellent) (Max. / 97%)
Schnelligkeit (20 m),14676,"3,46 s","0,17 s","3,80 s","3,68 s","3,60 s","3,55 s","3,50 s","3,46 s","3,42 s","3,38 s","3,32 s","3,25 s","3,16 s"
Antritt (10 m),14621,"2,02 s","0,11 s","2,22 s","2,16 s","2,11 s","2,07 s","2,04 s","2,02 s","1,99 s","1,97 s","1,93 s","1,89 s","1,82 s"
Gewandtheit,14708,"8,18 s","0,41 s","9,05 s","8,71 s","8,50 s","8,37 s","8,25 s","8,15 s","8,06 s","7,96 s","7,85 s","7,70 s","7,50 s"
Dribbling,14690,"10,69 s","0,76 s","12,33 s","11,61 s","11,22 s","10,97 s","10,76 s","10,59 s","10,43 s","10,27 s","10,09 s","9,85 s","9,57 s"
Ballkontrolle,14570,"9,64 s","1,27 s","12,49 s","11,20 s","10,50 s","10,09 s","9,78 s","9,47 s","9,19 s","8,91 s","8,60 s","8,23 s","7,78 s"
Balljonglieren,14732,"5,47 P.","5,14 P.","0,00 P.","1,00 P.","1,00 P.","2,00 P.","3,00 P.","4,00 P.","5,00 P.","7,00 P.","9,00 P.","13,00 P.","18,00 P."
Gesamtleistung,14411,"103,50 P.","1,74 P.","100,07 P.","101,25 P.","102,04 P.","102,63 P.","103,12 P.","103,56 P.","104,01 P.","104,48 P.","105,01 P.","105,71 P.","106,55 P."
,,,,,,,,,,,,,,
U15,,,,,,,,,,,,,,
,,,,C (0 – 30 %): unterdurchschnittlich (Below average),,,,B (31 – 70 %): durchschnittlich (Average),,,,A (71 – 100 %),,
Test,n,MW,STD,Min. (3%),10%,20%,30%,40%,50%,60%,70%,gut (Good) (80%),sehr gut (Very good) (90%),ausgezeichnet (Excellent) (Max. / 97%)
Schnelligkeit (20 m),8937,"3,33 s","0,17 s","3,67 s","3,56 s","3,47 s","3,42 s","3,37 s","3,32 s","3,28 s","3,24 s","3,19 s","3,13 s","3,05 s"
Antritt (10 m),8898,"1,96 s","0,10 s","2,16 s","2,09 s","2,04 s","2,01 s","1,98 s","1,96 s","1,93 s","1,90 s","1,87 s","1,83 s","1,78 s"
Gewandtheit,8965,"8,08 s","0,41 s","8,93 s","8,60 s","8,39 s","8,26 s","8,15 s","8,05 s","7,96 s","7,85 s","7,74 s","7,60 s","7,41 s"
Dribbling,8960,"10,51 s","0,74 s","12,12 s","11,43 s","11,02 s","10,78 s","10,58 s","10,41 s","10,25 s","10,10 s","9,93 s","9,71 s","9,40 s"
Ballkontrolle,8890,"8,26 s","1,26 s","12,10 s","10,86 s","10,10 s","9,67 s","9,35 s","9,07 s","8,80 s","8,53 s","8,26 s","7,91 s","7,48 s"
Balljonglieren,8988,"7,05 P.","5,83 P.","0,00 P.","1,00 P.","2,00 P.","3,00 P.","4,00 P.","5,00 P.","7,00 P.","9,00 P.","12,00 P.","16,00 P.","20,00 P."
Gesamtleistung,8794,"104,66 P.","1,68 P.","101,31 P.","102,45 P.","103,25 P.","103,82 P.","104,33 P.","104,79 P.","105,23 P.","105,65 P.","106,12 P.","106,74 P.","107,50 P."
`;
// --- END OF CSV DATA ---

export interface PerformanceMetric {
  value: number | null;
  unit: 's' | 'P.' | null; // 'P.' for Points
}

// Represents all statistics for a single test category (e.g., Antritt 10m) within an age group
export interface TestStats {
  n: number | null;
  mw: PerformanceMetric; // Mean Value
  std: PerformanceMetric; // Standard Deviation
  p03: PerformanceMetric; // 3rd Percentile (Min. (3%))
  p10: PerformanceMetric; // 10th Percentile
  p20: PerformanceMetric; // 20th Percentile
  p30: PerformanceMetric; // 30th Percentile
  p40: PerformanceMetric; // 40th Percentile
  p50: PerformanceMetric; // 50th Percentile (Median)
  p60: PerformanceMetric; // 60th Percentile
  p70: PerformanceMetric; // 70th Percentile
  p80: PerformanceMetric; // 80th Percentile (gut/Good)
  p90: PerformanceMetric; // 90th Percentile (sehr gut/Very good)
  p97: PerformanceMetric; // 97th Percentile (ausgezeichnet/Excellent)
}

// Represents all test data for a specific age group
export interface AgeGroupPerformanceData {
  [testName: string]: TestStats; // Key is the test name, e.g., "Antritt (10 m)"
}

// Top-level structure for all DFB performance data
export interface DfbAllPerformanceData {
  [ageGroup: string]: AgeGroupPerformanceData; // Key is age group, e.g., "U11"
}

// Helper to parse individual metric strings like "2,19 s" or "1,37 P."
function parseDfbMetricValue(valueStr: string | undefined): PerformanceMetric {
  if (!valueStr || valueStr.trim() === "") {
    return { value: null, unit: null };
  }
  const cleanedStr = valueStr.replace(/"/g, '').trim(); // Remove quotes
  const parts = cleanedStr.split(/\s+/); // Split by space to separate value and unit
  const numericPartStr = parts[0];
  let unitPart: 's' | 'P.' | null = null;

  if (parts.length > 1) {
    if (parts[1].toLowerCase() === 's') {
      unitPart = 's';
    } else if (parts[1].toLowerCase() === 'p.') {
      unitPart = 'P.';
    }
  }
  
  // Convert comma-decimal to dot-decimal and parse as float
  const numericValue = numericPartStr ? parseFloat(numericPartStr.replace(',', '.')) : null;

  return {
    value: isNaN(numericValue as any) ? null : numericValue, // Ensure NaN results in null
    unit: unitPart,
  };
}

// Parses the entire DFB CSV string into the DfbAllPerformanceData structure
function parseDfbCsv(csvString: string): DfbAllPerformanceData {
  const data: DfbAllPerformanceData = {};
  const lines = csvString.trim().split('\n');
  
  let currentAgeGroup: string | null = null;
  let headers: string[] = [];
  
  // Mapping from CSV header names to TestStats keys
  const headerToStatKeyMapping: { [key: string]: keyof TestStats } = {
    'n': 'n',
    'MW': 'mw',
    'STD': 'std',
    'Min. (3%)': 'p03',
    '10%': 'p10',
    '20%': 'p20',
    '30%': 'p30',
    '40%': 'p40',
    '50%': 'p50',
    '60%': 'p60',
    '70%': 'p70',
    'gut (Good) (80%)': 'p80',
    'sehr gut (Very good) (90%)': 'p90',
    'ausgezeichnet (Excellent) (Max. / 97%)': 'p97',
  };

  lines.forEach(line => {
    const columns = line.split(',').map(col => col.trim());

    if (columns[0].startsWith('U1')) { // Detects new age group block (e.g., "U11", "U12")
      currentAgeGroup = columns[0];
      if (currentAgeGroup) {
        data[currentAgeGroup] = {}; // Initialize data for this age group
      }
      headers = []; // Reset headers for the new age group section
      return; // Move to next line
    }

    if (!currentAgeGroup || !data[currentAgeGroup]) return; // Skip lines if no current age group context

    if (columns[0].toLowerCase() === 'test') { // This is a header line for test statistics
      headers = columns;
      return; // Move to next line
    }

    // Skip irrelevant lines (empty lines, or descriptive lines not containing actual data)
    const firstCol = columns[0];
    if (firstCol === "" || 
        firstCol.startsWith('C (0 – 30 %)') || 
        firstCol.startsWith('B (31 – 70 %)') || 
        firstCol.startsWith('A (71 – 100 %)')) {
      return;
    }
    
    const testName = firstCol; // The first column in a data row is the test name
    if (testName && headers.length > 0) {
      const testStats: Partial<TestStats> = {};
      headers.forEach((header, index) => {
        if (index === 0) return; // Skip the first column header ('Test')
        
        const statKey = headerToStatKeyMapping[header]; // Map CSV header to a TestStats key
        if (statKey) {
          if (statKey === 'n') { // 'n' is a direct number
            testStats[statKey] = columns[index] ? parseInt(columns[index].replace(/"/g, ''), 10) : null;
          } else { // Other stats are PerformanceMetric objects
            (testStats as any)[statKey] = parseDfbMetricValue(columns[index]);
          }
        }
      });
      data[currentAgeGroup][testName] = testStats as TestStats;
    }
  });

  return data;
}

// Export the parsed data structure for use in the application
export const dfbPerformanceData: DfbAllPerformanceData = parseDfbCsv(dfbCsvData);

// --- Constants for Charting ---
export const DFB_AGE_GROUPS = ["U11", "U12", "U13", "U14", "U15"] as const;
export type DfbAgeGroup = typeof DFB_AGE_GROUPS[number];

export const DFB_TEST_NAME_SPRINT_10M = "Antritt (10 m)";

export const DFB_PERCENTILE_CATEGORIES = [
  { key: "p03", numeric: 3, label: "3rd" },
  { key: "p10", numeric: 10, label: "10th" },
  { key: "p20", numeric: 20, label: "20th" },
  { key: "p30", numeric: 30, label: "30th" },
  { key: "p40", numeric: 40, label: "40th" },
  { key: "p50", numeric: 50, label: "Median" },
  { key: "p60", numeric: 60, label: "60th" },
  { key: "p70", numeric: 70, label: "70th" },
  { key: "p80", numeric: 80, label: "Good (80th)" },
  { key: "p90", numeric: 90, label: "V.Good (90th)" },
  { key: "p97", numeric: 97, label: "Exc. (97th)" },
];

/**
 * Prepares data specifically for the interactive sprint distribution chart
 */
export function getDfbSprintDataForChart(): Array<Record<string, any>> {
  return DFB_PERCENTILE_CATEGORIES.map(category => {
    const dataPoint: Record<string, any> = { categoryLabel: category.label };
    DFB_AGE_GROUPS.forEach(ageGroup => {
      const testStats = dfbPerformanceData[ageGroup]?.[DFB_TEST_NAME_SPRINT_10M];
      if (testStats && testStats[category.key as keyof TestStats]) {
        dataPoint[ageGroup] = (testStats[category.key as keyof TestStats] as PerformanceMetric).value;
      } else {
        dataPoint[ageGroup] = null;
      }
    });
    return dataPoint;
  });
}

/**
 * Extracts the Mean Values (MW) for the 10m sprint for each age group.
 */
export function getDfbSprintMeanValues(): Record<string, number | null> {
  const means: Record<string, number | null> = {};
  DFB_AGE_GROUPS.forEach(ageGroup => {
    const testStats = dfbPerformanceData[ageGroup]?.[DFB_TEST_NAME_SPRINT_10M];
    means[ageGroup] = testStats?.mw?.value ?? null;
  });
  return means;
}

/**
 * Retrieves a specific percentile value for a given age group and test name
 */
export function getDfbFormattedPercentile(
  ageGroup: DfbAgeGroup,
  testName: string,
  percentileKey: keyof TestStats
): string | null {
  const ageData = dfbPerformanceData[ageGroup];
  if (!ageData) return null;
  
  const testData = ageData[testName];
  if (!testData) return null;

  const metricData = testData[percentileKey] as PerformanceMetric | undefined;
  if (metricData && metricData.value !== null) {
    return `${metricData.value.toFixed(2).replace('.', ',')}${metricData.unit || ''}`;
  }
  return null;
} 