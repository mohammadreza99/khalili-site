import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '@app/modules/products/business/product.service';
import { UserService } from '@app/modules/users/business/user.service';
import { OrderService } from '../../business/order.service';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  cartProducts = [];
  actualPriceSum = 0;
  disCountSum = 0;
  finalPaySum = 0;
  shippingHours = [];
  selectedShip = { ShippingHourId: null, DeliveryDate: null };
  showAddresses = false;
  availableAddresses = [];
  selectedAddress = { address: null, id: null };
  finalCart: {
    UserAddressId: number;
    DiscountId?: number;
    DeliveryDate: string;
    ShippingHourId: number;
    Product: { ProductPriceId: number; Qty: number }[];
  };

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  async loadCart() {
    const cart = this.orderService.getCart();
    const priceIds = [];
    for (const cartItem of cart) {
      const info = await this.productService
        .getProductInfo(cartItem.productCode)
        .toPromise();
      const availableMedia = await this.productService
        .getProductMedia(cartItem.productCode)
        .toPromise();
      const availabelPrices = await this.productService
        .getProductPrice(cartItem.productCode)
        .toPromise();
      this.availableAddresses = await this.userService
        .getAddresses()
        .toPromise();
      this.selectedAddress = this.availableAddresses[0];
      const selectedPrice = availabelPrices.find(
        (item) => cartItem.priceId == item.id
      );
      const media = availableMedia.find((m) => m.isDefault);
      priceIds.push(
        cartItem.priceId +
          (cart.indexOf(cartItem) == cart.length - 1 ? '' : ',')
      );

      this.cartProducts.push({
        productCode: info.productCode,
        name: info.name,
        store: selectedPrice.storeTitle,
        keyMedia: media.keyMedia,
        warranty: selectedPrice.warrantyTitle,
        price: selectedPrice.price,
        disCountPrice: selectedPrice.disCountPrice,
        color: selectedPrice.colorTitle,
        quantity: 1,
      });
    }
    for (const item of this.cartProducts) {
      this.actualPriceSum += item.price;
      this.disCountSum += item.price - item.disCountPrice;
    }
    this.calclulateFinalSum();
    this.shippingHours = await this.orderService
      .getShippingHours(priceIds)
      .toPromise();
  }

  calclulateFinalSum() {
    this.finalPaySum = this.actualPriceSum - this.disCountSum;
  }

  onShippingHourChange(event) {
    this.selectedShip.DeliveryDate = this.shippingHours[event.index].date;
  }

  goNextStep() {
    const finalCart = {
      UserAddressId: this.selectedAddress.id,
      // DiscountId?: number;
      DeliveryDate: this.selectedShip.DeliveryDate,
      ShippingHourId: this.selectedShip.ShippingHourId,
      Product: [{ ProductPriceId: 13, Qty: 2 }],
    };
    console.log(finalCart);

    this.orderService.submitOrder(finalCart).subscribe(console.log);
  }
}
