import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../business/product.service';

@Component({
  selector: 'product-subcategory',
  templateUrl: './product-subcategory.page.html',
  styleUrls: ['./product-subcategory.page.scss'],
})
export class ProductSubcategoryPage implements OnInit {
  constructor(private productService: ProductService) {}
  sortTypeItems$:any;
  ngOnInit(): void {
    this.sortTypeItems$=this.productService.getCategorySortType();

  }
  config = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      '575': { slidesPerView: 2 },
      '768 ': { slidesPerView: 3 },
      '992 ': { slidesPerView: 5, slidesPerGroup: 4 },
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
}
