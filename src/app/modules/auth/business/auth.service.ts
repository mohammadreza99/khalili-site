import { Injectable } from '@angular/core';

import {
  User,
  CheckOtpModel,
  CheckPasswordModel,
  ChangePasswordModel,
} from '../model/auth.model';
import { BaseService } from '@app/services/base.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private router: Router) {
    super();
  }
  register(mobileNo: string) {
    return this.post('/User/Register/', { mobileNo }, 'json');
  }

  checkOtp(checkOtp: CheckOtpModel) {
    return this.post('/User/CheckOtpAndRegister/', checkOtp, 'json');
  }

  checkPass(checkPass: CheckPasswordModel) {
    return this.post('/User/CheckPassword/', checkPass, 'json');
  }

  forgetPass(mobileNo: string) {
    return this.post('/User/ForgetPassword/', { mobileNo }, 'json');
  }

  changePass(changePass: ChangePasswordModel) {
    return this.post(' /User/SetOrChangePassword/', changePass, 'json');
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
    localStorage.removeItem('token');
    localStorage.removeItem('paid-products');
    localStorage.removeItem('submitted-products');
    this.router.navigate(['/']);
    window.location.reload();
  }
}
