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
  @Input() typeSort = 'all';
  @Input() numSort: number;
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
  lineChartOptions: any; /* = {
    borderCapStyle: 'round',
    aspectRatio: 1,
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
  }; */
  realData;
  realLabel;
  isOneData: boolean;
  @Input() isOneDataSvc;
  // RL

  @Input() refreshData: { arrXY: any[]; arrStr: any[] };
  estimateY: Array<{ x: number; y: number }>;
  // ocultar op resumen
  @Input() showOptions = false;

  constructor() {}

  ngOnInit() {
    this.changeChart();
  }
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
  changeChart(): void {
    if (this.lineChartType === 'doughnut' || this.lineChartType === 'pie') {
      this.lineChartLegend = false;
      this.lineChartOptions = {
        borderCapStyle: 'round',
        aspectRatio: 1,

        responsive: true,
      };
    } else {
      this.lineChartLegend = true;
      if (this.lineChartOptions === undefined) {
        this.lineChartOptions = {
          borderCapStyle: 'round',
          aspectRatio: 1,

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
      }
    }
  }

  filterByTop(): void {
    const arrToSort = [];
    const arrNum: number[] = [];
    const arrStr = [];
    // tslint:disable:prefer-const
    let clone = JSON.parse(JSON.stringify(this.realData));
    let clone2 = JSON.parse(JSON.stringify(this.realLabel));
    this.lineChartData = clone;
    this.lineChartLabels = clone2;

    if (this.typeSort === 'all') {
      if (this.numSort) {
        const arrTemp = this.lineChartLabels.slice(0, this.numSort);
        const arrTemp2 = this.lineChartData[0].data.slice(0, this.numSort);
        this.remakeChart(arrTemp2, arrTemp);
      } else if (this.numSort === null) {
        this.remakeChart(this.realData[0].data, this.realLabel);
      }
    } else {
      this.lineChartData[0].data.forEach((row, i) => {
        arrToSort.push([this.lineChartLabels[i], row]);
      });
      if (this.typeSort === 'top') {
        arrToSort.sort((a, b) => {
          return b[1] - a[1];
        });
        if (this.numSort !== null) {
          arrToSort.slice(0, this.numSort).forEach((item, index) => {
            arrNum.push(item[1]);
            arrStr.push(item[0]);
          });
        } else {
          arrToSort.forEach((item, index) => {
            arrNum.push(item[1]);
            arrStr.push(item[0]);
          });
        }
      } else if (this.typeSort === 'bottom') {
        arrToSort.sort((a, b) => {
          return a[1] - b[1];
        });
        if (this.numSort !== null) {
          arrToSort.slice(0, this.numSort).forEach((item, index) => {
            arrNum.push(item[1]);
            arrStr.push(item[0]);
          });
        } else {
          arrToSort.forEach((item, index) => {
            arrNum.push(item[1]);
            arrStr.push(item[0]);
          });
        }
      }
      this.remakeChart(arrNum, arrStr);
    }
  }
  private remakeChart(arrNum: number[], arrStr: any[]): void {
    let clone = JSON.parse(JSON.stringify(this.lineChartData));
    let clone2 = JSON.parse(JSON.stringify(this.lineChartLabels));
    clone[0].data = arrNum;
    clone2 = arrStr;
    this.lineChartData = clone;
    setTimeout(() => (this.lineChartLabels = clone2), 0);
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
