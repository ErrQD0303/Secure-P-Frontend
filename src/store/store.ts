import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import subscriptionReducer from "./subscriptionSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
