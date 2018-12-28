import { IProduct } from './product.model';

export interface ITicket {
  date?: string;
  realPrice?: string;
  prePrice?: string;
  id?: string;
  storeId?: string;
  products?: IProduct[];
  discount?: string;
}
