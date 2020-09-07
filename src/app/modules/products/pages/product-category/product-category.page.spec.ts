import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryPage } from './product-category.page';

describe('ProductCategoryPage', () => {
  let component: ProductCategoryPage;
  let fixture: ComponentFixture<ProductCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
