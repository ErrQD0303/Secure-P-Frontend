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

export const getAllSubscriptionDetails = (state: RootState) =>
  state.subscription.subscriptions;

export const getSubscriptionDetail = (id: string) => (state: RootState) =>
  state.subscription.subscriptions.find(
    ({ id: elementId }) => id === elementId
  );

export const getPaymentDetails =
  (limit: number = 5) =>
  (state: RootState) => ({
    paymentDetails: state.subscription.subscriptions
      .filter(({ isPaid }) => isPaid)
      .slice(0, limit),
    isNextPageAvailable: state.subscription.subscriptions.length > limit,
  });
