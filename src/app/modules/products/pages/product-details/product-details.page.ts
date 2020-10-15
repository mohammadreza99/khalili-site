import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/business/auth.service';
import { OrderService } from '@app/modules/orders/business/order.service';
import { DataService } from '@app/services/data.service';

import { ProductService } from '../../business/product.service';
import { ProductPrice } from '../../model/product.model';

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
    private authService: AuthService,
    private title: Title,
    private orderService: OrderService,
    private dataService: DataService,
    private vcRef: ViewContainerRef,
    private fb: FormBuilder
  ) {}

  productInfo: any;
  productPrices: any = [];
  defaultPrice: ProductPrice;
  productPoints = [];
  productMedia$: any;
  productDescription$: any;
  productComments = [];
  productFields$: any;
  relatedProducts$: any;
  availableColors: any[] = [];
  prices: any[] = [];
  discountPersent: number;
  showCommentDialog = false;
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
  productCode: string;
  productImages: any[];
  commentForm: FormGroup;

  ngOnInit() {
    this.productCode = this.route.snapshot.paramMap.get('code');
    this.productService
      .getProductInfo(this.productCode)
      .subscribe((product) => {
        this.productInfo = product;
        this.title.setTitle('مشخصات و خرید ' + product.name);
      });
    this.productService.getProductMedia(this.productCode).subscribe((res) => {
      this.productImages = res;
    });
    this.productFields$ = this.productService.getProductFields(
      this.productCode
    );
    this.productDescription$ = this.productService.getProductDescription(
      this.productCode
    );
    this.productService
      .getProductComments(this.productCode)
      .subscribe((res) => {
        for (const c of res) {
          this.productComments.push({
            firstName: c.firstName,
            gainPoints: c.gainPoints?.split(','),
            insertDate: c.insertDate,
            lastName: c.lastName,
            title: c.title,
            weakPoints: c.weakPoints?.split(','),
          });
        }
      });
    this.relatedProducts$ = this.productService.getRelatedProducts(
      this.productCode
    );
    this.productService
      .getProductPrice(this.productCode)
      .subscribe((res: ProductPrice[]) => {
        this.prices = res;
        res.forEach((price) => {
          if (
            !this.availableColors.find((color) => color.value == price.colorId)
          )
            this.availableColors.push({
              label: price.colorTitle,
              value: price.colorId,
            });
        });

        this.defaultPrice = res.find(
          (item) =>
            item.isDefault && item.colorId == this.availableColors[0].value
        );
        this.discountPersent =
          100 -
          (this.defaultPrice.disCountPrice * 100) / this.defaultPrice.price;
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
    this.discountPersent =
      100 - (this.defaultPrice.disCountPrice * 100) / this.defaultPrice.price;
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
      priceId: priceId,
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

  addNewPoint(item) {
    let control = <FormArray>this.commentForm.controls.points;
    control.push(
      this.fb.group({
        pointTypeId: [item.id],
        pointValue: [60],
      })
    );
    this.productPoints.push({
      control: control,
      title: item.title,
    });
  }

  addCommentClick() {
    if (this.authService.isAuthenticated()) {
      this.productService
        .getProductPoints(this.productCode)
        .subscribe((res) => {
          this.commentForm = this.fb.group({
            points: this.fb.array([]),
            productId: new FormControl(this.productInfo.id),
            title: new FormControl(null, [Validators.required]),
            gainPoints: new FormControl(null),
            weakPoints: new FormControl(null),
            description: new FormControl(null, [Validators.required]),
          });
          for (const item of res) {
            this.addNewPoint(item);
          }
          this.showCommentDialog = true;
        });
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { return: this.router.url },
      });
    }
  }

  onSubmitComment() {
    const formValue = this.commentForm.value;
    if (this.commentForm.valid)
      this.productService
        .insertComment({
          ProductId: formValue.productId,
          Title: formValue.title,
          GainPoints: formValue.gainPoints?.toString(),
          WeakPoints: formValue.weakPoints?.toString(),
          Description: formValue.description,
          UserProductPoint: formValue.points,
        })
        .subscribe((res) => {
          this.dataService.successfullMessage(this.vcRef);
          this.showCommentDialog = false;
        });
  }
}
