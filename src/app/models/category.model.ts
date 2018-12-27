export interface ICategory {
  title?: any;
  contents: Content[];
  canonicalLink: CanonicalLink;
}

interface CanonicalLink {
  navigationState: string;
  label: string;
}

interface Content {
  name: string;
  specialCategories: any[];
  categories: Category[];
  title: string;
}

export interface Category {
  formattedDisplayName: string;
  dimvalid: string;
  level: number;
  ThumbnailImageUrl?: any;
  displayName: string;
  subcategories: Subcategory[];
  categoryId: string;
  url: string;
}

interface Subcategory {
  formattedDisplayName: string;
  dimvalid?: string | string;
  level: number;
  ThumbnailImageUrl?: any;
  displayName: string;
  subcategories: any[];
  categoryId: string;
  url?: string | string;
}
