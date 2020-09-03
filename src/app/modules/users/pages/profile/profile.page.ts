import { Component, OnInit } from '@angular/core';
import { DialogFormService } from '@app/services/dialog-form.service';
import { Profile } from '../../model/user.model';
import { UserService } from '../../business/user.service';
import { Observable } from 'rxjs';

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

  userProfile: Profile;

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile() {
    this.userProfile = await this.userService.getProfileInfo().toPromise();
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
