import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChildren,
  QueryList,
} from '@angular/core';

import { AccordionItemComponent } from '@shared/components/accordion-item/accordion-item.component';

@Component({
  selector: 'ag-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit, AfterContentInit {
  @ContentChildren(AccordionItemComponent) accordionItemCmps: QueryList<
    AccordionItemComponent
  >;

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.accordionItemCmps.map((accordionItemCmp, i) => {
      accordionItemCmp.setActive.subscribe(() => this.setActive(i));
    });
  }

  setActive(index) {
    this.accordionItemCmps.map((accordionItemCmp, i) => {
      index !== i || accordionItemCmp.active
        ? (accordionItemCmp.active = false)
        : (accordionItemCmp.active = true);
    });
  }
}
