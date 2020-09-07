import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'ag-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit {
  @Input() active = false;
  @Input() icon: string;
  @Input() title: string;
  @Output() setActive = new EventEmitter();

  ngOnInit(): void {}
}
