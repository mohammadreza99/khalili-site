import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
})
export class ProductsSliderComponent implements OnInit {
  @Input() products = [];
  @Input() title: string;

  @Input()config = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints:{
      '575': { slidesPerView: 2 },
      '768 ': { slidesPerView: 3 },
      '992 ': { slidesPerView: 4 ,slidesPerGroup: 3},
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
