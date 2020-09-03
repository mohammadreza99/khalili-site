import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, CheckOtpModel } from '../model/auth.model';
import { BaseService } from '@app/services/base.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  register(mobileNo: string) {
    return this.post('/User/Register/', { mobileNo }, 'json');
  }

  checkOtp(checkOtp: CheckOtpModel) {
    return this.post('/User/CheckOtpAndRegister/', checkOtp, 'json');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  logout() {
    localStorage.clear();
  }
}
