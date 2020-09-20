import { Injectable, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { PrimeConfirmService } from '@prime/prime-service/prime-confirm.service';
import { PrimeToastService } from '@prime/prime-service/prime-toast.service';
import { BaseService } from './base.service';
import { Config } from '@app/app.config';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private confirmer: PrimeConfirmService,
    private toaster: PrimeToastService
  ) {}

  cancellationConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.confirmer.show(
      {
        message: 'عملیات لغو شوند؟',
        header: 'لغو عملیات',
        icon: 'fa fa-exclamation-triangle',
      },
      vcRef
    );
  }

  deletionConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.confirmer.show(
      {
        message: 'آیا از حذف این مورد اطمینان دارید؟',
        header: 'حذف',
        icon: 'fa fa-times',
      },
      vcRef
    );
  }

  successfullMessage(vcRef: ViewContainerRef): Promise<any> {
    return this.toaster.show(
      {
        severity: 'success',
        summary: 'عملیات با موفقیت انجام شد.',
      },
      vcRef
    );
  }

  getBase64ImageFromUrl(url, callback) {
    const fullUrl = Config.ApiUrl + 'DownloadMedia?key=' + url;
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      var reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', fullUrl);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
