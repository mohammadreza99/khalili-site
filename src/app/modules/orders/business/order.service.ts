import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  cartProducts: { productCode: any; priceId: any }[] = [];

  storeCart(cart: { productCode: any; priceId: any }) {
    const localStorageData: any[] = this.getCart();
    if (localStorageData && localStorageData.find((item) => item.productCode == cart.productCode)) {
      return;
    } else {
      this.cartProducts.push(cart);
      localStorage.setItem('paid-products', JSON.stringify(this.cartProducts));
    }
  }

  getCart(): { productCode: any; priceId: any }[] {
    return JSON.parse(localStorage.getItem('paid-products')) || [];
  }
}
