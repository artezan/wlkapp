export function FormatDatesFront(dateInput: Date): string {
  const day: string = new Date(dateInput).getDate().toString();
  const month: string = (new Date(dateInput).getMonth() + 1).toString();
  const year: string = new Date(dateInput).getFullYear().toString();
  const date = day + '/' + month + '/' + year;
  return date;
}
export const ColorsChartGeneral: Array<any> = [
  {
    backgroundColor: 'rgba(66,165,245, .5)',
    borderColor: 'rgba(66,165,245, 1)',
    borderCapStyle: 'round',
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: '#2196F3',
    pointBackgroundColor: '#2196F3',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(66,165,245, .5)',
    pointHoverBorderColor: 'rgba(66,165,245,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHitRadius: 10,
  },
];
