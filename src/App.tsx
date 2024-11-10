import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import AppLayout from "./layouts/AppLayout";
import homeLoader from "./pages/homeLoader";
import Home from "./pages/Home";
import appLoader from "./appLoader";
import PaymentHistory from "./pages/PaymentHistory";
import paymentHistoryLoader from "./pages/paymentHistoryLoader";
import paymentHistoryAction from "./pages/paymentHistoryAction";
import MySubscriptions from "./pages/MySubscriptions";
import mySubscriptionsLoader from "./pages/mySubscriptionsLoader";
import mySubscriptionsAction from "./pages/mySubscriptionsAction";
import DetailedSubscription from "./pages/DetailedSubscription";
import detailedSubscriptionLoader from "./pages/detailedSubscriptionLoader";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HelpCenter from "./pages/HelpCenter";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: appLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
        errorElement: <Error />,
      },
      {
        path: "/payment-history",
        element: <PaymentHistory />,
        loader: paymentHistoryLoader,
        action: paymentHistoryAction,
        errorElement: <Error />,
      },
      {
        path: "/help-center",
        element: <HelpCenter />,
      },
      {
        path: "/subscriptions",
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <MySubscriptions />,
            loader: mySubscriptionsLoader,
            action: mySubscriptionsAction,
            errorElement: <Error />,
          },
          {
            path: ":id",
            element: <DetailedSubscription />,
            loader: detailedSubscriptionLoader,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
