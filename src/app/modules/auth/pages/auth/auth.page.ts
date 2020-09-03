import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../business/auth.service';
import { CheckOtpModel } from '../../model/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  showRegister = true;
  showLoginConfirm = false;
  showRegisterConfirm = false;
  showForget = false;
  registerForm = new FormGroup({
    control: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{11}'),
    ]),
  });

  registerConfirmForm = new FormGroup({
    control: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitRegister() {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.get('control').value)
        .subscribe((res: any) => {
          if (res.success) {
            this.showRegister = false;
            if (res.data.isSendSMS) {
              this.showRegisterConfirm = true;
            } else if (!res.data.isSendSMS) {
              this.showLoginConfirm = true;
            }
          }
        });
    }
  }

  onSubmitRegisterConfirm() {
    if (this.registerForm.valid) {
      const checkOtp: CheckOtpModel = {
        mobileNo: this.registerForm.get('control').value,
        oTPcode: this.registerConfirmForm.get('control').value,
      };
      this.authService.checkOtp(checkOtp).subscribe((res: any) => {
        if (res.success && res.data.token) {
          this.authService.saveToken(res.data.token);
          this.showRegisterConfirm = false;
          this.router.navigate(['/']);
        }
      });
    }
  }

  ngOnInit(): void {}
}
