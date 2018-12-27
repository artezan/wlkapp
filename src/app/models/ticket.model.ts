import { IProduct } from './product.model';

export interface ITicket {
  date?: string;
  realPrice?: number;
  prePrice?: number;
  id?: string;
  storeId?: string;
  products?: IProduct[];
}
