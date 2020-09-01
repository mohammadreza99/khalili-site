import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private cd: ChangeDetectorRef) {}
  zoomedImageSrc="../../../assets/images/logo.png"
  zoomedImageSrc1="../../../assets/images/1.jpg"


  banerSlider = [
    {
      img: './../../../assets/images/adv-3.jpg',
      url: '',
    },
    {
      img: './../../../assets/images/adv-4.jpg',
      url: '',
    },
    {
      img: './../../../assets/images/adv-5.jpg',
      url: '',
    },
  ];

  baner3 = [
    {
      img: './../../../assets/images/adv-6.jpg',
      url: '',
    },
  ];

  baner4 = [
    {
      img: './../../../assets/images/adv-7.jpg',
      url: '',
    },
  ];

  baner5 = [
    {
      img: './../../../assets/images/adv-8.jpg',
      url: '',
    },
  ];

  offerConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints:{
      '575': { slidesPerView: 1 },
      '768 ': { slidesPerView: 2 },
      '992 ': { slidesPerView: 3 },
    }
  };

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

  brands = [
    {
      img: '../../../assets/images/brand-1.jpg',
    },
    {
      img: '../../../assets/images/brand-2.png',
    },
    {
      img: '../../../assets/images/brand-3.png',
    },
    {
      img: '../../../assets/images/brand-4.png',
    },
    {
      img: '../../../assets/images/brand-5.jpg',
    },
    {
      img: '../../../assets/images/brand-6.jpg',
    },
    {
      img: '../../../assets/images/brand-7.jpg',
    },
    {
      img: '../../../assets/images/brand-8.png',
    },
    {
      img: '../../../assets/images/brand-9.png',
    },
    {
      img: '../../../assets/images/brand-10.png',
    },
    {
      img: '../../../assets/images/brand-11.png',
    },
    {
      img: '../../../assets/images/brand-12.png',
    },
    {
      img: '../../../assets/images/brand-14.jpg',
    },
  ];

  

  onMouseEnterMenuItem(id: string) {
    document.querySelector('#' + id).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector('#' + id).classList.remove('show');
  }
}
