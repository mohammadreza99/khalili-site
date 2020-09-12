export class Profile {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  nationalCode: string;
  birthDate: string;
  jobId: number;
  cardNumber: string;
}

export class AddressInsertModel {
  lat: number;
  lng: number;
  districtId: number;
  address: string;
  plaque: number;
  unit: number;
  postalCode: string;
  isReceiver: boolean;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobileNo: string;
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
