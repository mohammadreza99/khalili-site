import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import {
  BaseCity,
  BaseDistrict,
  BaseState,
  OrganizationModel,
  Profile,
  Password
} from '../model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  insertOrUpdateProfile(profile: Profile) {
    return this.post('/User/ProfileInsert/', profile, 'json');
  }

  insertOrUpdatePassword(password:Password) {
    return this.post('/User/SetOrChangePassword/', password, 'json');
  }

  insertOrUpdateOrganization(organization:OrganizationModel) {
    return this.post('/User/OrganizationInsert/', organization, 'json');
  }

  getProfileInfo() {
    return this.get<Profile>('/User/Profile/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getStates() {
    return this.get<BaseState[]>('/App/StateSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCities(stateId: any) {
    return this.get<BaseCity[]>(
      '/App/CitySelect/?stateId=' + stateId,
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getDistricts(cityId: any) {
    return this.get<BaseDistrict[]>(
      '/App/DistrictSelect/?cityId=' + cityId,
      'json'
    ).pipe(map((res: any) => res.data));
  }
  
  getJobs() {
    return this.get('/Base/Admin/JobSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }
  getOrganization() {
    return this.get('/User/Organization/', 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
