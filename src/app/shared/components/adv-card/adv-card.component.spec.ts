import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvCardComponent } from './adv-card.component';

describe('AdvCardComponent', () => {
  let component: AdvCardComponent;
  let fixture: ComponentFixture<AdvCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
