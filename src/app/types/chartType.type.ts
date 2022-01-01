export const CHART_TYPES = ['bar', 'line', 'scatter'] as const;
type ChartTuple = typeof CHART_TYPES; // readonly ['bar', 'line', 'scatter']
export type ChartType = ChartTuple[number];  // 'bar' | 'line' | 'scatter'