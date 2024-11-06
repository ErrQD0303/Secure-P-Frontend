/* import { ISubscriptionDetail } from "../../types/subscription";
import { isISubscription } from "../helpers/subscriptions";

export const toSubscriptionDetail = (
  data: unknown
): ISubscriptionDetail | undefined => {
  if (!data || !isISubscription(data)) return undefined;
  return {
    id: data.id;
  userId: data.userId;
  parkingZone: ;
  parkingLocation: ParkingLocation;
  productType: IProductType;
  startDate: Date;
  endDate: Date;
  clampingFee: number;
  changeSignageFee: number;
  } as ISubscriptionDetail;
};
 */
