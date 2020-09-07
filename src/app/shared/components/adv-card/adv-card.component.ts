import { Component, OnInit, Input } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'adv-card',
  templateUrl: './adv-card.component.html',
  styleUrls: ['./adv-card.component.scss'],
})
export class AdvCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() items = [];
  config = {
    effect: 'fade',
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  };
}
