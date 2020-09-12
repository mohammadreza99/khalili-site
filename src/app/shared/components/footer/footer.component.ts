import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}
  footerItems = [
    {
      title: 'راهنمای خرید از دیجی‌کالا',
      items: ['نحوه ثبت سفارش', 'رویه ارسال سفارش', 'شیوه‌های پرداخت'],
    },
    {
      title: 'راهنمای خرید از دیجی‌کالا',
      items: ['نحوه ثبت سفارش', 'رویه ارسال سفارش', 'شیوه‌های پرداخت'],
    },
    {
      title: 'راهنمای خرید از دیجی‌کالا',
      items: ['نحوه ثبت سفارش', 'رویه ارسال سفارش', 'شیوه‌های پرداخت'],
    },
  ];
  ngOnInit(): void {}
  goToTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
