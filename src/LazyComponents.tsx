import { lazy } from "react";

// Lazy loader
export const AppLayout = lazy(() => import("./layouts/AppLayout"));
export const Error = lazy(() => import("./pages/Error"));
export const Home = lazy(() => import("./pages/Home"));
export const PaymentHistory = lazy(() => import("./pages/PaymentHistory"));
export const MySubscriptions = lazy(() => import("./pages/MySubscriptions"));
export const DetailedSubscription = lazy(
  () => import("./pages/DetailedSubscription")
);
export const Login = lazy(() => import("./pages/Login"));
export const SignUp = lazy(() => import("./pages/SignUp"));
export const HelpCenter = lazy(() => import("./pages/HelpCenter"));
export const Settings = lazy(() => import("./pages/Settings"));
export const Profiles = lazy(() => import("./pages/Profiles"));
export const AddNewSubscription = lazy(
  () => import("./pages/AddNewSubscription")
);
export const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
export const Logout = lazy(() => import("./pages/Logout"));
export const ResendEmailConfirmation = lazy(
  () => import("./pages/ResendEmailConfirmation")
);
