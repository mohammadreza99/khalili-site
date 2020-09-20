import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/modules/users/business/user.service';
import { BaseJob, Profile } from '@app/modules/users/model/user.model';
import { DialogFormService } from '@app/services/dialog-form.service';
import * as moment from 'jalali-moment';
import { SelectItem } from 'primeng';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  constructor(
    private dialogFormService: DialogFormService,
    private userService: UserService
  ) {}

  userProfile = new Profile();
  convertedJobs: SelectItem[] = [];
  jobTitle = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile() {
    this.userProfile = await this.userService.getProfileInfo().toPromise();
    const jobs = await this.userService.getJobs().toPromise();
    for (const job of jobs)
      this.convertedJobs.push({
        value: job.id,
        label: job.title,
      });
    this.jobTitle = this.convertedJobs.find(
      (job) => job.value == this.userProfile.jobId
    )?.label;
  }

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
          this.userService.insertOrUpdateProfile(res).subscribe();
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
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.nationalCode = res.nationalCode;
          this.userService.insertOrUpdateProfile(res).subscribe();
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
          this.userService.insertOrUpdateProfile(res).subscribe();
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
            .subscribe();
        }
      });
  }

  onEditJob() {
    this.dialogFormService
      .show('شغل', [
        {
          type: 'dropdown',
          dropdownItems: this.convertedJobs,
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
          this.jobTitle = this.convertedJobs.find(
            (job) => job.value == this.userProfile.jobId
          ).label;
          this.userService.insertOrUpdateProfile(res).subscribe();
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
          label: 'شماره کارت',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res) {
          this.userProfile.cardNumber = res.cardNumber;
          this.userService.insertOrUpdateProfile(res).subscribe();
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
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          labelWidth: 80,
        },
        {
          type: 'text',
          formControlName: 'password',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
          label: 'رمزعبور',
          labelWidth: 80,
        },
      ])
      .onClose.subscribe((res) => {
        if (res && res.password && res.oldPassword)
          this.userService.insertOrUpdatePassword(res).subscribe();
      });
  }
}
