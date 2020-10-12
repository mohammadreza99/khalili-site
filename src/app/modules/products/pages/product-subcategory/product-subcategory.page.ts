import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng';
import { ProductService } from '../../business/product.service';
import { Info } from '../../model/product.model';

@Component({
  selector: 'product-subcategory',
  templateUrl: './product-subcategory.page.html',
  styleUrls: ['./product-subcategory.page.scss'],
})
export class ProductSubcategoryPage implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  originalCategories;
  convertedCategories: TreeNode[];
  sortTypeItems$: any;
  products$: any;
  filterList$: any;
  pageIndex = 0;
  sortType = 1;
  id;
  attributes: Info[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.title.setTitle(name);
      this.sortTypeItems$ = this.productService.getCategorySortType();
      this.filterList$ = this.productService.getCategoryFilterList(this.id);
      this.loadList(this.id);
      this.loadProduct(this.id);
    });
  }

  async loadList(id) {
    this.originalCategories = await this.productService
      .getCategoryAllSubList(id)
      .toPromise();
    this.convertedCategories = this.productService.convertToTreeNodeList(
      this.originalCategories
    );
  }

  async loadProduct(id) {
    let obj = {
      categoryId: id,
      pageIndex: this.pageIndex,
      sort: this.sortType,
    };
    this.products$ = await this.productService.getProductCategory(obj);
  }

  onPageChange(args) {
    this.pageIndex = +args.page + 1;
    this.loadProduct(this.id);
  }

  onSortTypeChange(event) {
    this.sortType = event.id;
    this.loadProduct(this.id);
  }

  onChangeAttributes(event) {
    this.attributes = event;
  }

  onFilterClick() {
    console.log(this.attributes);
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
}
