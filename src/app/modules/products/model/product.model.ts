export class Product {
  id: Object;
  categoryId: number;
  brandId: number;
  commission: number;
  name: string;
  namEn: string;
  description: string;
  gainPoints: string;
  weakPoints: string;
  productInfo: ProductInfo;
  productMedia: ProductMedia;
}

export class ProductInfo {
  attributeId: number;
  value: string;
}

export class ProductMedia {
  keyMedia: string;
  isDefault: boolean;
}
export class Info {
  attributeId: number;
  value: string;
}