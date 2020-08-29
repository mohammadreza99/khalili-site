import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor() {}
  finalPrice: number;
  @Input() product;
  ngOnInit(): void {
    
    if (!this.product.discount) this.finalPrice = this.product.price;
    else this.finalPrice = (+this.product.price) * (+this.product.discount) / 100;
  }
}
