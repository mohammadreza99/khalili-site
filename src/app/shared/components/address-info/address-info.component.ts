import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';
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
  @Output() onEditAddress=new EventEmitter();
  @Output() onRemoveAddress=new EventEmitter();

  constructor(public dialogService: DialogService) {}

  ngOnInit() {}

  onEditClick() {
    this.dialogService.open(AddressModifyComponent, {
      header: 'ویرایش نشانی',
      width: '800px',
      data: { id: '2' },
    }).onClose.subscribe((res) => {
      if (res) {
        let address: AddressModel={
        id:this.address.id,
        lat:res.lat,
        lng:res.lng,
        districtId:res.district,
        address:res.address,
        plaque:res.plaque,
        unit:res.unit,
        postalCode:res.postalCode,
        isReceiver:true,
        firstName:res.firstName,
        lastName:res.lastName,
        nationalCode:res.nationalCode,
        mobileNo:res.mobileNo
        }
        this.onEditAddress.emit(address);
      }
    });
  }

  onRemoveClick(){
    this.onRemoveAddress.emit(this.address.id)
  }
}
