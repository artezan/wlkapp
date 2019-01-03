export interface IChart {
  lineChartData: {
    data: any[];
    label: string;
  }[];
  lineChartLabels: string[];
  title: string;
  subTitle?: string;
  showChart: boolean;
  type?: ChartType;
  color?: any;
  showOptions?: boolean;
}
export type ChartType = 'line' | 'bar' | 'doughnut' | 'pie' | 'horizontalBar';
