import { createSlice } from "@reduxjs/toolkit";
import { ISubscriptions } from "../types/subscription";

const initialState: ISubscriptions = {
  subscriptions: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubcription: (state, action) => {
      state.subscriptions = action.payload;
    },
    clearSubscription: () => {
      return initialState;
    },
  },
});

export const { setSubcription: setUser, clearSubscription: clearUser } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;

// export const getSubscriptionsDetail = (state: RootState) => state.subscription;
