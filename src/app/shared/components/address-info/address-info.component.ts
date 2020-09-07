import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit {
  @Input()address
  constructor() { }

  ngOnInit(): void {
  }

}
