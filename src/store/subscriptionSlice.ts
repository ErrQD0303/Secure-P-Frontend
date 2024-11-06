import { createSlice } from "@reduxjs/toolkit";
import { ISubscriptions } from "../types/subscription";
import { RootState } from "./store";

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

export const { setSubcription, clearSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const getSubscriptionDetail = (id: string) => (state: RootState) =>
  state.subscription.subscriptions.find(
    ({ id: elementId }) => id === elementId
  );
