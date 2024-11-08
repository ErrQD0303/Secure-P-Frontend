import { LoaderFunctionArgs } from "react-router-dom";
import { getNotifications } from "./features/notifications/indexesDB";
import { getRouteName } from "./services/routeService";
import { getAllSubscriptions } from "./services/subscriptionService";
import store from "./store/store";
import { setSubcription } from "./store/subscriptionSlice";
import { ROUTES } from "./shared/routes/routes";
import { ISubscriptionDetail } from "./types/subscription";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { subscriptionDetails: subscriptions } = (await getAllSubscriptions({
    userId: "US1",
  })) as {
    subscriptionDetails: ISubscriptionDetail[];
    isNextPageAvailable: boolean;
  };
  store.dispatch(setSubcription(subscriptions));
  const notifications = await getNotifications();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [routeUrl, subPage, ..._] = request.url.split("/").slice(3);
  const routeName = getRouteName(
    `/${routeUrl}` as keyof typeof ROUTES,
    subPage
  );
  return { notifications, routeName };
};

export default loader;
