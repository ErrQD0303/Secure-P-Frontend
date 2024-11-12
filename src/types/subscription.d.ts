// ../types/subscription.d.ts
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
  subscriptionFee: number;
  clampingFee: number;
  changeSignageFee: number;
  isPaid: boolean;
  licensePlate: string;
  paymentDate?: Date;
}

export interface ISubscriptionDetail {
  id: string;
  userId: string;
  parkingZone: ParkingZone;
  parkingLocation: ParkingLocation;
  productType: IProductType;
  startDate: Date;
  endDate: Date;
  subscriptionFee: number;
  clampingFee: number;
  changeSignageFee: number;
  isPaid: boolean;
  licensePlate: string;
  paymentDate?: Date;
}

export interface ISubscriptions {
  subscriptions: ISubscriptionDetail[];
}

export interface ISubscriptionCard {
  id: string;
  expireDate: Date;
  licensePlate: string;
  parkingZone: string;
  parkingLocationId: string;
  parkingLocation: string;
  isPaid: boolean;
}
