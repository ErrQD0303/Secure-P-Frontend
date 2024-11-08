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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
