import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/modules/users/business/user.service';
import { Profile } from '@app/modules/users/model/user.model';
import { tileLayer, latLng, marker } from 'leaflet';
import { SelectItem } from 'primeng';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'address-modify',
  templateUrl: './address-modify.component.html',
  styleUrls: ['./address-modify.component.scss'],
})
export class AddressModifyComponent implements OnInit {
  form = new FormGroup({
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    district: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    plaque: new FormControl(null, Validators.required),
    unit: new FormControl(null, Validators.required),
    postalCode: new FormControl(null, Validators.required),
    isReceiver: new FormControl(false),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    nationalCode: new FormControl(null, Validators.required),
    mobileNo: new FormControl(null, Validators.required),
    lat: new FormControl(null, Validators.required),
    lng: new FormControl(null, Validators.required),
  });
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

  convertedStates: SelectItem[];
  convertedCities: SelectItem[];
  convertedDistricts: SelectItem[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadStates();
    const address = this.config.data.address;
    if (address) {
      this.form.setValue({
        state: address.stateId,
        city: address.cityId,
        district: address.districtId,
        address: address.address,
        plaque: address.plaque,
        unit: address.unit,
        postalCode: address.postalCode,
        isReceiver: address.isReceiver,
        firstName: address.firstName,
        lastName: address.lastName,
        nationalCode: address.nationalCode,
        mobileNo: address.mobileNo,
        lat: address.lat,
        lng: address.lng,
      });
      this.layers = [marker([address.lat, address.lng])];
      this.loadCities(address.stateId);
      this.loadDistricts(address.cityId);
    }
  }

  leafletClick(args) {
    this.layers = [marker([args.latlng.lat, args.latlng.lng])];
    this.form.controls['lat'].setValue(args.latlng.lat);
    this.form.controls['lng'].setValue(args.latlng.lng);
  }

  onStateChange(stateId) {
    this.loadCities(stateId);
  }

  onCityChange(cityId) {
    this.loadDistricts(cityId);
  }

  onReceiveChange(isReceiver: boolean) {
    if (isReceiver) {
      this.userService.getProfileInfo().subscribe((res) => {
        this.form.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          nationalCode: res.nationalCode,
          mobileNo: res.mobileNo,
        });
      });
    }
  }

  onSubmitAddress() {
    if (this.form.valid) this.ref.close(this.form.value);
  }

  async loadStates() {
    const originalStates = await this.userService.getStates().toPromise();
    this.convertedStates = originalStates.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  async loadCities(stateId: number) {
    const originalCities = await this.userService
      .getCities(stateId)
      .toPromise();
    this.convertedCities = [];
    this.convertedCities = originalCities.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  async loadDistricts(cityId: number) {
    const originalDistricts = await this.userService
      .getDistricts(cityId)
      .toPromise();
    this.convertedDistricts = originalDistricts.map((item) => {
      return { label: item.title, value: item.id };
    });
  }
}
