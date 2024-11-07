import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import AppLayout from "./layouts/AppLayout";
import homeLoader from "./pages/homeLoader";
import Home from "./pages/Home";
import appLoader from "./appLoader";
import PaymentHistory from "./pages/PaymentHistory";
import paymentHistoryLoader from "./pages/paymentHistoryLoader";

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
      },
      {
        path: "/payment-history",
        element: <PaymentHistory />,
        loader: paymentHistoryLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
