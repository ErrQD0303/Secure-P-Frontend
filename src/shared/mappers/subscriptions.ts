import store from "../../store/store";
import { ISubscriptionDetail } from "../../types/subscription";
import { isISubscription } from "../helpers/subscriptions";

export const toSubscriptionDetail = (data: unknown): ISubscriptionDetail => {
  if (!data || !isISubscription(data)) throw new Error("Invalid data");
  return {
    id: data.id,
    userId: data.userId,
    parkingZone: store
      .getState()
      .parking.parkingZones.find(({ id }) => id === data.parkingZoneId),
    parkingLocation: store
      .getState()
      .parking.parkingLocations.find(({ id }) => id === data.parkingLocationId),
    productType: data.productType,
    startDate: data.startDate,
    endDate: data.endDate,
    clampingFee: data.clampingFee,
    changeSignageFee: data.changeSignageFee,
    licensePlate: data.licensePlate,
    isPaid: data.isPaid,
    paymentDate: data.paymentDate,
    subscriptionFee: data.subscriptionFee,
  } as ISubscriptionDetail;
};
