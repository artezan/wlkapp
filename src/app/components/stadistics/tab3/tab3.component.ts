import { Component, OnInit } from '@angular/core';
import { FbTicketsService } from 'src/app/services/fb-tickets.service';
import { ITicket } from 'src/app/models/ticket.model';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
})
export class Tab3Component implements OnInit {
  isLoad;
  months = [
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
  selectMont;
  ticket: ITicket;
  products: IProduct[];
  numOftickets: number;
  totalImport: string;
  totalDiscont: string;
  constructor(private ticketService: FbTicketsService) {}

  ngOnInit() {
    const currentDate = new Date().getMonth();
    this.selectMont = 11;
    this.init(11);
  }

  async init(month: number) {
    const getSum = (total: number, num: number) => {
      return total + num;
    };
    this.isLoad = false;
    const data = await this.getTicketByMonth(month);
    this.numOftickets = data.length;
    this.totalImport = data
      .map(d => +d.realPrice)
      .reduce(getSum)
      .toFixed(2);
    this.totalDiscont = data
      .map(d => +d.discount)
      .reduce(getSum)
      .toFixed(2);
    const p = data.map(ticket => ticket.products);
    const merged: IProduct[] = [].concat(...p);

    this.ticket = {
      products: merged,
      date: new Date().toString(),
      discount: data
        .map(ticket => +ticket.discount)
        .reduce(getSum)
        .toFixed(3),
      realPrice: data
        .map(ticket => +ticket.realPrice)
        .reduce(getSum)
        .toFixed(3),
      prePrice: data
        .map(ticket => +ticket.prePrice)
        .reduce(getSum)
        .toFixed(3),
    };
    this.products = this.getEqualsSku(merged);
    this.sortsByProp('importPrice');
    console.log(this.ticket);
    console.log(this.products);
    this.isLoad = true;
  }
  async getTicketByMonth(month: number): Promise<ITicket[]> {
    const tickets = await this.ticketService.getAll();

    return tickets.filter(ticket => new Date(ticket.date).getMonth() === month);
  }
  getEqualsSku(products: IProduct[]) {
    const sumary: IProduct[] = [];
    products.forEach(product => {
      product.quantity = Number(product.quantity).toFixed(2);
      product.importPrice = Number(product.importPrice).toFixed(2);
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
  changeMonth(num: number) {
    console.log(num);
    this.init(+num);
  }
  private sortsByProp(prop: string, isMayor = true) {
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
    this.products.sort(compare);
  }
}
