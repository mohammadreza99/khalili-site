export class ProductMedia {
  keyMedia: string;
  isDefault: boolean;
}

export class Info {
  attributeId: number;
  value: string;
}

export class ProductInfo {
  brandId: number;
  brandTitle: string;
  categoryId: number;
  categoryTitle: string;
  commentCount: number;
  descriptionSeo: string;
  gainPoints: string;
  id: string;
  name: string;
  nameEn: string;
  productCode: string;
  weakPoints: string;
}

export class ProductPrice {
  colorId: number;
  colorTitle: string;
  disCountPrice: number;
  id: number;
  insuranceId: number;
  insuranceTitle: string;
  isDefault: boolean;
  operation: number;
  price: number;
  qty: number;
  maxQty: number;
  storeTitle: string;
  warrantyId: number;
  warrantyTitle: string;
}
