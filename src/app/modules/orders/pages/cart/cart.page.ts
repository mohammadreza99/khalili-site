import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '@app/modules/products/business/product.service';
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
    private vcRef: ViewContainerRef
  ) {}

  cartProducts = [];
  actualPriceSum = 0;
  discountSum = 0;
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
        discountPrice: selectedPrice.disCountPrice,
        color: selectedPrice.colorTitle,
        quantity: 1,
      });

      this.actualPriceSum += selectedPrice.price;
      this.discountSum += selectedPrice.disCountPrice;
    }
    for (const item of this.cartProducts) {
      this.finalPaySum += item.discountPrice;
    }
  }

  plusClick(item) {
    item.quantity++;
  }

  minusClick(item) {
    if (item.quantity == 1) {
      return;
    }
    item.quantity--;
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
}
