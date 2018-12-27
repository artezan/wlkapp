export interface ISubcategory {
  ThumbnailImageUrl: any;

  categoryId: string;

  dimvalid: string;

  displayName: string;

  formattedDisplayName: string;

  level: number;

  subcategories: ISubcategory[];

  url: string;
}
export interface SubCategory {
  contents: Content[];
  '@type': string;
  name: string;
  'endeca:siteRootPath': string;
  title?: any;
  canonicalLink: SeeAllLink;
}

interface Content {
  bannerArea: any[];
  leftArea: LeftArea[];
  mainArea: MainArea[];
  '@type': string;
  breadCrumbsArea: any[];
  name: string;
  rightArea: any[];
  footerArea: any[];
  headerArea: any[];
  metaArea: any[];
}

interface MainArea {
  seeAllPageURL?: string;
  renderer: string;
  records?: Record[];
  '@type'?: string;
  name: string;
  title?: string;
  productsView?: string;
  lastRecNum?: number;
  seeAllLink?: SeeAllLink;
  finelineName?: string;
  slidesToShowTablet?: string;
  slidesToShowDesktop?: string;
  recsPerPage?: number;
  pagingActionTemplate?: any;
  sortOptions?: any;
  totalNumRecs?: number;
  finelineId?: string;
  firstRecNum?: number;
  slidesToShowMobile?: string;
  trackingTags?: string;
  tagId?: string;
  infinite?: string;
  campaignId?: string;
  module?: string;
  menuPosition?: string;
  description?: string;
  banners?: Banner[];
  autoplay?: string;
  creative?: string;
  timer?: string;
  transitionEffect?: string;
  campaignName?: string;
}

interface Banner {
  renderer: string;
  altText: string;
  '@type': string;
  campaignId: string;
  name: string;
  link: Link;
  secondaryLinks: any[];
  campaignName: string;
  assetUrl: string;
  creative: string;
}

interface Link {
  '@class': string;
  linkType: string;
  path: string;
  queryString?: any;
}

interface SeeAllLink {
  navigationState: string;
  label: string;
}

interface Record {
  attributes: Attributes;
}

interface Attributes {
  'sku.displayName': string[];
  'product.smallImage.url'?: string[];
  'sku.unit_of_measure': string[];
  'product.family': string[];
  'product.displayName': string[];
  'sku.price': string[];
  'product.department': string[];
  'product.repositoryId': string[];
  'sku.repositoryId': string[];
  'sku.weighable': string[];
  'product.displayText': string[];
  skuDisplayName: string[];
  'product.fineline': string[];
  'product.seoURL': string[];
  'sku.promoDescription'?: string[];
  'sku.promoId'?: string[];
  'product.keywords'?: string[];
  'sku.promoName'?: string[];
  'En venta'?: string[];
  'record.type.raw'?: string[];
  'record.id'?: string[];
}

interface LeftArea {
  name: string;
  navigation: Navigation[];
  '@type': string;
}

interface Navigation {
  displayName: string;
  dimensionName: string;
  refinements: Refinement[];
  multiselect?: any;
  name: string;
}

interface Refinement {
  navigationState: string;
  count: number;
  label: string;
  multiselect: boolean;
  properties: Properties;
}

interface Properties {
  'category.repositoryId': string;
  'category.catalogs.repositoryId': string;
  'category.rootCatalogId': string;
  'category.imgurl': string;
  'category.siteId': string;
  'DGraph.Spec': string;
  'category.ancestorCatalogIds': string;
  'record.id': string;
}
