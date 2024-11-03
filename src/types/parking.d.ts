import { ISubscription } from "./subscription";

export interface IParkingZone {
  id: string;
  name: string;
  subscriptions: ISubscription[];
}

// ../types/parking.d.ts
export interface IParkingRates {
  hourly: number;
  daily: number;
  monthly: number;
}

export interface IParkingLocation {
  id: string;
  name: string;
  address: string;
  capacity: number;
  availableSpaces: number;
  rates: IParkingRates;
}

export interface IParkingLocations {
  parkingLocations: IParkingLocation[];
}
