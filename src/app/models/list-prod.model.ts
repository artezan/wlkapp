export interface ListProd {
  contents: Content[];
  '@type': string;
  name: string;
  'endeca:siteRootPath': string;
  title: string;
  canonicalLink: Ancestor;
}

interface Content {
  bannerArea: any[];
  leftArea: LeftArea[];
  mainArea: MainArea[];
  '@type': string;
  breadCrumbsArea: BreadCrumbsArea[];
  name: string;
  rightArea: any[];
  footerArea: any[];
  headerArea: any[];
  metaArea: any[];
}

interface BreadCrumbsArea {
  rangeFilterCrumbs: any[];
  searchCrumbs: any[];
  removeAllAction: PagingActionTemplate;
  refinementCrumbs: RefinementCrumb[];
}

interface RefinementCrumb {
  removeAction: PagingActionTemplate;
  displayName: string;
  label: string;
  dimensionName: string;
  ancestors: Ancestor[];
  properties: Properties2;
}

interface Properties2 {
  'category.repositoryId': string;
  'category.catalogs.repositoryId': string;
  'category.rootCatalogId': string;
  'category.imgurl': string;
  'category.siteId': string;
  'DGraph.Spec': string;
  'category.ancestorCatalogIds': string;
  'record.id': string;
}

interface Ancestor {
  navigationState: string;
  label: string;
}

interface MainArea {
  lastRecNum?: number;
  seeAllLink?: any;
  renderer: string;
  finelineName?: any;
  records?: Record[];
  title?: string;
  slidesToShowTablet?: string;
  slidesToShowDesktop?: string;
  recsPerPage?: number;
  pagingActionTemplate?: PagingActionTemplate;
  sortOptions?: SortOption[];
  totalNumRecs?: number;
  name: string;
  finelineId?: any;
  firstRecNum?: number;
  slidesToShowMobile?: string;
  trackingTags?: string;
  tagId?: string;
  '@type'?: string;
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
  linkType?: any;
  path?: any;
  queryString?: any;
}

interface SortOption {
  navigationState: string;
  label: string;
  selected: boolean;
}

interface PagingActionTemplate {
  navigationState: string;
  label?: any;
}

interface Record {
  attributes: Attributes;
}

interface Attributes {
  'sku.displayName': string[];
  'product.smallImage.url': string[];
  'sku.unit_of_measure': string[];
  'product.family': string[];
  'product.displayName': string[];
  'product.keywords'?: string[];
  'record.type.raw': string[];
  'sku.price': string[];
  'product.department': string[];
  'record.id': string[];
  'product.repositoryId': string[];
  'sku.repositoryId': string[];
  'sku.weighable': string[];
  'product.displayText': string[];
  skuDisplayName: string[];
  'product.fineline': string[];
  'product.seoURL': string[];
  'sku.promoDescription'?: string[];
  'sku.promoId'?: string[];
  'sku.promoName'?: string[];
  'En venta'?: string[];
}

interface LeftArea {
  name: string;
  navigation: Navigation[];
  '@type': string;
}

interface Navigation {
  displayName?: string;
  dimensionName?: string;
  refinements?: Refinement[];
  multiselect?: any;
  name: string;
  sliderMax?: string;
  sliderMin?: string;
  priceProperty?: string;
  '@type'?: string;
  boundaries?: Boundary[];
  enabled?: boolean;
}

interface Boundary {
  name: string;
  value: string;
  '@type': string;
}

interface Refinement {
  navigationState: string;
  count: number;
  label: string;
  multiselect: boolean;
  properties: Properties;
}

interface Properties {
  'DGraph.Spec'?: string;
  selected?: boolean;
}
