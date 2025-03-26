import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Suspense } from "react";
import Loader from "./components/Loader";
import CookieConsentBar from "./layouts/CookieConsentBar";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <CookieConsentBar />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
