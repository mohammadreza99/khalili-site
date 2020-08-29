import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-wrapper',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.scss'],
})
export class ProductWrapperComponent implements OnInit {
  constructor() {}
  config = {
    slidesPerView: 5,
    slidesPerGroup: 4,
    spaceBetween: 20,
  };
  @Input() products = [];
  @Input() title: string;
  ngOnInit(): void {}
}
