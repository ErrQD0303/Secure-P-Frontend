import { IBillingAddress, IPersonalInfo, IUser } from "../../types/user";

export const toPersonalInfo = (user: IUser): IPersonalInfo => ({
  id: user.id,
  username: user.username,
  email: user.email,
  mobileNumber: user.mobileNumber,
  dayOfBirth: user.dayOfBirth,
});

export const toBillingAddress = (user: IUser): IBillingAddress => ({
  id: user.id,
  fullName: user.fullName,
  country: user.country,
  city: user.city,
  addressLine1: user.addressLine1,
  addressLine2: user.addressLine2,
  postCode: user.postCode,
  licensePlateNumber: user.licensePlateNumber,
});
