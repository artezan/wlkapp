export interface IChart {
  lineChartData: {
    data: any[];
    label: string;
  }[];
  lineChartLabels: string[];
  title: string;
  showChart: boolean;
}
