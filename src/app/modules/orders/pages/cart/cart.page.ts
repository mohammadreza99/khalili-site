import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor() {}

  productCount = 1;

  ngOnInit(): void {}

  plusClick() {
    this.productCount++;
  }

  minusClick() {
    if (this.productCount == 1) {
      return;
    }
    this.productCount--;
  }

  onDeleteProduct() {}
}
