import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@app/modules/orders/business/order.service';

import { ProductService } from '../../business/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService
  ) {}

  productInfo$: any;
  productPrices: any = [];
  defaultPrice: any;
  productMedia$: any;
  productDescription$: any;
  productComments$: any;
  productFields$: any;
  relatedProducts$: any;
  availableColors: any[] = [];
  prices: any[] = [];
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
  productCode: string;
  // zoomedImageSrc = '../../../../../assets/images/1.jpg';
  // zoomedImageSrc1 = '../../../../../assets/images/2.jpg';

  ngOnInit() {
    this.productCode = this.route.snapshot.paramMap.get('code');
    this.productInfo$ = this.productService.getProductInfo(this.productCode);
    this.productMedia$ = this.productService.getProductMedia(this.productCode);
    this.productFields$ = this.productService.getProductFields(
      this.productCode
    );
    this.productDescription$ = this.productService.getProductDescription(
      this.productCode
    );
    this.productComments$ = this.productService.getProductComments(
      this.productCode
    );
    this.relatedProducts$ = this.productService.getRelatedProducts(
      this.productCode
    );
    this.productService
      .getProductPrice(this.productCode)
      .subscribe((res: any[]) => {
        this.prices = res;
        res.forEach((price) => {
          if (!this.availableColors.find((color) => color.value == price.colorId))
            this.availableColors.push({
              label: price.colorTitle,
              value: price.colorId,
            });
        });
        
        this.defaultPrice = res.find(
          (item) =>
            item.isDefault && item.colorId == this.availableColors[0].value
        );
        this.productPrices = res.filter(
          (item) =>
            !item.isDefault && item.colorId == this.availableColors[0].value
        );
      });
  }

  onColorChange(colorId) {
    let selectedColor = this.availableColors.find(
      (color) => color.value == colorId
    );
    this.defaultPrice = this.prices.find(
      (item) => item.isDefault && item.colorId == selectedColor.value
    );
    this.productPrices = this.prices.filter(
      (item) => !item.isDefault && item.colorId == selectedColor.value
    );
    
  }

  onAddToCardByDefaultPrice() {
    this.orderService.storeCart({
      productCode: this.productCode,
      priceId: this.defaultPrice.id,
    });
    this.router.navigate(['/orders/cart']);
  }

  onAddToCardByOtherPrice(priceId) {
    this.orderService.storeCart({
      productCode: this.productCode,
      priceId: priceId.id,
    });
    this.router.navigate(['/orders/cart']);
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
