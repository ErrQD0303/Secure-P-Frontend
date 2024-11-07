import { getNotifications } from "./features/notifications/indexesDB";
import { getSubscriptions } from "./services/subscriptionService";
import store from "./store/store";
import { setSubcription } from "./store/subscriptionSlice";

const loader = async () => {
  const subscriptions = await getSubscriptions("US1");
  store.dispatch(setSubcription(subscriptions));
  const notifications = await getNotifications();
  return { notifications };
};

export default loader;
