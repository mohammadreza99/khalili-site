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

  getProductInfo(id, code) {
    this.get('/V1/Product/', 'json', {
      Id: id,
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductPrice(id, code) {
    this.get('/V1/ProductPrice/', 'json', {
      Id: id,
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductMedia(id, code) {
    this.get('/V1/ProductMedia/', 'json', {
      Id: id,
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductDescription(id, code) {
    this.get('/V1/ProductDescription/', 'json', {
      Id: id,
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductComments(id, code) {
    this.get('/V1/ProductComment/', 'json', {
      Id: id,
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getRelatedProducts(id, code) {
    this.get('/V1/ProductLinked/', 'json', {
      Id: id,
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getCategoryDescription(id: any) {
    this.get('/V1/CategoryDescription/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCategorySlider(id: any) {
    this.get('/V1/CategorySlider/', 'json').pipe(map((res: any) => res.data));
  }
}
