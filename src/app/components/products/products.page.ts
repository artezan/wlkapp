import { Component, OnInit } from '@angular/core';
import { FbTicketsService } from 'src/app/services/fb-tickets.service';
import { WalmartService } from 'src/app/services/walmart.service';
import { ICategory, Category } from 'src/app/models/category.model';
import { ISubcategory } from 'src/app/models/subCategory.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {
  categories: Category[];
  isLoad: boolean;
  constructor(
    private ticketService: FbTicketsService,
    private walmartService: WalmartService
  ) {}

  ngOnInit() {
    this.ticketService.getAll().then(data => console.log('all', data));

    this.getCategories();
  }
  getCategories() {
    this.isLoad = false;
    this.walmartService.getCategories().subscribe(data => {
      console.log('cat', data.contents[0].categories);
      this.categories = data.contents[0].categories;
      this.isLoad = true;
    });
  }
  getChild(sub: ISubcategory[]) {
    this.walmartService.subcategories = sub;
  }
}
