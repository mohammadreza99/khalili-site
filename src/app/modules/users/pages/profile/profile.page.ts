import { Component, OnInit } from '@angular/core';
import { DialogFormService } from '@app/services/dialog-form.service';
import { Profile } from '../../model/user.model';
import { UserService } from '../../business/user.service';
import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private dialogFormService: DialogFormService,
    private userService: UserService
  ) {}



  address = [
    {
      lat: 35.6908164,
      lng: 51.3802295,
      districtId: 1,
      address: 'شریعتی خیابان قبا',
      plaque: 65,
      unit: 2,
      postalCode: '1234567890',
      isReceiver: true,
      firstName: 'سولماز',
      lastName: 'شکری',
      nationalCode: '0017630665',
      mobileNo: '09354013081',
    },
  ];

  cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' },
  ];
  cars = [
    { brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' },
    { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
    { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
    { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh' },
    { brand: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34' },
    { brand: 'Volvo', year: 2005, color: 'Black', vin: 'jejtyj' },
    { brand: 'Honda', year: 2012, color: 'Yellow', vin: 'g43gr' },
    { brand: 'Jaguar', year: 2013, color: 'Orange', vin: 'greg34' },
    { brand: 'Ford', year: 2000, color: 'Black', vin: 'h54hw5' },
    { brand: 'Fiat', year: 2013, color: 'Red', vin: '245t2s' },
  ];
  userProfile: Profile;

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile() {
    this.userProfile = await this.userService.getProfileInfo().toPromise();
  }

  onClick(event, tabPane, navs, active) {
    navs.querySelectorAll('.nav-link').forEach((element) => {
      element.classList.remove('active');
    });
    tabPane.querySelectorAll('.tab-pane').forEach((element) => {
      element.classList.remove('show');
      element.classList.remove('active');
    });
    event.target.classList.add('active');
    tabPane.querySelector(`.${active}`).classList.add('show');
    tabPane.querySelector(`.${active}`).classList.add('active');
  }

  onEditFullName() {
    this.dialogFormService
      .show('نام و نام خانوادگی', [
        {
          type: 'text',
          formControlName: 'firstName',
          value: this.userProfile.firstName,
          label: 'نام',
          labelWidth: 80,
        },
        {
          type: 'text',
          formControlName: 'lastName',
          value: this.userProfile.lastName,
          label: 'نام خانوادگی',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }

  onEditNationalCode() {
    this.dialogFormService
      .show('کد ملی', [
        {
          type: 'text',
          formControlName: 'nationalCode',
          value: this.userProfile.nationalCode,
          label: 'کد ملی',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }

  onEditEmail() {
    this.dialogFormService
      .show('ایمیل', [
        {
          type: 'text',
          formControlName: 'email',
          value: this.userProfile.email,
          label: 'ایمیل',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }

  onEditBirthDate() {
    this.dialogFormService
      .show('تاریخ تولد', [
        {
          type: 'text',
          formControlName: 'birthDate',
          value: this.userProfile.birthDate,
          label: 'تاریخ تولد',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }

  onEditJob() {
    this.dialogFormService
      .show('شغل', [
        {
          type: 'dropdown',
          dropdownItems: [],
          formControlName: 'jobId',
          value: this.userProfile.jobId,
          label: 'شغل',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }

  onEditCarNumber() {
    this.dialogFormService
      .show('شماره کارت', [
        {
          type: 'text',
          formControlName: 'firstName',
          value: this.userProfile.cardNumber,
          label: 'شماره کارت',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }

  onEditPasword() {
    this.dialogFormService
      .show('رمزعبور', [
        {
          type: 'text',
          formControlName: 'firstName',
          value: this.userProfile.firstName,
          label: 'رمزعبور',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        this.userService.insertOrUpdateProfile(res).subscribe();
      });
  }
}
