import { LoaderFunctionArgs } from "react-router-dom";
import { getNotifications } from "./features/notifications/indexesDB";
import { getRouteName } from "./services/routeService";
import { getAllSubscriptions } from "./services/subscriptionService";
import store from "./store/store";
import { setSubcription } from "./store/subscriptionSlice";
import { ISubscriptionDetail } from "./types/subscription";
import { setUser } from "./store/userSlice";
import { cleanRouteName } from "./shared/helpers/strings";
import { getUserInfoFromDB } from "./services/userService";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { subscriptionDetails: subscriptions } = (await getAllSubscriptions({
    userId: "US1",
  })) as {
    subscriptionDetails: ISubscriptionDetail[];
    isNextPageAvailable: boolean;
  };
  store.dispatch(setSubcription(subscriptions));
  const currentUser = await getUserInfoFromDB();

  // currentUser.dayOfBirth = new Date(currentUser.dayOfBirth);
  store.dispatch(setUser(currentUser));

  const notifications = await getNotifications();
  const routeName = await getRouteName(cleanRouteName(request.url));
  return { notifications, routeName };
};

export default loader;
