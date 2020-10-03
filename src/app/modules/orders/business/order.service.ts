import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  cartSubject = new BehaviorSubject(null);

  storeCart(productCode) {
    this.cartSubject.next(productCode);
  }

  getCart() {
    return this.cartSubject.value;
  }
}
