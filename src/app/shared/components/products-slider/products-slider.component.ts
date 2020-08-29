import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
})
export class ProductsSliderComponent implements OnInit {
  @Input() products = [];
  @Input() title: string;

  config = {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 20,
  };

  constructor() {}

  ngOnInit(): void {}
}
