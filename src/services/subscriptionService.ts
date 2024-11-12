import { FAKE_CARDS } from "../shared/constants/fakeCardData";
import { toSubscriptionDetail } from "../shared/mappers/subscriptions";
import { ISubscriptionDetail } from "../types/subscription";

export const getAllSubscriptions = async ({
  userId,
  limit = 6,
  offset = 0,
  isPaid = false,
}: {
  userId: string;
  limit?: number;
  offset?: number;
  isPaid?: boolean;
}): Promise<{
  subscriptionDetails: ISubscriptionDetail[];
  isNextPageAvailable: boolean;
} | null> => {
  // replace with api call after
  const fetchedSubscriptions = FAKE_CARDS.filter(
    ({ userId: elementId }) => userId === elementId
  ).filter(({ isPaid: elementIsPaid }) => (isPaid ? elementIsPaid : true));
  const subscriptions = fetchedSubscriptions.slice(
    offset * limit,
    limit + limit * offset
  );

  const subscriptionDetailData = subscriptions.map(
    (sub): ISubscriptionDetail => toSubscriptionDetail(sub)
  );
  const isNextPageAvailable =
    fetchedSubscriptions.length > limit + limit * offset;

  if (!subscriptionDetailData || subscriptionDetailData.length === 0)
    return null;

  return {
    subscriptionDetails: subscriptionDetailData,
    isNextPageAvailable,
  };
};

export const getSubscription = async (
  id: string
): Promise<ISubscriptionDetail> => {
  if (!id) throw new Error("Invalid id");

  // replace with api call after
  const subscription = FAKE_CARDS.find(({ id: elementId }) => id === elementId);

  if (!subscription) throw new Error("Invalid id");

  return toSubscriptionDetail(subscription);
};
