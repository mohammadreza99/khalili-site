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
    const code = this.orderService.getCart();
    const info = await this.productService.getProductInfo(code).toPromise();
    const price = await this.productService.getProductPrice(code).toPromise();
    const media = await this.productService.getProductMedia(code).toPromise();
    this.cartProducts.push({
      name: info.name,
      store: '',
      warranty: '',
      price: 0,
      discountPrice: 0,
      color: '',
      quantity: 1,
    });
    localStorage.setItem(
      'paid-products',
      `{data: [{
      id:${info.id},
      code:${code},
      name: ${name},
      originalPrice: ,
      price: ,
      quantity: 1 ,
    }]}`
    );
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
