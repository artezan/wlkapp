import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-general-chart',
  templateUrl: './general-chart.component.html',
  styleUrls: ['./general-chart.component.scss'],
})
export class GeneralChartComponent implements OnInit, OnChanges {
  @Output() _helperRefresh = new EventEmitter<any>();
  @Input() showChart = false;
  @Input()
  lineChartData: {
    data: number[];
    label: string;
  }[] = [];
  @Input() lineChartLabels = [''];
  @Input()
  lineChartColors: Array<any> = [
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
  @Input() lineChartLegend = true;
  @Input() lineChartType: 'line' | 'bar' | 'doughnut' | 'pie' = 'line';
  @Input()
  lineChartOptions: any = {
    borderCapStyle: 'round',
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
    },
  };
  realData;
  realLabel;
  isOneData: boolean;
  @Input() isOneDataSvc;
  // RL

  @Input() refreshData: { arrXY: any[]; arrStr: any[] };
  estimateY: Array<{ x: number; y: number }>;
  // oculatar resumen

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lineChartData) {
      if (changes.lineChartData.currentValue) {
        this.lineChartData = changes.lineChartData.currentValue;
        this.realData = this.lineChartData;
      }
    }
    if (changes.lineChartLabels) {
      if (changes.lineChartLabels.currentValue) {
        this.lineChartLabels = changes.lineChartLabels.currentValue;
        this.realLabel = this.lineChartLabels;
      }
    }
    if (this.lineChartData.length && this.lineChartData[0].data.length === 1) {
      this.isOneData = true;
    } else {
      this.isOneData = false;
    }
    if (changes.refreshData) {
      if (changes.refreshData.currentValue) {
        this.refreshData = changes.refreshData.currentValue;
        this.remakeChart2(this.refreshData.arrXY, this.refreshData.arrStr);
      }
    }
  }
  private remakeChart2(arrXY: any[], arrStr: any[]): void {
    const clone = JSON.parse(JSON.stringify(this.lineChartData));
    let clone2 = JSON.parse(JSON.stringify(this.lineChartLabels));
    clone[0].data = arrXY;
    clone2 = arrStr;
    this.lineChartData = clone;
    setTimeout(() => (this.lineChartLabels = clone2), 0);
  }
}
