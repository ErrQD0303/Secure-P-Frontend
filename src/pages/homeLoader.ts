import { getSubscriptions } from "../services/subscriptionService";
import { FAKE_NOTIFICATIONS } from "../shared/constants/fakeNotifications";
import { setSubcription } from "../store/subscriptionSlice";
import store from "../store/store";

const loader = async () => {
  const subscriptions = await getSubscriptions("US1");
  store.dispatch(setSubcription(subscriptions));
  return {
    cards: subscriptions?.subscriptions,
    notifications: FAKE_NOTIFICATIONS,
  };
};

export default loader;
