import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DialogFormService } from '@app/services/dialog-form.service';
import {
  Profile,
  Password,
  OrganizationModel,
  AddressModel,
} from '../../model/user.model';
import { UserService } from '../../business/user.service';
import * as moment from 'jalali-moment';
import { SelectItem } from 'primeng';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import { AuthService } from '@app/modules/auth/business/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private dialogFormService: DialogFormService,
    private dataService: DataService,
    private userService: UserService,
    private vcRef: ViewContainerRef,
    private authService: AuthService
  ) {}

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
  organization: OrganizationModel;
  organizationForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    economicCode: new FormControl(null, Validators.required),
    nationalId: new FormControl(null, Validators.required),
    registrationId: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    telNumber: new FormControl(null, Validators.required),
  });

  showAvatarDialog = false;
  avatarNames = ['1', '2', '3', '4', '5', '6'];

  addresses: AddressModel[];
  convertedStates: SelectItem[];
  convertedCities: SelectItem[];
  convertedDistricts: SelectItem[];

  ngOnInit(): void {
    this.loadProfile();
    this.loadStates();
    this.loadOrganization();
    this.loadAddresses();
  }

  ///////////////////////////////////////////////////////////////////////
  //                              Profile                              //
  ///////////////////////////////////////////////////////////////////////
  onEditFullName() {
    this.dialogFormService
      .show('نام و نام خانوادگی', [
        {
          type: 'text',
          formControlName: 'firstName',
          value: this.userProfile.firstName,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          label: 'نام',
          labelWidth: 80,
        },
        {
          type: 'text',
          formControlName: 'lastName',
          value: this.userProfile.lastName,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          label: 'نام خانوادگی',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.firstName = res.firstName;
          this.userProfile.lastName = res.lastName;
          this.userService.insertOrUpdateProfile(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
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
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          label: 'کد ملی',
          numberOnly: true,
          maxLength: 10,
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.nationalCode = res.nationalCode;
          this.userService.insertOrUpdateProfile(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
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
          errors: [
            { type: 'email', message: 'لطفا ایمیل معتبر وارد کنید' },
            { type: 'required', message: 'این فیلد الزامیست' },
          ],
          label: 'ایمیل',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.email = res.email;
          this.userService.insertOrUpdateProfile(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
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
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          label: 'تاریخ تولد',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.birthDate = moment(
            res.birthDate.momentObj._d
          ).format('jYYYY/jMM/jDD');
          this.userService
            .insertOrUpdateProfile({
              birthDate: moment(res.birthDate.momentObj._d).format(
                'jYYYY/jMM/jDD'
              ),
            } as Profile)
            .subscribe(() => {
              this.dataService.successfullMessage(this.vcRef);
            });
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
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
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
          this.userService.insertOrUpdateProfile(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
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
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          numberOnly: true,
          maxLength: 16,
          label: 'شماره کارت',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.cardNumber = res.cardNumber;
          this.userService.insertOrUpdateProfile(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  onEditPasword() {
    if (this.userProfile.isPassword) {
      this.dialogFormService
        .show('ویرایش رمز عبور', [
          {
            type: 'text',
            formControlName: 'oldPassword',
            label: 'رمز عبور قبلی',
            inputMode: 'password',
            errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
            labelWidth: 80,
          },
          {
            type: 'text',
            formControlName: 'password',
            errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
            inputMode: 'password',
            label: 'رمزعبور',
            labelWidth: 80,
          },
        ])
        .onClose.subscribe((res) => {
          this.userService.insertOrUpdatePassword(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
        });
    } else {
      this.dialogFormService
        .show('اختصاص رمز عبور', [
          {
            type: 'text',
            formControlName: 'password',
            errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
            label: 'رمزعبور',
            labelWidth: 80,
            inputMode: 'password',
          },
          {
            type: 'hidden',
            formControlName: 'oldPassword',
            value: null,
          },
        ])
        .onClose.subscribe((res) => {
          this.userService.insertOrUpdatePassword(res).subscribe(() => {
            this.dataService.successfullMessage(this.vcRef);
          });
        });
    }
  }

  onEditAvatar(avatar) {
    this.userProfile.avatar = avatar;
    this.showAvatarDialog = false;
    this.userService.insertOrUpdateProfile(this.userProfile).subscribe(() => {
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onAvatarClick() {
    this.showAvatarDialog = true;
  }

  onSubmitOrganization() {
    if (this.organizationForm.valid) {
      this.organization = {
        name: this.organizationForm.controls['name'].value,
        economicCode: this.organizationForm.controls['economicCode'].value,
        registrationId: this.organizationForm.controls['registrationId'].value,
        nationalId: this.organizationForm.controls['nationalId'].value,
        telNumber: this.organizationForm.controls['telNumber'].value,
        cityId: this.organizationForm.controls['city'].value,
      };
      this.userService
        .insertOrUpdateOrganization(this.organization)
        .subscribe();
    }
  }

  onStateChange(stateId) {
    this.loadCities(stateId);
  }

  onCityChange(cityId) {
    this.loadDistricts(cityId);
  }

  logout() {
    this.authService.logout();
  }

  ///////////////////////////////////////////////////////////////////////
  //                              Address                              //
  ///////////////////////////////////////////////////////////////////////
  onEditAddress(address) {
    this.userService.updateAddress(address).subscribe(() => {
      this.dataService.successfullMessage(this.vcRef);
      this.loadAddresses();
    });
  }

  onAddAddress(address) {
    this.userService.insertAddress(address).subscribe(() => {
      this.dataService.successfullMessage(this.vcRef);
      this.loadAddresses();
    });
  }

  onRemoveAddress(addressId) {
    // this.userService.removeAddress(addressId).subscribe();
    this.loadAddresses();
  }

  ///////////////////////////////////////////////////////////////////////
  //                              Data Load                            //
  ///////////////////////////////////////////////////////////////////////
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
      )?.label;
    });
  }

  async loadOrganization() {
    this.organization = await this.userService.getOrganization().toPromise();
    if (this.organization[0]) {
      this.organizationForm.patchValue({
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

  async loadAddresses() {
    this.addresses = await this.userService.getAddresses().toPromise();
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
}
