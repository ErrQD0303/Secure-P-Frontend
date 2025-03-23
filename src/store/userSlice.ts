import { IUser } from "../types/user";
import { Country } from "../types/enum";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { toPersonalInfo } from "../shared/mappers/users";

const initialState: IUser = {
  id: "",
  username: undefined,
  mobileNumber: "",
  fullName: "",
  email: "",
  country: Country.NOT_SET,
  dayOfBirth: undefined,
  city: "",
  addressLine1: "",
  addressLine2: "",
  postCode: "",
  licensePlateNumber: [],
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
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const getUserInfo = (state: RootState) => state.user;

export const getUsername = (state: RootState) => state.user.username;

export const getEmail = (state: RootState) => state.user.email;

export const getUserPersonal = (state: RootState) => toPersonalInfo(state.user);

export const getProfilesPersonalInfo = createSelector([getUserInfo], (user) =>
  toPersonalInfo(user)
);

export const getBillingAddress = (state: RootState) =>
  toPersonalInfo(state.user);
