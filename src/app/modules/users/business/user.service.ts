import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { Profile } from '../model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  insertOrUpdateProfile(profile: Profile) {
    return this.post('/User/ProfileInsert/', profile, 'json');
  }

  // insertOrUpdatePassword() {
  //   return this.post('/User/SetOrChangePassword/', profile, 'json');
  // }

  getProfileInfo() {
    return this.get<Profile>('/User/Profile/', 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
