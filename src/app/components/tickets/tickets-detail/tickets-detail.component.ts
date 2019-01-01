import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FbTicketsService } from 'src/app/services/fb-tickets.service';
import { ITicket } from 'src/app/models/ticket.model';
import { FormatDatesFront } from 'src/app/_config/_helpers';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-tickets-detail',
  templateUrl: './tickets-detail.component.html',
  styleUrls: ['./tickets-detail.component.scss']
})
export class TicketsDetailComponent implements OnInit {
  ticket: ITicket;
  isLoad = false;
  products: IProduct[];
  realProducts: IProduct[];
  sortByPrice: number;
  inputSearch: string;
  filtersInput: string[];
  departments: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private ticketService: FbTicketsService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getTicket(params.id);
      } else {
        this.getAll();
      }
    });
  }

  ngOnInit() {}
  async getTicket(id: string) {
    this.isLoad = false;
    this.ticket = await this.ticketService.getByIdTicket(id);
    this.isLoad = true;
    this.getEqualsSku(this.ticket);
    this.departments = this.getDepartment(this.ticket);
  }
  getAll() {
    this.isLoad = false;
    this.ticketService.getAll().then(data => {
      const p = data.map(ticket => ticket.products);
      const merged = [].concat(...p);
      const getSum = (total: number, num: number) => {
        return total + num;
      };
      this.ticket = {
        products: merged,
        date: new Date().toString(),
        discount: data
          .map(ticket => +ticket.discount)
          .reduce(getSum)
          .toString(),
        realPrice: data
          .map(ticket => +ticket.realPrice)
          .reduce(getSum)
          .toString(),
        prePrice: data
          .map(ticket => +ticket.prePrice)
          .reduce(getSum)
          .toString()
      };
      this.getEqualsSku(this.ticket);
      this.departments = this.getDepartment(this.ticket);
      this.isLoad = true;
    });
  }
  getEqualsSku(ticket: ITicket) {
    const sumary: IProduct[] = [];
    ticket.products.forEach(product => {
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
    this.realProducts = sumary;
  }
  formatDates(d: string) {
    return FormatDatesFront(new Date(d));
  }
  getDepartment(ticket: ITicket) {
    const departments = [];
    ticket.products.forEach(p => {
      const index = departments.findIndex(d => d === p.department);
      if (index === -1) {
        departments.push(p.department);
      }
    });
    return departments;
  }
  // filtros

  generalFilter() {
    this.products = this.realProducts;
    if (this.sortByPrice) {
      this.sortPrice(this.sortByPrice);
    }
    if (this.inputSearch) {
      this.filterString(this.inputSearch.toLocaleLowerCase());
    }
    if (this.filtersInput) {
      console.log(this.filtersInput);
      this.products = this.products.filter(p =>
        this.filtersInput.some(f => f === p.department)
      );
    }
  }
  private filterString(str: string) {
    this.products = this.products.filter(p => {
      const index = JSON.stringify(p)
        .toLocaleLowerCase()
        .indexOf(str);
      if (index !== -1) {
        return true;
      }
    });
  }
  private sortPrice(option) {
    if (option === '1') {
      const compare = (a: IProduct, b: IProduct) => {
        if (+a.importPrice > +b.importPrice) {
          return -1;
        }
        if (+a.importPrice < +b.importPrice) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
    if (option === '2') {
      const compare = (a: IProduct, b: IProduct) => {
        if (+a.importPrice < +b.importPrice) {
          return -1;
        }
        if (+a.importPrice > +b.importPrice) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
    if (option === '3') {
      const compare = (a: IProduct, b: IProduct) => {
        if (+a.quantity > +b.quantity) {
          return -1;
        }
        if (+a.quantity < +b.quantity) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
    if (option === '4') {
      const compare = (a: IProduct, b: IProduct) => {
        if (+a.quantity < +b.quantity) {
          return -1;
        }
        if (+a.quantity > +b.quantity) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
    if (option === '5') {
      const compare = (a: IProduct, b: IProduct) => {
        if (+a.valueUnited > +b.valueUnited) {
          return -1;
        }
        if (+a.valueUnited < +b.valueUnited) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
    if (option === '6') {
      const compare = (a: IProduct, b: IProduct) => {
        if (+a.valueUnited < +b.valueUnited) {
          return -1;
        }
        if (+a.valueUnited > +b.valueUnited) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
  }
}
