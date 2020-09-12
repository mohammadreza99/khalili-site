import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@app/modules/users/business/user.service';
import { BaseDistrict, BaseState } from '@app/modules/users/model/user.model';
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
  form = new FormGroup({ control: new FormControl() });
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
  originalStates: BaseState[];
  convertedStates: SelectItem[];
  originalCities: BaseState[];
  convertedCities: SelectItem[];
  originalDistricts: BaseDistrict[];
  convertedDistricts: SelectItem[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStates();
  }

  leafletClick(args) {
    this.layers = [marker([args.latlng.lat, args.latlng.lng])];
  }

  async loadStates() {
    this.originalStates = await this.userService.getStates().toPromise();
    this.convertedStates = this.originalStates.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  async loadCities(stateId: number) {
    this.originalCities = await this.userService.getCities(stateId).toPromise();
    this.convertedCities = [];
    this.convertedCities = this.originalCities.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  async loadDistricts(cityId: number) {
    this.originalDistricts = await this.userService
      .getDistricts(cityId)
      .toPromise();
    this.convertedDistricts = this.originalDistricts.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  onStateChange(stateId) {
    this.loadCities(stateId);
    this.cd.detectChanges();
  }

  onCityChange(cityId) {
    this.loadDistricts(cityId);
  }

  onSubmitAddress() {
    this.ref.close(this.form.value);
  }
}
