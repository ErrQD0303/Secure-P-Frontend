import { getSubscriptions } from "../services/subscriptionService";
import store from "../store/store";

const loader = async () => {
  const paymentDetails = (await getSubscriptions("US1"))?.filter(
    ({ isPaid }) => isPaid
  );
  const isNextPageAvailable =
    store.getState().subscription.subscriptions.length > 5;
  return { paymentDetails, isNextPageAvailable };
};

export default loader;
