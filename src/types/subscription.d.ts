import { IProductType } from "./enum";
import { ParkingLocation, ParkingZone } from "./parking";

export interface ISubscription {
  id: string;
  userId: string;
  parkingZoneId: string;
  parkingLocationId: string;
  productType: IProductType;
  startDate: Date;
  endDate: Date;
  clampingFee: number;
  changeSignageFee: number;
}

export interface ISubscriptionDetail {
  id: string;
  userId: string;
  parkingZone: ParkingZone;
  parkingLocation: ParkingLocation;
  productType: IProductType;
  startDate: Date;
  endDate: Date;
  clampingFee: number;
  changeSignageFee: number;
}

export interface ISubscriptions {
  subscriptions: ISubscription[];
}

export interface ISubscriptionCard {
  id: string;
  expireDate: Date;
  licensePlate: string;
  parkingZone: string;
  parkingLocation: string;
  isPaid: boolean;
}
