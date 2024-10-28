import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    element: <Error />,
    errorElement: <Error />,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
