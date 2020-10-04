import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/modules/products/business/product.service';
import { OrderService } from '../../business/order.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  cartProducts = [];

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
        name: info.name,
        store: selectedPrice.storeTitle,
        keyMedia: media.keyMedia,
        warranty: selectedPrice.warrantyTitle,
        price: selectedPrice.price,
        discountPrice: selectedPrice.disCountPrice,
        color: selectedPrice.colorTitle,
        quantity: 1,
      });
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

  onDeleteProduct(index) {
    this.cartProducts.splice(index, 1);
  }
}
