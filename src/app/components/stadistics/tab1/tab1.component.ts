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
  styleUrls: ['./tab1.component.scss']
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
    'Diciembre'
  ];
  constructor(
    public ticketService: FbTicketsService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    /*    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Importe',
      'Precio $'
    );
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Cantidad',
      'Precio $'
    );
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Costo Unitario',
      'Precio $'
    );
    this.setValuesChart(
      ['enero', 'feb', 'marz'],
      [10, 20, 30],
      'Importe - Ticket',
      'Precio $'
    ); */
    this.getAllProducts();
  }
  async getAllProducts() {
    this.tickets = await this.ticketService.getAll();
    this.ticketService.getAll().then(data => {
      const p = data.map(ticket => ticket.products);
      const merged: IProduct[] = [].concat(...p);
      this.products = this.getEqualsSku(merged);
      this.setFirstCharts();
    });
  }
  setFirstCharts() {
    const { monthsName, months } = this.getTimeByTickets(this.tickets);
    // importe
    const productOfImport = this.sortsByProp('importPrice')[0];
    const skuIdOfMayor = productOfImport.skuId;
    const dataY = this.getProductByTime(
      months,
      skuIdOfMayor,
      this.tickets,
      'importPrice'
    );
    this.setValuesChart(
      monthsName,
      dataY,
      'Importe',
      'Precio $',
      productOfImport.skuDisplayNameText
    );
    // cantidad
    const productOfQuantity = this.sortsByProp('quantity')[0];
    const dataY2 = this.getProductByTime(
      months,
      productOfQuantity.skuId,
      this.tickets,
      'quantity'
    );
    this.setValuesChart(
      monthsName,
      dataY2,
      'Cantidad',
      productOfQuantity.unity,
      productOfQuantity.skuDisplayNameText
    );
    // Costo Unitario
    const productOfCost = this.sortsByProp('valueUnited')[0];
    const dataY3 = this.getAvrByTime(
      months,
      productOfCost.skuId,
      this.tickets,
      'valueUnited'
    );
    this.setValuesChart(
      monthsName,
      dataY3,
      'Costo Unitario',
      'Precio $',
      productOfCost.skuDisplayNameText
    );
    // Importe - Ticket
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
    return sumary;
  }
  async presentModal(items: any[], title, subTitle) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        type: 'list',
        items,
        title,
        isSearch: true,
        subTitle,
        prop: 'skuDisplayNameText'
      },
      backdropDismiss: true,
      showBackdrop: true
    });

    return await modal;
  }
  setChart(num: number) {
    if (num === 0) {
      this.chart1();
    }
    if (num === 1) {
      this.chart2();
    }
    if (num === 2) {
      this.chart3();
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
        data.result.skuId,
        this.tickets,
        'importPrice'
      );
      this.setValuesChart(
        monthsName,
        dataY,
        'Importe',
        'Precio $',
        data.result.description,
        0
      );
    }
  }
  private async chart2() {
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
        data.result.skuId,
        this.tickets,
        'quantity'
      );
      this.setValuesChart(
        monthsName,
        dataY,
        'Cantidad',
        data.result.unity,
        data.result.skuDisplayNameText,
        1
      );
    }
  }
  private async chart3() {
    const title = 'Buscar Producto';
    const subTitle = 'Selecciona uno';
    const items = this.products;
    const modal = await this.presentModal(items, title, subTitle);
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.result) {
      const { monthsName, months } = this.getTimeByTickets(this.tickets);
      const dataY = this.getAvrByTime(
        months,
        data.result.skuId,
        this.tickets,
        'valueUnited'
      );
      this.setValuesChart(
        monthsName,
        dataY,
        'Costo Unitario',
        'Precio $',
        data.result.skuDisplayNameText,
        2
      );
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
  // suma el prop del producto y lo separa en fecha
  getProductByTime(months: number[], skuId: string, tickets: ITicket[], prop) {
    const products: number[] = [];
    const getSum = (total: number, num: number) => {
      return +total + +num;
    };
    for (const month of months) {
      const p = tickets
        .filter(t => new Date(t.date).getMonth() === month)
        .map(p1 => p1.products);
      const merged: IProduct[] = [].concat(...p);
      const filter = merged.filter(m => m.skuId === skuId).map(p2 => +p2[prop]);
      if (filter.length === 0) {
        products.push(0);
      } else {
        products.push(+filter.reduce(getSum).toFixed(2));
      }
    }
    return products;
  }
  // promedio de el prop del producto y lo separa en fecha
  getAvrByTime(months: number[], skuId: string, tickets: ITicket[], prop) {
    const products: number[] = [];
    const getSum = (total: number, num: number) => {
      return +total + +num;
    };
    for (const month of months) {
      const p = tickets
        .filter(t => new Date(t.date).getMonth() === +month)
        .map(p1 => p1.products);
      const merged: IProduct[] = [].concat(...p);
      const filter = merged.filter(m => m.skuId === skuId).map(p2 => +p2[prop]);
      if (filter.length === 0) {
        products.push(0);
      } else {
        products.push(+(filter.reduce(getSum) / filter.length).toFixed(2));
      }
    }
    return products;
  }

  // crea graficas
  /**
   *
   * @param labelsX valores en x
   * @param arrNum datos de y
   * @param titleChart Titulo h2
   * @param label Titulo dentro de chart
   * @param nameOfProduct Nombre del producto
   * @param number numero de grafica a cambiar, undefined si es nueva
   */
  setValuesChart(
    labelsX: string[],
    arrNum: number[],
    titleChart: string,
    label: string,
    nameOfProduct: string,
    number?: number
  ) {
    this.showChart = true;
    if (number >= 0) {
      this.charts[number] = {
        lineChartData: [
          {
            data: arrNum,
            label: label
          }
        ],
        lineChartLabels: labelsX,
        showChart: true,
        title: titleChart,
        subTitle: nameOfProduct
      };
    } else {
      this.charts.push({
        lineChartData: [
          {
            data: arrNum,
            label: label
          }
        ],
        lineChartLabels: labelsX,
        showChart: true,
        title: titleChart,
        subTitle: nameOfProduct
      });
    }
  }
  // _helpers
  // suma de productos por Sku y prop
  private async getSumBySku(prop: string, skeId: string) {
    const getSum = (total: number, num: number) => {
      return +total + +num;
    };
    const tickets = await this.ticketService.getAll();
    const p = tickets.map(p1 => p1.products);
    const merged: IProduct[] = [].concat(...p);
  }
  private sortsByProp(prop: string, isMayor = true): IProduct[] {
    const compare = (a: IProduct, b: IProduct) => {
      if (isMayor) {
        if (+a[prop] > +b[prop]) {
          return -1;
        }
        if (+a[prop] < +b[prop]) {
          return 1;
        }
        return 0;
      } else {
        if (+a[prop] < +b[prop]) {
          return -1;
        }
        if (+a[prop] > +b[prop]) {
          return 1;
        }
        return 0;
      }
    };
    return this.products.sort(compare);
  }
}
