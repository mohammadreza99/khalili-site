import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';
import { UserService } from '@app/modules/users/business/user.service';
import { AddressModel } from '@app/modules/users/model/user.model';
import { OrderService } from '../../business/order.service';
import { CartProduct, ShippingHour } from '../../model/order.model';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  cartProducts: CartProduct[] = [];
  actualPriceSum: number = 0;
  disCountSum: number = 0;
  finalPaySum: number = 0;
  availableShippingHours: ShippingHour[] = [];
  selectedShip: any = { ShippingHourId: null, DeliveryDate: null };
  showAddresses: boolean = false;
  availableAddresses: AddressModel[] = [];
  selectedAddress: AddressModel = {};
  selectedProducts: { ProductPriceId: number; Qty: number }[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cartProducts = this.orderService.getSubmittedCart();
    this.calclulateFinalSum();
    this.loadData();
  }

  async loadData() {
    const priceIds = [];
    for (const cartItem of this.cartProducts) {
      priceIds.push(
        cartItem.price.id +
          (this.cartProducts.indexOf(cartItem) == this.cartProducts.length - 1
            ? ''
            : ',')
      );
      this.availableShippingHours = await this.orderService
        .getShippingHours(priceIds)
        .toPromise();
      this.availableAddresses = await this.userService
        .getAddresses()
        .toPromise();
      this.selectedAddress = this.availableAddresses[0];
      this.selectedShip.DeliveryDate = this.availableShippingHours[0].date;
      this.selectedProducts.push({
        ProductPriceId: cartItem.price.id,
        Qty: cartItem.quantity,
      });
    }
  }

  calclulateFinalSum() {
    this.actualPriceSum = 0;
    this.disCountSum = 0;
    this.finalPaySum = 0;
    for (const item of this.cartProducts) {
      this.actualPriceSum += item.price.price * item.quantity;
      if (item.price.disCountPrice)
        this.disCountSum +=
          (item.price.price - item.price.disCountPrice) * item.quantity;
    }
    this.finalPaySum = this.actualPriceSum - this.disCountSum;
  }

  onShippingHourChange(event) {
    this.selectedShip.ShippingHourId = null;
    this.selectedShip.DeliveryDate = this.availableShippingHours[
      event.index
    ].date;
  }

  goNextStep() {
    const finalCart = {
      UserAddressId: this.selectedAddress.id,
      DeliveryDate: moment(this.selectedShip.DeliveryDate, 'jYYYY/jMM/jDD')
        .toDate()
        .toISOString(),
      ShippingHourId: this.selectedShip.ShippingHourId,
      Product: this.selectedProducts,
    };
    this.orderService.submitOrder(finalCart).subscribe((res) => {
      window.open(res.link, '_self');
    });
  }
}
