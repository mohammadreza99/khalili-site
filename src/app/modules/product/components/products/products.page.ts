import { Component, OnInit } from '@angular/core';
import { EndpointService } from '../../business/endpoint.service';

@Component({
  selector: 'ag-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(private endpontService: EndpointService) {}
  ngOnInit(): void {
    this.endpontService.getProducts().subscribe(console.log);
  }
}
