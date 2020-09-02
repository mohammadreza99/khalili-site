import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/auth.model';
import { BaseService } from '@app/services/base.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private tokenSubject = new BehaviorSubject<string>(null);
  private readonly registerEndPoint = '/User/Register/';
  private readonly registerConformEndPoint = '/User/CheckOtpAndRegister/';

  register(mobileNo: string) {
    return this.post(`${this.registerEndPoint}`, { mobileNo }, 'json');
  }



  

  // login(user: User) {
  //   return this.post(`${this.endPoint}`, user, 'json');
  // }

  saveToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): string {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }
}
