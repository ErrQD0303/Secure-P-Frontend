import { RouteObject } from "react-router-dom";
import { routes } from "../routes/routes";

export const getRouteName = async (
  sourceUrl: string
): Promise<string | undefined> => {
  let currentRoute: Array<RouteObject & { name?: string }> = routes;
  const routeSegments = sourceUrl
    .split("/")
    .slice(1)
    .map((segment) =>
      segment.includes("?") ? segment.split("?")[0] : segment
    );
  routeSegments[0] = `/${routeSegments[0]}`;
  routeSegments.unshift("");
  // /
  // /subscriptions
  // /subscriptions/1
  // /subscriptions/add
  // solution: convert them to array
  // Use pointer and loop through the routeSegments
  let currentSegment: number = 0;
  let path: (RouteObject & { name?: string }) | undefined = undefined;
  let routeName: string | undefined = undefined;
  while (!routeName && currentSegment < routeSegments.length) {
    path = currentRoute?.find(
      (route) =>
        route.path === routeSegments[currentSegment] ||
        (routeSegments[currentSegment] === "" && !route?.path)
    );
    if (path?.name) routeName = path.name;
    const nextCurrentRoute = path?.children as Array<
      RouteObject & { name?: string }
    >;
    if (!nextCurrentRoute) {
      routeName = currentRoute?.find((route) =>
        route.path?.startsWith(":")
      )?.name;
    }
    currentRoute = nextCurrentRoute;
    ++currentSegment;
  }
  if (routeName) return routeName;
  return currentRoute?.find((route) => route.path === "" || route?.index)?.name;
};
