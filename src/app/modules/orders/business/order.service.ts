import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  // storeOrderInLocalStorage() {
  //   const localStorageData: any[] = this.getCart();
  //   if (
  //     localStorageData &&
  //     localStorageData.find(
  //       (item) => item.productCode == this.cartSubject.value.productCode
  //     )
  //   ) {
  //     return;
  //   } else {
  //     this.cartProducts.push({
  //       productCode: this.cartSubject.value.productCode,
  //       priceId: this.cartSubject.value.priceId,
  //       qty: 1,
  //     });
  //     localStorage.setItem('paid-products', JSON.stringify(this.cartProducts));
  //   }
  // }

  cartSubject = new BehaviorSubject(null);

  cartProducts: any[] = [];

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

  getCart() {
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

  getShippingHours(productPrice) {
    return this.get('/V1/Shipping/?productPrice=' + productPrice, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  submitOrder(orderObj) {
    return this.post('/V1/OrderInsert/', orderObj, 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
