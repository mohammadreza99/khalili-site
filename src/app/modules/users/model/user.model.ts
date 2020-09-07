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
