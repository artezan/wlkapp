export interface IProduct {
  longDescription: string;
  skuDisplayNameText: string;
  sku: Sku;
  specialPrice: string;
  department: string;
  isPriceStrike: boolean;
  skuId: string;
  status: string;
  basePrice: string;
  /**
   * -1 error
   */
  codeMessage?: string;
  // ticket
  imgURL?: string;
  /**
   * Importe
   */
  importPrice?: string;
  /**
   * Cantidad
   */
  quantity?: string;
  /**
   * ClaveUnidad
   */
  keyUnity?: string;
  /**
   * Descripcion
   */
  description?: string;
  /**
   * Unidad
   */
  unity?: string;
  /**
   * ValorUnitario
   */
  valueUnited?: string;
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
