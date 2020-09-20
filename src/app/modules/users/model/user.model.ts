export class Profile {
  constructor() {
    this.avatar = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.nationalCode = null;
    this.birthDate = null;
    this.jobId = null;
    this.cardNumber = null;
  }
  avatar: string;
  firstName: string;
  lastName: string;
  mobileNo?: string;
  email: string;
  nationalCode: string;
  birthDate: string;
  jobId: number;
  cardNumber: string;
  isPassword?: boolean;
}

export class AddressModel {
  id?: number;
  stateId?: number;
  stateTitle?: string;
  cityId?: number;
  cityTitle?: string;
  districtId?: number;
  districtTitle?: string;
  lat?: number;
  lng?: number;
  address?: string;
  plaque?: number;
  unit?: number;
  postalCode?: string;
  isReceiver?: boolean;
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  mobileNo?: string;
}

export class Password {
  password: string;
  oldPassword: string;
}

export class BaseState {
  id: Object;
  title: string;
}

export class BaseCity {
  id: Object;
  stateId: number;
  title: string;
}

export class BaseDistrict {
  id: Object;
  cityId: number;
  title: string;
}

export class BaseJob {
  id: Object;
  title: string;
  isActive: boolean;
}
export class OrganizationModel {
  id?: number;
  name: string;
  economicCode: string;
  registrationId: string;
  nationalId: string;
  telNumber: string;
  cityId: number;
}
