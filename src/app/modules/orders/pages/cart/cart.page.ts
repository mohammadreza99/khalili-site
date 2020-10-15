import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/business/auth.service';
import { ProductService } from '@app/modules/products/business/product.service';
import {
  ProductInfo,
  ProductPrice,
} from '@app/modules/products/model/product.model';
import { PrimeConfirmService } from '@app/shared/components/@prime/prime-service/prime-confirm.service';
import { OrderService } from '../../business/order.service';
import { CartProduct } from '../../model/order.model';

@Component({
  selector: 'cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private dialogService: PrimeConfirmService,
    private vcRef: ViewContainerRef,
    private router: Router,
    private authService: AuthService
  ) {}

  cartProducts: CartProduct[] = [];
  actualPriceSum = 0;
  disCountSum = 0;
  finalPaySum = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  async loadCart() {
    const cart = this.orderService.getCart();
    this.orderService.updateCartCount(cart.length);
    for (const cartItem of cart) {
      const info: ProductInfo = await this.productService
        .getProductInfo(cartItem.productCode)
        .toPromise();
      const availableMedia = await this.productService
        .getProductMedia(cartItem.productCode)
        .toPromise();
      const availabelPrices: ProductPrice[] = await this.productService
        .getProductPrice(cartItem.productCode)
        .toPromise();
      const selectedPrice: ProductPrice = availabelPrices.find(
        (item) => cartItem.priceId == item.id
      );
      const media = availableMedia.find((m) => m.isDefault);
      this.cartProducts.push({
        price: selectedPrice,
        info: info,
        keyMedia: media.keyMedia,
        quantity: 1,
      });
    }
    this.calclulateFinalSum();
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

  plusClick(item) {
    this.cartProducts.find((i) => i == item).quantity++;
    this.calclulateFinalSum();
  }

  minusClick(item) {
    if (item.quantity == 1) {
      return;
    }
    this.cartProducts.find((i) => i == item).quantity--;
    this.calclulateFinalSum();
  }

  onDeleteProduct(name, index, productCode) {
    this.dialogService
      .show(
        { message: 'آیا مایل به حذف این کالا هستید؟', header: name },
        this.vcRef
      )
      .then(async (res) => {
        this.orderService.deleteCart(productCode);
        this.cartProducts.splice(index, 1);
        this.orderService.updateCartCount(this.cartProducts.length);
        await this.loadCart();
        this.calclulateFinalSum();
      });
  }

  goNextStep() {
    this.orderService.storeSubmittedCart(this.cartProducts);
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/orders/shipping']);
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { return: '/orders/shipping' },
      });
    }
  }
}
