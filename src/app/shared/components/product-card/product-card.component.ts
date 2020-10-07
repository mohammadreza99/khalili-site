import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor() {}

  discountPersent: number;

  @Input() product;

  ngOnInit(): void {
    if (this.product.disCountPrice)
    this.discountPersent=this.product.disCountPrice*100/this.product.price;
  }
}
