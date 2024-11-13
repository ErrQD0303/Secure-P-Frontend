import { LoaderFunctionArgs } from "react-router-dom";
import { getNotifications } from "./features/notifications/indexesDB";
import { getRouteName } from "./services/routeService";
import { getAllSubscriptions } from "./services/subscriptionService";
import store from "./store/store";
import { setSubcription } from "./store/subscriptionSlice";
import { ISubscriptionDetail } from "./types/subscription";
import { setUser } from "./store/userSlice";
import { Country } from "./types/enum";
import { cleanRouteName } from "./shared/helpers/strings";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { subscriptionDetails: subscriptions } = (await getAllSubscriptions({
    userId: "US1",
  })) as {
    subscriptionDetails: ISubscriptionDetail[];
    isNextPageAvailable: boolean;
  };
  store.dispatch(setSubcription(subscriptions));
  const currentUser = localStorage.getItem("userInfo");
  if (!currentUser)
    store.dispatch(
      setUser({
        id: "US1",
        username: "datvipcrvn",
        mobileNumber: "0339482105",
        fullName: "Nguyễn Quốc Đạt",
        email: "datvipcrvn@gmail.com",
        country: Country.VN,
        dayOfBirth: new Date("03/03/1996"),
        city: "HCM",
        addressLine1: "123",
        addressLine2: "123",
        postCode: "1111111",
        licensePlateNumber: "79A-16109",
      })
    );
  else {
    const userFromDB = JSON.parse(currentUser);
    userFromDB.dayOfBirth = new Date(userFromDB.dayOfBirth);
    store.dispatch(setUser(userFromDB));
  }
  const notifications = await getNotifications();
  const routeName = await getRouteName(cleanRouteName(request.url));
  return { notifications, routeName };
};

export default loader;
