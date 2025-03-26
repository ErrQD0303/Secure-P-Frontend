// ../types/user.d.ts

import { Country } from "./country";

export interface IUser {
  id: string;
  username: string | undefined;
  mobileNumber: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  country: Country;
  dayOfBirth: Date | undefined;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  licensePlateNumber: string[];
}

export interface IRegisterUser {
  mobileNumber: string;
  fullName: string;
  email: string;
  country: Country;
  password: string;
  confirmPassword: string;
}

export interface IPersonalInfo {
  id: string;
  username: string | undefined;
  fullName: string;
  email: string;
  mobileNumber: string;
  dayOfBirth: Date | undefined;
}

export interface IBillingAddress {
  id: string;
  fullName: string;
  country: Country;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  licensePlateNumber: string;
}
