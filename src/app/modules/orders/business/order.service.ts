import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartProduct } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  cartCountSubject = new BehaviorSubject<number>(
    (JSON.parse(localStorage.getItem('paid-products')) as any[])?.length || 0
  );

  getSavedOrder() {
    return this.get('/V1/OrderSaved/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  storeCart(cart: { productCode: any; priceId: any }) {
    const localStorageData: any[] = this.getCart();
    if (
      localStorageData &&
      localStorageData.find((item) => item.productCode == cart.productCode)
    ) {
      return;
    } else {
      localStorageData.push(cart);
      localStorage.setItem('paid-products', JSON.stringify(localStorageData));
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

  getCartCount() {
    return this.cartCountSubject.asObservable();
  }

  updateCartCount(count) {
    this.cartCountSubject.next(count);
  }

  storeSubmittedCart(cart: CartProduct[]) {
    localStorage.setItem('submitted-products', JSON.stringify(cart));
  }

  getSubmittedCart() {
    return JSON.parse(localStorage.getItem('submitted-products'));
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
