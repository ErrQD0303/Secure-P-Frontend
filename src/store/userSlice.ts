import { IUser } from "../types/user";
import { AppPolicy, Country } from "../types/enum";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { toPersonalInfo } from "../shared/mappers/users";

const initialState: IUser & {
  avatarKey?: string | null;
} = {
  id: "",
  username: undefined,
  mobileNumber: "",
  fullName: "",
  email: "",
  emailConfirmed: true,
  country: Country.NOT_SET,
  dayOfBirth: undefined,
  city: "",
  addressLine1: "",
  addressLine2: "",
  postCode: "",
  licensePlateNumber: [],
  avatar: null,
  avatarKey: null,
  permissions: [],
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
    setAvatar: (state, action) => {
      return {
        ...state,
        avatar: action.payload,
        avatarKey: Date.now().toString(),
      };
    },
    setPermissions: (state, action) => {
      return { ...state, permissions: action.payload };
    },
  },
});

export const { setUser, clearUser, setAvatar, setPermissions } =
  userSlice.actions;

export default userSlice.reducer;

export const getUserInfo = (state: RootState) => state.user;

export const getUsername = (state: RootState) => state.user.username;

export const getEmail = (state: RootState) => state.user.email;

export const getFullName = (state: RootState) => state.user.fullName;

export const getUserPersonal = (state: RootState) => toPersonalInfo(state.user);

export const getProfilesPersonalInfo = createSelector([getUserInfo], (user) =>
  toPersonalInfo(user)
);

export const getAvatar = (state: RootState) => state.user.avatar;
export const getAvatarKey = (state: RootState) => state.user.avatarKey;

export const getBillingAddress = (state: RootState) =>
  toPersonalInfo(state.user);

export const isAuthenticated = (state: RootState) => !!state.user.id;

export const isEmailConfirmed = (state: RootState) => state.user.emailConfirmed;

export const getUserPermissions = (state: RootState) =>
  state.user.permissions || [];

export const getUserRoles = (state: RootState) => state.user.roles || [];

export const isPermissionGranted = (permission: AppPolicy) => {
  return (state: RootState) => {
    const permissions = state.user.permissions || [];
    return permissions.includes(permission);
  };
};
