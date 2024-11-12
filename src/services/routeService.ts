import { ROUTES } from "../shared/routes/routes";

export const getRouteName = (route: keyof typeof ROUTES, subPage?: string) => {
  if (route !== "/subscriptions") {
    return ROUTES[route];
  }
  if (!subPage) {
    return "My Subscriptions";
  }
  if (subPage === "add") {
    return "Add New Subscription";
  }
  return "Detailed Subscription";
};
