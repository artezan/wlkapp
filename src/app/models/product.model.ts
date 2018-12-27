export interface IProduct {
  longDescription: string;
  skuDisplayNameText: string;
  codeMessage: string;
  jsessionid: string;
  maxQuantity: number;
  skuType: string;
  savingsAmount: number;
  seoURL: string;
  serverConfiguration: string;
  breadcrumb: Breadcrumb;
  configurableSku: string;
  sku: Sku;
  specialPrice: string;
  department: string;
  isPriceStrike: boolean;
  skuId: string;
  status: string;
  basePrice: string;
}

interface Sku {
  unitOfMeasure: string;
  weighable: number;
  sellUom?: any;
  netContent: string;
  id: string;
  averageWeight: number;
  itemWeight?: any;
}

interface Breadcrumb {
  familyId: string;
  departmentName: string;
  familyName: string;
  departmentId: string;
  fineLineName: string;
  fineLineId: string;
}
