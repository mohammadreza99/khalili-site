import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPromoComponent } from './categories-promo.component';

describe('CategoriesPromoComponent', () => {
  let component: CategoriesPromoComponent;
  let fixture: ComponentFixture<CategoriesPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
