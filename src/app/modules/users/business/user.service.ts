import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import {
  BaseCity,
  BaseDistrict,
  BaseState,
  OrganizationModel,
  Profile,
  Password,
  AddressModel,
} from '../model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getMenu() {
    return this.get('/V1/Menu/', 'json').pipe(map((res: any) => res.data));
  }

  getProfileInfo() {
    return this.get<Profile>('/V1/Profile/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertOrUpdateProfile(profile: Profile) {
    return this.post('/V1/ProfileInsert/', profile, 'json');
  }

  getOrganization() {
    return this.get('/V1/Organization/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertOrUpdateOrganization(organization: OrganizationModel) {
    return this.post('/V1/OrganizationInsert/', organization, 'json');
  }

  getAddresses() {
    return this.get('/V1/Address/', 'json').pipe(map((res: any) => res.data));
  }

  insertAddress(address: AddressModel) {
    return this.post('/V1/AddressInsert/', address, 'json');
  }

  updateAddress(address: AddressModel) {
    return this.put('/V1/AddressUpdate/', address, 'json');
  }

  getStates() {
    return this.get<BaseState[]>('/V1/StateSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCities(stateId?: any) {
    return this.get<BaseCity[]>(
      '/V1/CitySelect/?stateId=' + stateId,
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getDistricts(cityId?: any) {
    return this.get<BaseDistrict[]>(
      '/V1/DistrictSelect/?cityId=' + cityId,
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getJobs() {
    return this.get('/Base/Admin/JobSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertOrUpdatePassword(password: Password) {
    return this.post('/User/SetOrChangePassword/', password, 'json');
  }


  getOrderStateSelect() {
    return this.get('/V1/OrderStateSelect/' , 'json').pipe(
      map((res: any) => res.data)
    );
  }
  getOrderInfo(id) {
    return this.get('/V1/OrderFinal/?orderSateId='+id , 'json').pipe(
      map((res: any) => res.data)
    );
  }
  getOrderProducts(id) {
    return this.get('/V1/OrderProduct/?orderId='+id , 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
