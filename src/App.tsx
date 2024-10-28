import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
