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

  constructor(public dialogService: DialogService) {}

  ngOnInit() {}

  onEditClick() {
    this.dialogService.open(AddressModifyComponent, {
      header: 'ویرایش نشانی',
      width: '800px',
      data: { id: '2' },
    });
  }
}
