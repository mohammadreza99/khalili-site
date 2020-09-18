import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
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
  @Input() addresses: AddressModel[];
  @Output() onEditAddress = new EventEmitter();
  @Output() onAddAddress = new EventEmitter();
  @Output() onRemoveAddress = new EventEmitter();

  constructor(public dialogService: DialogService) {}

  ngOnInit() {}

  onAddClick() {
    this.dialogService
      .open(AddressModifyComponent, {
        header: 'افزودن نشانی',
        width: '800px',
        data: {},
      })
      .onClose.subscribe((res) => {
        if (res) {
          let address: AddressModel = {
            lat: res.lat,
            lng: res.lng,
            districtId: res.district,
            address: res.address,
            plaque: res.plaque,
            unit: res.unit,
            postalCode: res.postalCode,
            isReceiver: true,
            firstName: res.firstName,
            lastName: res.lastName,
            nationalCode: res.nationalCode,
            mobileNo: res.mobileNo,
          };
          this.onAddAddress.emit(address);
        }
      });
  }

  onEditClick(address) {
    this.dialogService
      .open(AddressModifyComponent, {
        header: 'ویرایش نشانی',
        width: '800px',
        data: {
          address: address,
        },
      })
      .onClose.subscribe((res) => {
        if (res) {
          let _address: AddressModel = {
            id: address.id,
            lat: res.lat,
            lng: res.lng,
            districtId: res.district,
            address: res.address,
            plaque: res.plaque,
            unit: res.unit,
            postalCode: res.postalCode,
            isReceiver: true,
            firstName: res.firstName,
            lastName: res.lastName,
            nationalCode: res.nationalCode,
            mobileNo: res.mobileNo,
          };
          this.onEditAddress.emit(_address);
        }
      });
  }

  onRemoveClick(id) {
    this.onRemoveAddress.emit(id);
  }
}
