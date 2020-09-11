import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPage } from './shipping.page';

describe('ShippingPage', () => {
  let component: ShippingPage;
  let fixture: ComponentFixture<ShippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
