import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private readonly endPoint = '/User/Register/';
}
