import {
  ProductInfo,
  ProductMedia,
  ProductPrice,
} from '@app/modules/products/model/product.model';

export class CartProduct {
  price: ProductPrice;
  info: ProductInfo;
  keyMedia: ProductMedia;
  quantity: number;
}

export class ShippingHour {
  date: string;
  info: { countUse: number; shippingHourId: number; title: string }[];
}
