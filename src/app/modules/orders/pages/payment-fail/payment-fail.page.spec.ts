import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailPage } from './payment-fail.page';

describe('PaymentFailPage', () => {
  let component: PaymentFailPage;
  let fixture: ComponentFixture<PaymentFailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFailPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
