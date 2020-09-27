import { Component, OnInit } from '@angular/core';
import { HomeService } from '@app/modules/home/business/home.service';

@Component({
  selector: 'ag-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private homeService: HomeService) {}
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

  footerDescription$;
  socials$;

  ngOnInit(): void {
    this.footerDescription$ = this.homeService.getFooterDescription();
    this.socials$ = this.homeService.getSocials();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
