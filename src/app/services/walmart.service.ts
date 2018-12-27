import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_WALMART } from '../_config/api.walmart';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { IProduct } from '../models/product.model';
import { SubCategory, ISubcategory } from '../models/subCategory.model';
// tslint:disable-next-line:comment-format
// tslint:disable:max-line-length
@Injectable({
  providedIn: 'root'
})
export class WalmartService {
  public subcategories: ISubcategory[];
  constructor(private http: HttpClient) {}

  getSKU(upc, skuId, storeId): Observable<IProduct> {
    return this.http.get<any>(
      API_WALMART.GET_DET_SKU + `storeId=${storeId}&upc=${upc}&skuId=${skuId}`
    );
  }
  getCategories(): Observable<ICategory> {
    return this.http.get<any>(API_WALMART.CATEGORY);
  }
  getDepartment(url: string, storeId = '0000009999'): Observable<ICategory> {
    return this.http.get<any>(
      `https://super.walmart.com.mx/api/wmx/department${url}?storeId=${storeId}&eSegments=desktop|anonymous|`
    );
  }
  /**
   * De categorias tomar "navigationState": string
   */
  getFamily(url: string): Observable<SubCategory> {
    return this.http.get<any>(
      // tslint:disable-next-line:max-line-length
      `https://super.walmart.com.mx/api/wmx/family${url}&eSegments=mobile|anonymous|`
      // tslint:disable-next-line:max-line-length
      // 'https://super.walmart.com.mx/api/wmx/family/despensa/caf%C3%A9-t%C3%A9-y-sustitutos/_/N-1e0ffze?categoryType=department&categoryId=cat120070&storeId=0000009999&eSegments=mobile|anonymous|'
    );
  }
  /**
   * de childCategories tomar "navigationState": string
   * sustituir  despensa => browse
   */
  getBrowse(
    // tslint:disable-next-line:max-line-length
    navigationState: string = '/despensa/café-té-y-sustitutos/té-de-hierbas-y-especias/_/N-pmj2uf?categoryId=cat120070&categoryType=department&eSegments=mobile%7Canonymous%7C&storeId=0000009999'
  ) {
    const numStart = navigationState.indexOf(
      '/',
      navigationState.indexOf('/') + 1
    );
    const url = navigationState.substring(numStart);
    console.log(url);
    // tslint:disable-next-line:comment-format
    // https://super.walmart.com.mx/api/wmx/browse/
    // cafe-te-y-sustitutos/te-de-hierbas-y-especias/_/N-pmj2uf?Nrpp=20&offSet=0&storeId=0000009999
    return this.http.get('https://super.walmart.com.mx/api/wmx/browse' + url);
  }
}
