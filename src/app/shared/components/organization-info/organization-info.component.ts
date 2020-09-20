import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/modules/users/business/user.service';
import { OrganizationModel } from '@app/modules/users/model/user.model';
import { SelectItem } from 'primeng';

@Component({
  selector: 'organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.scss'],
})
export class OrganizationInfoComponent implements OnInit {
  convertedStates: SelectItem[];
  convertedCities: SelectItem[];
  convertedDistricts: SelectItem[];
  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    economicCode: new FormControl(null, Validators.required),
    nationalId: new FormControl(null, Validators.required),
    registrationId: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    telNumber: new FormControl(null, Validators.required),
  });
  organization: OrganizationModel;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

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

  async loadOrganization() {
    this.organization = await this.userService.getOrganization().toPromise();
    if (this.organization[0]) {
      this.form.setValue({});
      this.form.setValue({
        id: this.organization[0].id,
        name: this.organization[0].name,
        economicCode: this.organization[0].economicCode,
        nationalId: this.organization[0].nationalId,
        registrationId: this.organization[0].registrationId,
        state: this.organization[0].stateId,
        city: this.organization[0].cityId,
        telNumber: this.organization[0].telNumber,
      });
      this.loadCities(this.organization[0].stateId);
    }
  }

  onStateChange(stateId) {
    this.loadCities(stateId);
  }

  onCityChange(cityId) {
    this.loadDistricts(cityId);
  }

  onSubmitOrganization() {
    if (this.form.valid) {
      this.organization = {
        name: this.form.controls['name'].value,
        economicCode: this.form.controls['economicCode'].value,
        registrationId: this.form.controls['registrationId'].value,
        nationalId: this.form.controls['nationalId'].value,
        telNumber: this.form.controls['telNumber'].value,
        cityId: this.form.controls['city'].value,
      };
      this.userService
        .insertOrUpdateOrganization(this.organization)
        .subscribe();
    }
  }
}
