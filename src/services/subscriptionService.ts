import { FAKE_CARDS } from "../shared/constants/fakeCardData";
import store from "../store/store";
import { ISubscriptionDetail } from "../types/subscription";

export const getSubscriptions = async (
  userId: string
): Promise<ISubscriptionDetail[] | null> => {
  // replace with api call after
  const subscriptions = FAKE_CARDS.filter(
    ({ userId: elementId }) => userId === elementId
  );
  const subscriptionDetailData = subscriptions.map(
    (sub): ISubscriptionDetail =>
      ({
        id: sub.id,
        userId: sub.userId,
        parkingZone: store
          .getState()
          .parking.parkingZones.find(({ id }) => id === sub.parkingZoneId),
        parkingLocation: store
          .getState()
          .parking.parkingLocations.find(
            ({ id }) => id === sub.parkingLocationId
          ),
        productType: sub.productType,
        startDate: sub.startDate,
        endDate: sub.endDate,
        clampingFee: sub.clampingFee,
        changeSignageFee: sub.changeSignageFee,
        licensePlate: sub.licensePlate,
        isPaid: sub.isPaid,
      } as ISubscriptionDetail)
  );
  if (!subscriptionDetailData || subscriptionDetailData.length === 0)
    return null;
  return subscriptionDetailData;
};
