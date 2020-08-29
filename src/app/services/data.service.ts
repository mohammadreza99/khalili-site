import { Injectable, ViewContainerRef } from '@angular/core';
import * as moment from 'jalali-moment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FormGroup } from '@angular/forms';
// import { ItemValidationCheck } from '@shared/models/item-validation-check.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private http: HttpClient
  ) {}

  /////////////////////////////////////////////////////////////////////////////
  //                                GENERAL                                  //
  /////////////////////////////////////////////////////////////////////////////
  //#region GENERAL


  // private SIDE_MENU_ITEMS: MenuItem[] = [
  //   {
  //     label: 'داشبورد',
  //     icon: 'pi pi-pw pi-file',
  //     routerLink: ['/dashboard'],
  //     routerLinkActiveOptions: { exact: true },
  //   },
  //   {
  //     label: 'محصولات',
  //     icon: 'pi pi-pw pi-file',
  //     items: [
  //       {
  //         label: 'لیست محصولات',
  //         routerLink: ['/dashboard/product'],
  //       },
  //       {
  //         label: 'ویژگی ها',
  //         routerLink: ['/dashboard/product/features'],
  //       },
  //       {
  //         label: 'مسیر پروژه',
  //         routerLink: ['/dashboard/product/process'],
  //       },
  //       {
  //         label: 'همراهان',
  //         routerLink: ['/dashboard/product/partners'],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'فرصت های شغلی',
  //     icon: 'pi pi-pw pi-file',
  //     items: [
  //       { label: 'لیست فرصت های شغلی', routerLink: ['/customer/group/list'] },
  //     ],
  //   },
  //   {
  //     label: 'مقالات',
  //     icon: 'pi pi-pw pi-file',
  //     items: [{ label: 'لیست مقالات', routerLink: ['/customer/group/list'] }],
  //   },
  //   {
  //     label: 'اخبار',
  //     icon: 'pi pi-pw pi-file',
  //     items: [{ label: 'لیست اخبار', routerLink: ['/customer/group/list'] }],
  //   },
  // ];

  // get sideMenuItems(): MenuItem[] {
  //   return this.SIDE_MENU_ITEMS;
  // }

  hasValue(value: any) {
    return value !== null && value !== undefined;
  }

  getValue<T>(observable: Observable<T>) {
    return observable.pipe(filter(this.hasValue)).toPromise();
  }

  itemIsEmpty(item: any): boolean {
    return (
      item.parameter === null ||
      item.parameter === undefined ||
      item.parameter === '' ||
      item.parameter.length === 0
    );
  }

  // checkValidate(
  //   parameters: ItemValidationCheck[],
  //   viewContainerRef: ViewContainerRef
  // ) {
  //   if (parameters.length === 1) {
  //     const item = parameters[0];
  //     if (this.itemIsEmpty(item)) {
  //       this.messager.show(
  //         {
  //           severity: 'error',
  //           detail: item.errorDetail,
  //           summary: item.errorSummary || 'خطا',
  //         },
  //         viewContainerRef
  //       );
  //     }
  //   } else {
  //     const messages = [];
  //     for (const item of parameters) {
  //       if (this.itemIsEmpty(item)) {
  //         messages.push({
  //           detail: item.errorDetail,
  //           summary: item.errorSummary || 'خطا',
  //           severity: 'error',
  //         });
  //       }
  //     }
  //     this.messager.show(messages, viewContainerRef);
  //   }
  // }

  // cancellationConfirm(vcRef: ViewContainerRef): Promise<any> {
  //   return this.confirmer.show(
  //     {
  //       message: 'عملیات لغو شوند؟',
  //       header: 'لغو عملیات',
  //       icon: 'fa fa-exclamation-triangle',
  //     },
  //     vcRef
  //   );
  // }

  // deletionConfirm(vcRef: ViewContainerRef): Promise<any> {
  //   return this.confirmer.show(
  //     {
  //       message: 'آیا از حذف این مورد اطمینان دارید؟',
  //       header: 'حذف',
  //       icon: 'fa fa-times',
  //     },
  //     vcRef
  //   );
  // }

  // successfullMessage(vcRef: ViewContainerRef): Promise<any> {
  //   return this.toaster.show(
  //     {
  //       severity: 'success',
  //       summary: 'عملیات با موفقیت انجام شد.',
  //     },
  //     vcRef
  //   );
  // }

  cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  shallowCloneObj(obj) {
    return Object.assign({}, obj);
  }

  checkConnection(): Observable<boolean> {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((observer: Observer<boolean>) => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }
  //#endregion GENERAL

  getImage(imageUrl: string, options: any) {
    return this.http.get(imageUrl, options);
  }

  getDirtyControls(
    form: FormGroup,
    type: 'object' | 'array' | 'names' = 'object'
  ): {} {
    const kv = Object.entries(form.controls).filter((val) => val[1].dirty);
    const result = {
      object: () =>
        kv.reduce(
          (accum, val) => Object.assign(accum, { [val[0]]: val[1].value }),
          {}
        ),
      array: () => kv.map((val) => val[1]),
      names: () => kv.map((val) => val[0]),
    }[type]();
    return Object.assign(result, { id: form.get('id').value });
  }
}
