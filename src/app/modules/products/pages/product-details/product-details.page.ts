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

  productInfo$: any;
  productPrices: any=[];
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
  // zoomedImageSrc = '../../../../../assets/images/1.jpg';
  // zoomedImageSrc1 = '../../../../../assets/images/2.jpg';

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    this.productInfo$ = this.productService.getProductInfo(code);
    this.productMedia$ = this.productService.getProductMedia(code);
    this.productFields$ = this.productService.getProductFields(code);
    this.productDescription$ = this.productService.getProductDescription(code);
    this.productComments$ = this.productService.getProductComments(code);
    this.relatedProducts$ = this.productService.getRelatedProducts(code);
    this.productService.getProductPrice(code).subscribe((res: any[]) => {
      this.prices = res;
      res.forEach((price) => {
        if (!this.availableColors.find((color) => color.id == price.colorId))
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
        (item) =>{
          console.log(item.isDefault);
          return (!item.isDefault) && item.colorId == this.availableColors[0].value
        }
         
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
