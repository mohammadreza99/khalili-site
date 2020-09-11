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

export class AddressModel {
  id?:number;
  stateId?:number;
  stateTitle?:string;
  cityId?:number;
  cityTitle?:string;
  districtId?:number;
  districtTitle?:string;
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

export class BaseJob {
  id: Object;
  title: string;
  isActive: boolean;
}