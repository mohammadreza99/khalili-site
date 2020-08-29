import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ag-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() logo = 'https://via.placeholder.com/130x60';

  ngOnInit(): void {}
}
