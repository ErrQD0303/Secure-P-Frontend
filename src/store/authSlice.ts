import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IAuth,
  IEmailCredentials,
  IUserCredentials,
  IUsernameCredentials,
} from "../types/auth";
import store from "./store";
import { clearUser } from "./userSlice";
import {
  fakeLogin,
  fakeTwoFactorsValidation,
  isLoginWithEmail,
  isLoginWithUsername,
} from "../shared/helpers/auths";

const initialState: IAuth = {
  status: "idle",
  error: null,
  token: null,
  twoFactorRequired: false,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: IUserCredentials, { rejectWithValue }) => {
    let loginCredentials;
    if (isLoginWithUsername(credentials)) {
      loginCredentials = credentials as IUsernameCredentials;
      const token = fakeLogin({ ...loginCredentials });
      if (!token) throw new Error("Invalid Username or Password");
      return token;
    } else if (isLoginWithEmail(credentials)) {
      loginCredentials = credentials as IEmailCredentials;
      const token = fakeLogin({ ...loginCredentials });
      if (!token) throw new Error("Invalid Email or Password");
      return token;
    }
    return rejectWithValue("Login Method Invalid");
  }
);

export const validateTwoFactor = createAsyncThunk(
  "auth/validateTwoFactor",
  async (code: string, { rejectWithValue }) => {
    if (!code || !fakeTwoFactorsValidation(code))
      return rejectWithValue("Invalid Two Factor Code");
    return true;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => {
      store.dispatch(clearUser());
      return { ...initialState, status: "idle" } as IAuth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.token = null;
        state.twoFactorRequired = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "unauthenticated";
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "error";
        state.error = (action.error.message as string) ?? "Login Failed";
      })
      .addCase(validateTwoFactor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(validateTwoFactor.fulfilled, (state) => {
        state.status = "authenticated";
        state.twoFactorRequired = false;
      })
      .addCase(validateTwoFactor.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.error.message as string) ??
          "Validation Failed, please try again";
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
