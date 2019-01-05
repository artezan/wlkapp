import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IChart, ChartType } from 'src/app/models/chart.model';
import { IProduct } from 'src/app/models/product.model';
import { ITicket } from 'src/app/models/ticket.model';
import { FbTicketsService } from 'src/app/services/fb-tickets.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormatDatesFront, ColorsChartGeneral } from 'src/app/_config/_helpers';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss'],
})
export class Tab2Component implements OnInit {
  // Immutable object, only modify with setState
  state = {
    visible: false,
    loaded: false,
  };
  //
  showChart = false;
  charts: any[] = [];
  progress: any[] = [];
  products: IProduct[];
  tickets: ITicket[] = [];
  ticketSelect = [];
  typeMetric = 'importPrice';
  month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  constructor(
    public ticketService: FbTicketsService,
    public modalController: ModalController,
  ) {}
  ngOnInit() {
    this.getTickets();
  }
  async getTickets() {
    const res = await this.ticketService.getAll();
    this.tickets = this.sortsByPropDate(res, 'date', false);
    this.ticketSelect = this.tickets;
    this.chart1(this.tickets);
    this.chart2(this.tickets);
    this.chart3(this.tickets[this.tickets.length - 1]);
    this.chart4(this.tickets);
  }
  chart1(tickets: ITicket[], num?: number) {
    let ticketsToShow: ITicket[];
    if (tickets.length > 5) {
      ticketsToShow = tickets.slice(tickets.length - 5, tickets.length);
    } else {
      ticketsToShow = tickets;
    }
    const dataX: string[] = ticketsToShow.map(t => {
      return FormatDatesFront(new Date(t.date));
    });
    const dataY: number[] = ticketsToShow.map(t => +t.realPrice);
    this.setValuesChart(
      dataX,
      dataY,
      'Pago Total',
      'Importe $',
      '',
      ColorsChartGeneral,
      num,
      'horizontalBar',
      false,
    );
  }
  chart2(tickets: ITicket[], num?: number) {
    let ticketsToShow: ITicket[];
    if (tickets.length > 10) {
      ticketsToShow = tickets.slice(tickets.length - 10, tickets.length);
    } else {
      ticketsToShow = tickets;
    }
    const dataX: string[] = ticketsToShow.map(t => {
      return FormatDatesFront(new Date(t.date));
    });
    const dataY: number[] = ticketsToShow.map(t => +t.discount);
    this.setValuesChart(
      dataX,
      dataY,
      'Descuento',
      'MXN $',
      '',
      ColorsChartGeneral,
      num,
      'horizontalBar',
      false,
    );
  }
  async chart3(ticket: ITicket, num?: number) {
    const products = await this.getEqualsSku(ticket.id);
    const dataX: string[] = products.map(p => p.description);
    const dataY: number[] = products.map(p => +p.importPrice);
    this.setValuesChart(
      dataX,
      dataY,
      '% Importe Producto',
      'MXN $',
      '',
      undefined,
      num,
      'pie',
      true,
    );
  }
  async chart4(tickets: ITicket[], num?: number, prop = 'importPrice') {
    let showChart: boolean;
    let ticketsToShow: ITicket[];
    if (tickets.length >= 2) {
      showChart = true;
      ticketsToShow = tickets.slice(tickets.length - 2, tickets.length);
    } else {
      showChart = false;
    }
    const products1 = await this.getEqualsSku(ticketsToShow[0].id);
    const products2 = await this.getEqualsSku(ticketsToShow[1].id);
    // comparar arr
    let moreArr: IProduct[], lessArr: IProduct[];
    const resArr: IProduct[] = [];
    const dataX: string[] = [];
    if (products1.length > products2.length) {
      moreArr = products1;
      lessArr = products2;
    } else {
      moreArr = products2;
      lessArr = products1;
    }
    moreArr.forEach((product, i) => {
      dataX[i] = product.description;
      const pos = lessArr.findIndex(l => l.skuId === product.skuId);
      if (pos === -1) {
        resArr[i] = undefined;
      } else {
        resArr[i] = lessArr[pos];
      }
    });
    lessArr.forEach(product => {
      const pos = moreArr.some(l => l.skuId === product.skuId);
      if (!pos) {
        resArr.push(product);
        dataX.push(product.description);
      }
    });

    const dataY1: number[] = moreArr.map(p => +p[prop]);

    const dataY2: number[] = resArr.map(p => {
      if (p !== undefined) {
        return +p[prop];
      }
    });
    // end comparar
    // mayor valor
    const max =
      Math.max(...dataY1) >= Math.max(...lessArr.map(l => +l[prop]))
        ? Math.max(...dataY1)
        : Math.max(...lessArr.map(l => +l[prop]));

    const date1 = FormatDatesFront(new Date(ticketsToShow[0].date));
    const date2 = FormatDatesFront(new Date(ticketsToShow[1].date));

    this.setValuesChartDouble(
      dataX,
      dataY1,
      dataY2,
      `Comparar Productos - ${prop === 'importPrice' ? '$ Importe' : '$ Base'}`,
      `ticket: ${date2}`,
      `ticket: ${date1}`,
      showChart,
      3,
      true,
      max.toString(),
    );
  }
  async setChart(num: number) {
    if (num === 0) {
      const modal = await this.presentModal(
        this.tickets,
        'Selecciona Tickets',
        'Selecciona Varios',
        'date',
        'checkbox',
      );
      modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.result) {
        this.chart1(data.result, 0);
      }
    }
    if (num === 1) {
      const modal = await this.presentModal(
        this.tickets,
        'Selecciona Tickets',
        'Selecciona Varios',
        'date',
        'checkbox',
      );
      modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.result) {
        this.chart2(data.result, 1);
      }
    }
    if (num === 2) {
      const modal = await this.presentModal(
        this.tickets,
        'Selecciona Ticket',
        'Selecciona Uno',
        'date',
        'list',
      );
      modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.result) {
        this.chart3(data.result, 2);
      }
    }
    if (num === 3) {
      const modal = await this.presentModal(
        this.tickets,
        'Selecciona Ticket',
        'Selecciona Dos',
        'date',
        'checkbox',
      );
      modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.result) {
        this.ticketSelect = data.result;
        this.chart4(data.result, 3, this.typeMetric);
      }
    }
  }
  private async presentModal(items: any[], title, subTitle, prop, type) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        type,
        items,
        title,
        isSearch: true,
        subTitle,
        prop,
      },
      backdropDismiss: true,
      showBackdrop: true,
    });

    return await modal;
  }
  // crea graficas
  /**
   *
   * @param labelsX valores en x
   * @param arrNum datos de y
   * @param titleChart Titulo h2
   * @param label Titulo dentro de chart
   * @param nameOfProduct subTitulo
   * @param number numero de grafica a cambiar, undefined si es nueva
   * @param type tipo  de chart
   * @param color color  de chart
   */
  setValuesChart(
    labelsX: string[],
    arrNum: number[],
    titleChart: string,
    label: string,
    subTitle: string,
    color?: any,
    number?: number,
    type?: ChartType,
    showOptions?: boolean,
  ) {
    this.showChart = true;
    if (number >= 0) {
      this.charts[number] = {
        lineChartData: [
          {
            data: arrNum,
            label: label,
          },
        ],
        lineChartLabels: labelsX,
        showChart: true,
        title: titleChart,
        subTitle: subTitle,
        type: type,
        color: color,
        showOptions,
      };
    } else {
      this.charts.push(<any>{
        lineChartData: [
          {
            data: arrNum,
            label: label,
          },
        ],
        lineChartLabels: labelsX,
        showChart: true,
        title: titleChart,
        subTitle: subTitle,
        type: type,
        color: color,
        showOptions,
      });
    }
  }
  private async getEqualsSku(ticketId: string) {
    // innmutable
    const ticket = await this.ticketService.getByIdTicket(ticketId);
    const products = ticket.products;
    let sumary: IProduct[] = [];
    for (const product of products) {
      const index = sumary.findIndex(s => s.skuId === product.skuId);
      if (index === -1) {
        sumary = [...sumary, product];
      } else {
        const totalQ = +sumary[index].quantity + +product.quantity;
        const totalI = +sumary[index].importPrice + +product.importPrice;
        sumary[index].quantity = totalQ.toFixed(2);
        sumary[index].importPrice = totalI.toFixed(2);
      }
    }
    return sumary;
  }
  private sortsByPropDate(arr: any[], prop: string, isMayor = true) {
    const compare = (a: IProduct, b: IProduct) => {
      if (isMayor) {
        if (new Date(a[prop]).getTime() > new Date(b[prop]).getTime()) {
          return -1;
        }
        if (new Date(a[prop]).getTime() < new Date(b[prop]).getTime()) {
          return 1;
        }
        return 0;
      } else {
        if (new Date(a[prop]).getTime() < new Date(b[prop]).getTime()) {
          return -1;
        }
        if (new Date(a[prop]).getTime() > new Date(b[prop]).getTime()) {
          return 1;
        }
        return 0;
      }
    };
    return arr.sort(compare);
  }
  // crea graficas
  /**
   *
   * @param labelsX valores en x
   * @param arrNum datos de y
   * @param labelsX2 valores en x2
   * @param arrNum2 datos de y2
   * @param titleChart Titulo h2
   * @param label Titulo dentro de chart
   * @param number numero de grafica a cambiar, undefined si es nueva
   */
  setValuesChartDouble(
    labelsX: string[],
    arrNum: number[],
    arrNum2: number[],
    titleChart: string,
    label: string,
    label2: string,
    showChart: boolean,
    number?: number,
    showOptions?: boolean,
    max?: string,
  ) {
    this.showChart = true;
    if (number >= 0) {
      this.charts[number] = {
        lineChartData: [
          {
            data: arrNum,
            label: label,
          },
          {
            data: arrNum2,
            label: label2,
          },
        ],
        lineChartLabels: labelsX,
        showChart,
        title: titleChart,
        type: 'horizontalBar',
        color: undefined,
        showOptions,
        showSumary: true,
        lineChartOptions: {
          borderCapStyle: 'round',
          aspectRatio: 0.5,
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
        },
      };
      this.progress[number] = { max: max };
    } else {
      this.charts.push(<any>{
        lineChartData: [
          {
            data: arrNum,
            label: label,
          },
        ],
        lineChartLabels: labelsX,
        showChart,
        title: titleChart,
        showOptions,
        showSumary: true,
        lineChartOptions: {
          borderCapStyle: 'round',
          aspectRatio: 0.5,
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
        },
      });
      this.progress[this.charts.length - 1] = { max: max };
    }
    this.state.visible = true;
  }
  logScrolling(e?) {
    const domEvent = new CustomEvent('is-scroll');
    document.dispatchEvent(domEvent);
  }
  directiveOut(event) {
    const { el, val } = event;
    const progress = (el.nativeElement.childNodes[2].value = val);
  }
}
