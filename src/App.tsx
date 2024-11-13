import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Suspense } from "react";
import Loader from "./components/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
