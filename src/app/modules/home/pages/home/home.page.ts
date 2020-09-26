import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../business/home.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private homeService: HomeService) {}

  zoomedImageSrc = '../../../assets/images/logo.png';
  zoomedImageSrc1 = '../../../assets/images/1.jpg';
  offerConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      '575': { slidesPerView: 1 },
      '768 ': { slidesPerView: 2 },
      '992 ': { slidesPerView: 3 },
    },
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
  menu: any[];
  slider$: any;
  amazingOffers: { title: string; obj: any[] };
  mostViewed: { title: string; obj: any[] };
  categoryVarious: { title: string; obj: any[] };
  newProducts: { title: string; obj: any[] };
  mostSellers: { title: string; obj: any[] };

  ngOnInit(): void {
    this.homeService.getMenu().subscribe((res) => {
      this.menu = res;
    });
    // this.slider$ = this.homeService.getSlider();
    this.homeService.getAllHomePage().subscribe((res) => {
      this.amazingOffers = res[0];
      this.mostViewed = res[1];
      this.categoryVarious = res[2];
      this.newProducts = res[3];
      this.mostSellers = res[4];
    });
  }

  onMouseEnterMenuItem(id: string) {
    document.querySelector('#' + id).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector('#' + id).classList.remove('show');
  }
}
