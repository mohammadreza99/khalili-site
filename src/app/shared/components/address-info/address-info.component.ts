import { Component, OnInit, Input } from '@angular/core';
import { AddressModel } from '@app/modules/users/model/user.model';
import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit {
  @Input() address: AddressModel;
  showAddressDetailsDialog=false;
  showMap=true;
  form : FormGroup;
  constructor() {}
  
  ngOnInit(){
    this.form=new FormGroup({
      state: new FormControl(null , Validators.required),
      city: new FormControl(null , Validators.required),
      district: new FormControl(null , Validators.required),
      address: new FormControl(null , Validators.required),
      Plaque: new FormControl(null , Validators.required),
      Unit: new FormControl(null , Validators.required),
      PostalCode: new FormControl(null , Validators.required),
      IsReceiver: new FormControl(false , Validators.required),
      FirstName: new FormControl(null , Validators.required),
      LastName: new FormControl(null , Validators.required),
      NationalCode: new FormControl(null , Validators.required),
      MobileNo: new FormControl(null , Validators.required),
    });
  }

  
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

  addAddressDetail(){
    this.showMap=false
  }
}
