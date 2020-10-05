import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/business/auth.service';
import { ProductService } from '@app/modules/products/business/product.service';
import { UserService } from '@app/modules/users/business/user.service';
import { PrimeConfirmService } from '@app/shared/components/@prime/prime-service/prime-confirm.service';
import { OrderService } from '../../business/order.service';

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

  cartProducts = [];
  actualPriceSum = 0;
  disCountSum = 0;
  finalPaySum = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  async loadCart() {
    const cart = this.orderService.getCart();
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
      const selectedPrice = availabelPrices.find(
        (item) => cartItem.priceId == item.id
      );

      const media = availableMedia.find((m) => m.isDefault);
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
  }

  calclulateFinalSum() {
    this.finalPaySum = this.actualPriceSum - this.disCountSum;
  }

  plusClick(item) {
    item.quantity++;
    this.actualPriceSum += item.disCountPrice ? item.disCountPrice : item.price;
    this.disCountSum += item.price - item.disCountPrice;
    this.calclulateFinalSum();
  }

  minusClick(item) {
    if (item.quantity == 1) {
      return;
    }
    item.quantity--;
    this.actualPriceSum -= item.disCountPrice ? item.disCountPrice : item.price;
    this.disCountSum -= item.price - item.disCountPrice;
    this.calclulateFinalSum();
  }

  onDeleteProduct(name, index, productCode) {
    this.dialogService
      .show(
        { message: 'آیا مایل به حذف این کالا هستید؟', header: name },
        this.vcRef
      )
      .then(() => {
        this.orderService.deleteCart(productCode);
        this.cartProducts.splice(index, 1);
        this.loadCart();
      });
  }

  goNextStep() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/orders/shipping']);
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { return: '/orders/shipping' },
      });
    }
  }
}
