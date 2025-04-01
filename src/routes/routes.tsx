import { createBrowserRouter } from "react-router-dom";
import homeLoader from "../pages/homeLoader";
import appLoader from "../appLoader";
import paymentHistoryLoader from "../pages/paymentHistoryLoader";
import paymentHistoryAction from "../pages/paymentHistoryAction";
import mySubscriptionsLoader from "../pages/mySubscriptionsLoader";
import mySubscriptionsAction from "../pages/mySubscriptionsAction";
import detailedSubscriptionLoader from "../pages/detailedSubscriptionLoader";
import loginLoader from "../pages/loginLoader";
import loginAction from "../pages/loginAction";
import updateProfilePersonalInfoAction from "../pages/updateProfilePersonalInfoAction";
import updateProfilePasswordAction from "../pages/updatePasswordAction";
import addNewSubscriptionLoader from "../pages/addNewSubscriptionLoader";
import signUpAction from "../pages/signUpAction";
import resendEmailConfirmationAction from "../pages/resendEmailConfirmationAction";
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
  ProtectedRoute,
  Logout,
  ResendEmailConfirmation,
  PasswordReset,
  ForgotPassword,
  ManageParkingLocation,
  AddNewParkingLocation,
} from "../LazyComponents";
import addNewSubscriptionAction from "../pages/addNewSubscriptionAction";
import ForgotPasswordAction from "../pages/forgotPasswordAction";
import PasswordResetAction from "../pages/passwordResetAction";
import AddNewParkingLocationAction from "../pages/addNewParkingLocationAction";

export const routes = [
  {
    element: <ProtectedRoute redirectPath="/login" />,
    name: "ProtectedRoute",
    children: [
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
                action: addNewSubscriptionAction,
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
          {
            path: "/resend-email-confirmation",
            element: <ResendEmailConfirmation />,
            name: "Resend Email Confirmation",
            action: resendEmailConfirmationAction,
            errorElement: <Error />,
          },
          {
            path: "/parking-locations",
            errorElement: <Error />,
            children: [
              {
                index: true,
                element: <ManageParkingLocation />,
                name: "Manage Parking Locations",
                errorElement: <Error />,
              },
              {
                path: "add",
                element: <AddNewParkingLocation />,
                name: "Add New Parking Location",
                action: AddNewParkingLocationAction,
                errorElement: <Error />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/signup",
    name: "Sign Up",
    element: <SignUp />,
    action: signUpAction,
  },
  {
    path: "/logout",
    element: <Logout />,
    name: "Logout",
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    name: "Forgot Password",
    errorElement: <Error />,
    action: ForgotPasswordAction,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
    name: "Password Reset",
    errorElement: <Error />,
    action: PasswordResetAction,
  },
];

export const router = createBrowserRouter(routes);
