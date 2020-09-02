import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../business/auth.service';

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
    control: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{11}'),
    ]),
  });

  constructor(private authService: AuthService) {}

  onSubmitRegister(formEl) {
    formEl.target.classList.add('was-validated');
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.get('control').value)
        .subscribe((res: any) => {
          if (res.success) {
            if (res.data.isNewUser && res.data.isSendSMS) {
              this.showRegister = false;
              this.showRegisterConfirm = true;
            }
          }
        });
    }
  }

  onSubmitRegisterConfirm(formEl) {
    formEl.target.classList.add('was-validated');
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.get('control').value)
        .subscribe((res: any) => {
          if (res.success) {
            if (res.data.isNewUser && res.data.isSendSMS) {
              this.showRegister = false;
              this.showRegisterConfirm = true;
            }
          }
        });
    }
  }

  showError(formGroup: FormGroup, errorType: string) {
    return (
      (formGroup.get('control').touched || formGroup.get('control').dirty) &&
      formGroup.get('control').hasError(errorType)
    );
  }

  ngOnInit(): void {}
}
