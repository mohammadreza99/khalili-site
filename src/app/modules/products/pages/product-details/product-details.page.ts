import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../business/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  /*
  brandId: 1
brandTitle: "سامسونگ"
categoryId: 12
categoryTitle: "دسته بندی 13"
commentCount: 0
descriptionSeo: "d fgsetg we vsdf d df  df dv"
gainPoints: "ggg,[p[o\"
id: "2f3a2778-8547-4d45-8812-bafa2a94d311"
name: "nnnnnnnnnnn"
nameEn: "sddd"
productCode: "TTP-5A9A3"
weakPoints: "hhh"
  */
  productInfo$: any;

  /*
  colorId: 16
colorTitle: "آبی2"
disCountPrice: 66
id: 14
insuranceId: 1
insuranceTitle: "بیمه دو"
isDefault: true
operation: 3
price: 55
qty: 99
storeTitle: "فروشگاه"
warrantyId: 2
warrantyTitle: "تست 1"
  */
  productPrice$: any;
  /**
   isDefault: true
keyMedia: "Product/efxbhgcn.png"
   */
  productMedia$: any;
  productDescription$: any;
  productComments$: any;
  relatedProducts$: any;
  zoomedImageSrc = '../../../../../assets/images/1.jpg';
  zoomedImageSrc1 = '../../../../../assets/images/2.jpg';
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
  images: any[] = [
    {
      previewImageSrc: 'https://via.placeholder.com/150x150',
      thumbnailImageSrc: 'https://via.placeholder.com/150x150',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      previewImageSrc: 'https://via.placeholder.com/100x100',
      thumbnailImageSrc: 'https://via.placeholder.com/100x100',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
  ];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const code = this.route.snapshot.paramMap.get('code');
    this.productInfo$ = this.productService.getProductInfo(id, code);
    this.productPrice$ = this.productService.getProductPrice(id, code);
    this.productMedia$ = this.productService.getProductMedia(id, code);
    this.productDescription$ = this.productService.getProductDescription(
      id,
      code
    );
    this.productComments$ = this.productService.getProductComments(id, code);
    this.relatedProducts$ = this.productService.getRelatedProducts(id, code);

    this.productInfo$?.subscribe((res) => {
      console.log('productInfo', res);
    });
    this.productPrice$?.subscribe((res) => {
      console.log('productPrice', res);
    });
    this.productMedia$?.subscribe((res) => {
      console.log('productMedia', res);
    });
    this.productDescription$?.subscribe((res) => {
      console.log('productDescription', res);
    });
    this.productComments$?.subscribe((res) => {
      console.log('productComments', res);
    });
    this.relatedProducts$?.subscribe((res) => {
      console.log('relatedProducts', res);
    });
  }

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
