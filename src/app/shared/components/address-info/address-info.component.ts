import { Component, OnInit, Input } from '@angular/core';
import { AddressInsertModel } from '@app/modules/users/model/user.model';
import { DialogService } from 'primeng/dynamicdialog';
import { AddressModifyComponent } from '../address-modify/address-modify.component';

@Component({
  selector: 'address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit {
  @Input() address: AddressInsertModel;
  showAddressDetailsDialog = true;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  onEditClick() {
    this.dialogService.open(AddressModifyComponent, {
      header: 'ویرایش نشانی',
      width: '800px',
      data: { id: '2' },
    });
  }
}
