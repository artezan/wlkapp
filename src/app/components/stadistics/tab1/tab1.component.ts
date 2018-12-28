import { Component, OnInit } from '@angular/core';
import { IChart } from 'src/app/models/chart.model';
import { FbTicketsService } from 'src/app/services/fb-tickets.service';
import { IProduct } from 'src/app/models/product.model';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ITicket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
})
export class Tab1Component implements OnInit {
  showChart = false;
  charts: IChart[] = [];
  products: IProduct[];
  tickets: ITicket[] = [];
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
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Importe',
      'Precio $',
    );
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Cantidad',
      'Precio $',
    );
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Costo Unitario',
      'Precio $',
    );
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Importe - Ticket',
      'Precio $',
    );
    this.getAllProducts();
  }
  getAllProducts() {
    this.ticketService.getAll().then(data => {
      this.tickets = data;

      const p = data.map(ticket => ticket.products);
      const merged: IProduct[] = [].concat(...p);
      console.log(merged);
      console.log(data);
      this.getEqualsSku(merged);
    });
  }
  getEqualsSku(products: IProduct[]) {
    const sumary: IProduct[] = [];
    products.forEach(product => {
      const index = sumary.findIndex(s => s.skuId === product.skuId);
      if (index === -1) {
        sumary.push(product);
      } else {
        sumary[index].quantity = (
          +sumary[index].quantity + +product.quantity
        ).toFixed(2);
        sumary[index].importPrice = (
          +sumary[index].importPrice + +product.importPrice
        ).toFixed(2);
      }
    });
    this.products = sumary;
  }
  async presentModal(items: any[], title, subTitle) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { type: 'list', items, title, isSearch: true, subTitle },
      backdropDismiss: true,
      showBackdrop: true,
    });

    return await modal;
  }
  setChart(num) {
    if (num === 0) {
      this.chart1();
    }
  }
  private async chart1() {
    const title = 'Buscar Producto';
    const subTitle = 'Selecciona uno';
    const items = this.products;
    const modal = await this.presentModal(items, title, subTitle);
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.result) {
      const { monthsName, months } = this.getTimeByTickets(this.tickets);
      const dataY = this.getProductByTime(
        months,
        data.result,
        this.tickets,
        'importPrice',
      );
      this.setValuesChart(monthsName, dataY, 'Importe', 'Precio $', 0);
    }
  }
  // separa tickets por fechas
  getTimeByTickets(tickets: ITicket[]) {
    const months: number[] = [];
    const monthsName: string[] = [];
    tickets.forEach(t => {
      const num = new Date(t.date).getMonth();
      const index = months.findIndex(m => m === num);
      if (index === -1) {
        months.push(num);
        monthsName.push(this.month[num]);
      }
    });
    return { monthsName, months };
  }
  // separa productos por fecha y por prop
  getProductByTime(months: number[], skuId: string, tickets: ITicket[], prop) {
    const products: number[] = [];
    const getSum = (total: number, num: number) => {
      return +total + +num;
    };
    console.log(this.products.filter(p => p.skuId === skuId));
    for (const month of months) {
      const p = tickets
        .filter(t => new Date(t.date).getMonth() === month)
        .map(p1 => p1.products);
      const merged: IProduct[] = [].concat(...p);
      const filter = merged.filter(m => m.skuId === skuId).map(p2 => +p2[prop]);
      products.push(filter.reduce(getSum));
    }
    return products;
  }
  // crea graficas
  setValuesChart(
    labelsX: string[],
    arrNum: number[],
    titleChart: string,
    label: string,
    number?: number,
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
      };
    } else {
      this.charts.push({
        lineChartData: [
          {
            data: arrNum,
            label: label,
          },
        ],
        lineChartLabels: labelsX,
        showChart: true,
        title: titleChart,
      });
    }
  }
}
