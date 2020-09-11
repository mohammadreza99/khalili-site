import { Component, OnInit } from '@angular/core';
import { DialogFormService } from '@app/services/dialog-form.service';
import { Profile, BaseJob, Password } from '../../model/user.model';
import { UserService } from '../../business/user.service';
import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';
import * as moment from 'jalali-moment';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng';

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
  pass: Password;
  jobs = [];
  jobTitle = '';
  showAvatarDialog = false;
  avatars = ['1', '2', '3', '4', '5', '6'];

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile() {
    this.userProfile = await this.userService.getProfileInfo().toPromise();
    this.userService.getJobs().subscribe((jobs) => {
      for (const job of jobs)
        this.jobs.push({
          value: job.id,
          label: job.title,
        });
      this.jobTitle = this.jobs.find(
        (job) => job.value == this.userProfile.jobId
      ).label;
    });
  }

  onClickTab(event, tabPane, navs, active) {
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
        if (res) {
          this.userProfile.firstName = res.firstName;
          this.userProfile.lastName = res.lastName;
          this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
        }
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
        if (res) {
          this.userProfile.nationalCode = res.nationalCode;
          this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
        }
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
        if (res) {
          this.userProfile.email = res.email;
          this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
        }
      });
  }

  onEditBirthDate() {
    this.dialogFormService
      .show('تاریخ تولد', [
        {
          type: 'date-picker',
          formControlName: 'birthDate',
          value: this.userProfile.birthDate,
          label: 'تاریخ تولد',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.birthDate = moment(
            res.birthDate.momentObj._d
          ).format('jYYYY/jMM/jDD');
          this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
        }
      });
  }

  onEditJob() {
    this.dialogFormService
      .show('شغل', [
        {
          type: 'dropdown',
          dropdownItems: this.jobs,
          formControlName: 'jobId',
          value: this.userProfile.jobId,
          label: 'شغل',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.jobId = res.jobId;
          this.jobTitle = this.jobs.find(
            (job) => job.value == this.userProfile.jobId
          ).label;
          this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
        }
      });
  }

  onEditCarNumber() {
    this.dialogFormService
      .show('شماره کارت', [
        {
          type: 'text',
          formControlName: 'cardNumber',
          value: this.userProfile.cardNumber,
          label: 'شماره کارت',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.cardNumber = res.cardNumber;
          this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
        }
      });
  }

  onEditPasword() {
    this.dialogFormService
      .show('رمزعبور', [
        {
          type: 'text',
          formControlName: 'oldPassword',
          label: 'رمز عبور قبلی',
          labelWidth: 80,
        },
        {
          type: 'text',
          formControlName: 'password',
          label: 'رمزعبور',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        // if(res && res.password && res.oldPassword)
        // this.userService.insertOrUpdatePassword(res).subscribe();
      });
  }

  onEditAvatar(avatar){
    this.userProfile.avatar = avatar;
    this.userService.insertOrUpdateProfile(this.userProfile).subscribe();
  }

  onAvatarClick() {
    this.showAvatarDialog = true;
  }

}
