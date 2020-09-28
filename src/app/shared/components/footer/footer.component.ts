import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HomeService } from '@app/modules/home/business/home.service';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'ag-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  footerItems = [
    {
      title: 'راهنمای خرید از فروشگاه',
      items: ['نحوه ثبت سفارش', 'رویه ارسال سفارش', 'شیوه‌های پرداخت'],
    },
    {
      title: 'راهنمای خرید از فروشگاه',
      items: ['نحوه ثبت سفارش', 'رویه ارسال سفارش', 'شیوه‌های پرداخت'],
    },
    {
      title: 'راهنمای خرید از فروشگاه',
      items: ['نحوه ثبت سفارش', 'رویه ارسال سفارش', 'شیوه‌های پرداخت'],
    },
  ];

  footerDescription$;
  socials$;
  emailFormControl = new FormControl(null, [Validators.email]);

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

  submitEmail() {
    this.homeService
      .insertNews(this.emailFormControl.value)
      .subscribe((res) => {
        this.emailFormControl.reset();
        this.dataService.successfullMessage(this.vcRef);
      });
  }
}
