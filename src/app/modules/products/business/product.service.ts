import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor() {
    super();
  }

  getProductInfo(code) {
    return this.get('/V1/Product/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data[0]));
  }

  getProductFields(code) {
    return this.get('/V1/ProductInfo/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductPrice(code) {
    return this.get('/V1/ProductPrice/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductMedia(code) {
    return this.get('/V1/ProductMedia/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductDescription(code) {
    return this.get('/V1/ProductDescription/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data[0].description));
  }

  getProductComments(code) {
    return this.get('/V1/ProductComment/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getRelatedProducts(code) {
    return this.get('/V1/ProductLinked/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getCategoryDescription(id: any) {
    return this.get('/V1/CategoryDescription/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCategorySlider(id: any) {
    return this.get('/V1/CategorySlider/', 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
