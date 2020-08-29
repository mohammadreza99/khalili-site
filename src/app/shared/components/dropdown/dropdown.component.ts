import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ag-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() icon = 'fal fa-chevron-down';
  @Input() title: string = 'title';
  @Input() iconPos: 'start' | 'end' = 'end';
  @Output() listItemClick = new EventEmitter();

  isDropdownOpen = false;

  ngOnInit(): void {}

  onClickOutside() {
    this.isDropdownOpen = false;
  }

  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
