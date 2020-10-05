import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  cartProducts: { productCode: any; priceId: any }[] = [];

  storeCart(cart: { productCode: any; priceId: any }) {
    const localStorageData: any[] = this.getCart();
    if (
      localStorageData &&
      localStorageData.find((item) => item.productCode == cart.productCode)
    ) {
      return;
    } else {
      this.cartProducts.push(cart);
      localStorage.setItem('paid-products', JSON.stringify(this.cartProducts));
    }
  }

  getCart(): { productCode: any; priceId: any }[] {
    return JSON.parse(localStorage.getItem('paid-products')) || [];
  }

  deleteCart(productCode) {
    const localStorageData: any[] = this.getCart();
    const itemToDelete = localStorageData.find(
      (item) => item.productCode == productCode
    );
    const index = localStorageData.indexOf(itemToDelete);
    localStorageData.splice(index, 1);
    const finalCart = [...localStorageData];
    localStorage.setItem('paid-products', JSON.stringify(finalCart));
  }

  getShippingHours(productPrice){
    return this.get('/V1/Shipping/?productPrice='+productPrice, 'json').pipe(map((res: any) => res.data));
  }
}
