import { createBrowserRouter } from "react-router-dom";
import homeLoader from "../pages/homeLoader";
import appLoader from "../appLoader";
import paymentHistoryLoader from "../pages/paymentHistoryLoader";
import paymentHistoryAction from "../pages/paymentHistoryAction";
import mySubscriptionsLoader from "../pages/mySubscriptionsLoader";
import mySubscriptionsAction from "../pages/mySubscriptionsAction";
import detailedSubscriptionLoader from "../pages/detailedSubscriptionLoader";
import loginAction from "../pages/loginAction";
import updateProfilePersonalInfoAction from "../pages/updateProfilePersonalInfoAction";
import updateProfilePasswordAction from "../pages/updatePasswordAction";
import addNewSubscriptionLoader from "../pages/addNewSubscriptionLoader";
import {
  AppLayout,
  Error,
  Home,
  PaymentHistory,
  HelpCenter,
  MySubscriptions,
  DetailedSubscription,
  Settings,
  Profiles,
  Login,
  SignUp,
  AddNewSubscription,
} from "../LazyComponents";

export const routes = [
  {
    element: <AppLayout />,
    loader: appLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        name: "Home",
        loader: homeLoader,
        errorElement: <Error />,
      },
      {
        path: "/payment-history",
        element: <PaymentHistory />,
        name: "Payment History",
        loader: paymentHistoryLoader,
        action: paymentHistoryAction,
        errorElement: <Error />,
      },
      {
        path: "/help-center",
        name: "Help Center",
        element: <HelpCenter />,
      },
      {
        path: "/subscriptions",
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <MySubscriptions />,
            name: "My Subscriptions",
            loader: mySubscriptionsLoader,
            action: mySubscriptionsAction,
            errorElement: <Error />,
          },
          {
            path: "add",
            element: <AddNewSubscription />,
            name: "Add New Subscription",
            loader: addNewSubscriptionLoader,
            errorElement: <Error />,
          },
          {
            path: ":id",
            element: <DetailedSubscription />,
            name: "Detailed Subscription",
            loader: detailedSubscriptionLoader,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
        name: "Settings",
      },
      {
        path: "/profiles",
        element: <Profiles />,
        name: "Profiles",
        errorElement: <Error />,
        children: [
          {
            path: "update-personal-info",
            action: updateProfilePersonalInfoAction,
            errorElement: <Error />,
          },
          {
            path: "update-password",
            action: updateProfilePasswordAction,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/signup",
    name: "Sign Up",
    element: <SignUp />,
  },
];

export const router = createBrowserRouter(routes);
