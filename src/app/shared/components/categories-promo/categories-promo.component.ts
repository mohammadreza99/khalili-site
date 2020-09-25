import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'categories-promo',
  templateUrl: './categories-promo.component.html',
  styleUrls: ['./categories-promo.component.scss'],
})
export class CategoriesPromoComponent implements OnInit {
  @Input() promo;
  constructor() {}

  ngOnInit(): void {}
}
