import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ag-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() logo = 'https://www.digikala.com/static/files/bc60cf05.svg';

  ngOnInit(): void {}
}
