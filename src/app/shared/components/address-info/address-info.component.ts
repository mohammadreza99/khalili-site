import { Component, OnInit, Input } from '@angular/core';
import { AddressInsertModel } from '@app/modules/users/model/user.model';
import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';

@Component({
  selector: 'address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit {
  @Input() address: AddressInsertModel;
  showAddressDetailsDialog=false;
  constructor() {}

  ngOnInit(): void {}
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }),
    ],
    zoom: 16,
    center: latLng(35.6908164, 51.3802295),
  };
  layers = [marker([35.6908164, 51.3802295])];

  leafletClick(args) {
    this.layers = [marker([args.latlng.lat, args.latlng.lng])];
  }
  onEditClick(){
    this.showAddressDetailsDialog=true;
  }
}
