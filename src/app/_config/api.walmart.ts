const api = 'https://super.walmart.com.mx/api/';
const cat =
  'wmx/assembler?assemblerContentCollection=/content/Shared/TaxonomyTree';
const getSkuSummaryDetails =
  'rest/model/atg/commerce/catalog/ProductCatalogActor/getSkuSummaryDetails?';
export const API_WALMART = {
  CATEGORY: api + cat,
  /**
   *  storeId=number&
   * upc=number&
   * skuId=number
   */
  GET_DET_SKU: api + getSkuSummaryDetails
};
