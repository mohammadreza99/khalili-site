import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddressModifyComponent } from '../address-modify/address-modify.component';
import { AddressModel } from '@app/modules/users/model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit {
  @Input() address: AddressModel;
  form: FormGroup;

  constructor(public dialogService: DialogService) {}

  ngOnInit() {
    this.form = new FormGroup({
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      Plaque: new FormControl(null, Validators.required),
      Unit: new FormControl(null, Validators.required),
      PostalCode: new FormControl(null, Validators.required),
      IsReceiver: new FormControl(false, Validators.required),
      FirstName: new FormControl(null, Validators.required),
      LastName: new FormControl(null, Validators.required),
      NationalCode: new FormControl(null, Validators.required),
      MobileNo: new FormControl(null, Validators.required),
    });
  }

  onEditClick() {
    this.dialogService.open(AddressModifyComponent, {
      header: 'ویرایش نشانی',
      width: '800px',
      data: { id: '2' },
    });
  }
}
