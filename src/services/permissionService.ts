import { getAccessTokenFromCookie } from "./userService";

import { jwtDecode } from "jwt-decode";

export const getUserPermissions = () => {
  const accessToken = getAccessTokenFromCookie()?.slice("Bearer ".length);
  if (!accessToken) {
    return [];
  }

  const decoded = jwtDecode(accessToken) as { permission: string[] };
  return decoded.permission;
};
