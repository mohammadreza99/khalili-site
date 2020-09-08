import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  constructor() {}
  products = [
    {
      img: '../../../assets/images/1.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
    {
      img: '../../../assets/images/2.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
    {
      img: '../../../assets/images/3.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
    {
      img: '../../../assets/images/4.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
    {
      img: '../../../assets/images/5.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
    {
      img: '../../../assets/images/6.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
    {
      img: '../../../assets/images/7.jpg',
      title:
        'گوشی موبایل اپل مدل iPhone 11 Pro A2217 دو سیم‌ کارت ظرفیت 256 گیگابایت',
      price: '34499000',
      discount: '50',
      link: '',
    },
  ];

  ngOnInit(): void {}

  onClickTab(event, tabPane, navs, active) {
    navs.querySelectorAll('.nav-link').forEach((element) => {
      element.classList.remove('active');
    });
    tabPane.querySelectorAll('.tab-pane').forEach((element) => {
      element.classList.remove('show');
      element.classList.remove('active');
    });
    event.target.classList.add('active');
    tabPane.querySelector(`.${active}`).classList.add('show');
    tabPane.querySelector(`.${active}`).classList.add('active');
  }
}
