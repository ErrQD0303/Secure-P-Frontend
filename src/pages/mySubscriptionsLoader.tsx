import { getAllSubscriptions } from "../services/subscriptionService";
import { ISubscriptionDetail } from "../types/subscription";

const loader = async () => {
  const { subscriptionDetails, isNextPageAvailable } =
    (await getAllSubscriptions({ userId: "US1" })) as {
      subscriptionDetails: ISubscriptionDetail[];
      isNextPageAvailable: boolean;
    };

  return {
    subscriptionDetails,
    isNextPageAvailable,
  };
};

export default loader;
