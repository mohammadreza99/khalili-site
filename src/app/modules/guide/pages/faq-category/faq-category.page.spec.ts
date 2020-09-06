import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryPage } from './faq-category.page';

describe('FaqCategoryPage', () => {
  let component: FaqCategoryPage;
  let fixture: ComponentFixture<FaqCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
