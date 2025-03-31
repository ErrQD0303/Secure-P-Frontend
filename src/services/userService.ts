import axios from "axios";
import { IRegisterUser, IUser } from "../types/user";
import CookieName from "../shared/constants/cookieName";

export const register = async (
  user: IRegisterUser
): Promise<IRegisterResponse> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const registerUrl = backendUrl + import.meta.env.VITE_USER_REGISTER_URL;

  const registerRequest = {
    full_name: user.fullName,
    email: user.email,
    phone_number: user.mobileNumber,
    country: user.country,
    day_of_birth: new Date(),
    password: user.password,
  };

  let response;

  try {
    response = await axios.post(registerUrl, registerRequest);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw new Error("Unknown error occurred");
  }
};

export const login = async (
  email: string | undefined,
  username: string | undefined,
  phone: string | undefined,
  password: string
): Promise<ILoginResponse | boolean> => {
  if (email) {
    const loginRequest: {
      email?: string;
      username?: string;
      phone?: string;
      password: string;
    } = {
      email,
      password,
    };

    return loginWithType(LoginType.Email, loginRequest);
  }

  if (username) {
    const loginRequest: {
      email?: string;
      username?: string;
      phone?: string;
      password: string;
    } = {
      username,
      password,
    };
    return loginWithType(LoginType.Username, loginRequest);
  }

  if (phone) {
    const loginRequest: {
      email?: string;
      username?: string;
      phone?: string;
      password: string;
    } = {
      phone,
      password,
    };
    return loginWithType(LoginType.Phone, loginRequest);
  }

  return false;
};

const loginWithType = async (
  loginType: LoginType,
  loginRequest: {
    email?: string;
    username?: string;
    phone?: string;
    password: string;
  }
): Promise<ILoginResponse> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loginUrl =
    backendUrl +
    import.meta.env.VITE_USER_LOGIN_URL +
    "?loginType=" +
    loginType;

  let response;
  try {
    response = await axios.post(loginUrl, loginRequest, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }

  return response!.data;
};

export const otpLogin = async (loginRequest: {
  email: string;
  otp: string | number;
}): Promise<ILoginResponse> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loginOtpUrl = backendUrl + import.meta.env.VITE_USER_LOGIN_OTP_URL;

  let response;
  try {
    loginRequest.email = decodeURIComponent(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(CookieName.TEMPORARY_EMAIL))
        ?.split("=")[1] || ""
    );
    console.log(loginRequest.email);
    response = await axios.post(loginOtpUrl, loginRequest, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }

  return response!.data;
};

export const getAccessTokenFromCookie = (): string | undefined => {
  return `Bearer ${
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(CookieName.ACCESS_TOKEN))
      ?.split("=")[1]
  }`;
};

export const getUserInfoFromDB = async (): Promise<IUser> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const userInfoUrl = backendUrl + import.meta.env.VITE_USER_INFO_URL;

  let response;
  try {
    const tokens = getAccessTokenFromCookie();
    response = await axios.get(userInfoUrl, {
      withCredentials: true,
      headers: {
        Authorization: tokens,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith(CookieName.REFRESH_TOKEN))
        ?.split("=")[1];

      if (refreshToken) {
        if (await getNewAccessToken(refreshToken)) {
          return getUserInfoFromDB();
        }
      }

      return error.response?.data.user;
    }
    throw error;
  }

  return response!.data.user;
};

export const getNewAccessToken = async (
  refreshToken: string
): Promise<boolean> => {
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const refreshUrl = backendUrl + import.meta.env.VITE_TOKEN_REFRESH_URL;

  try {
    await axios.post(
      refreshUrl,
      {
        refresh_token: refreshToken,
      },
      {
        withCredentials: true,
      }
    );
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return false;
    }
    throw error;
  }
};

export const logOut = async (): Promise<boolean> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const logoutUrl = backendUrl + import.meta.env.VITE_USER_LOGOUT_URL;

  try {
    await axios.post(
      logoutUrl,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: getAccessTokenFromCookie(),
        },
      }
    );
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return false;
    }
    throw error;
  }
};

export const resendEmailConfirmation = async (
  email: string
): Promise<IEmailConfirmationError | null> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const resendUrl =
    backendUrl + import.meta.env.VITE_USER_RESEND_CONFIRMATION_EMAIL_URL;

  try {
    axios.post(
      resendUrl,
      { email },
      {
        withCredentials: true,
        headers: {
          Authorization: getAccessTokenFromCookie(),
        },
      }
    );

    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }
};

export const updateProfilePersonalInfo = async (
  updateInfo: IUpdateProfilePersonalInfoRequest
): Promise<IUpdateProfilePersonalInfoError | null> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const updateProfilePersonalInfoUrl =
    backendUrl + import.meta.env.VITE_USER_UPDATE_PROFILE_URL;

  try {
    const tokens = getAccessTokenFromCookie();
    await axios.put(updateProfilePersonalInfoUrl, updateInfo, {
      withCredentials: true,
      headers: {
        Authorization: tokens,
      },
    });

    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.errors;
    }
    throw error;
  }
};

export const updatePassword = async (
  updatePasswordRequest: IUpdatePasswordRequest
): Promise<IUpdatePasswordError | null> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const updatePasswordUrl =
    backendUrl + import.meta.env.VITE_USER_UPDATE_PASSWORD_URL;

  try {
    const tokens = getAccessTokenFromCookie();
    await axios.put(updatePasswordUrl, updatePasswordRequest, {
      withCredentials: true,
      headers: {
        Authorization: tokens,
      },
    });

    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.errors;
    }
    throw error;
  }
};

export const forgotPassword = async (
  email: string
): Promise<IForgotPasswordResponse | null> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const forgotPasswordUrl =
    backendUrl + import.meta.env.VITE_USER_FORGOT_PASSWORD_URL;

  try {
    const response = await axios.post(forgotPasswordUrl, {
      email,
      redirectUrl: import.meta.env.VITE_FRONTEND_URL + "/password-reset",
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error?.response) {
      return error?.response?.data;
    }

    return {
      statusCode: 500,
      success: false,
      message:
        "Unknown error occurred. Server may be down. Please try again later.",
      errors: {},
    };
  }
};

export const passwordReset = async (
  request: IPasswordResetRequest
): Promise<IPasswordResetResponse | null> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const passwordResetUrl =
    backendUrl + import.meta.env.VITE_USER_RESET_PASSWORD_URL;

  try {
    const response = await axios.post(passwordResetUrl, request);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return {
      statusCode: 500,
      success: false,
      message: "Unknown error occurred",
      errors: {},
    };
  }
};

export interface IUserParkingSubscriptionRequest {
  product_type: number;
  parking_location: string;
  parking_zone: string;
  start_date: Date;
  end_date: Date;
  change_signage_fee: boolean;
  clamping_fee: boolean;
}

export interface IUserParkingSubscriptionResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: IUserParkingSubscriptionError;
}

export interface IUserParkingSubscriptionError {
  summary?: string;
  product_type?: string;
  parking_location?: string;
  parking_zone?: string;
  start_date?: string;
  end_date?: string;
  change_signage_fee?: string;
  clamping_fee?: string;
}

export interface IPasswordResetRequest {
  email: string;
  password: string;
  confirm_password: string;
  token: string;
}

export interface IPasswordResetResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: IPasswordResetError;
}

export interface IPasswordResetError {
  summary?: string;
  email?: string;
  token?: string;
  password?: string;
  confirm_password?: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: IForgotPasswordError;
}

export interface IForgotPasswordError {
  summary?: string;
  email?: string;
}

export interface IUpdateProfilePersonalInfoRequest {
  email?: string;
  phone_number?: string;
  day_of_birth?: Date;
}

export interface IUpdateProfilePersonalInfoResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: IUpdateProfilePersonalInfoError;
  user: IUser;
}

export interface IUpdatePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface IUpdatePasswordResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: IUpdatePasswordError;
}

export interface IUpdatePasswordError {
  summary?: string;
  CurrentPassword?: string;
  NewPassword?: object;
  ConfirmPassword?: string;
}

export interface IUpdateProfilePersonalInfoError {
  summary?: string;
  Email?: string;
  Phone?: string;
  DayOfBirth?: string;
}

enum LoginType {
  Email = 0,
  Username = 1,
  Phone = 2,
}

export interface ILoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: ILoginError;
  user: IUser;
}

export interface IRegisterResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errors: IRegisterError;
  user: IUser;
}

export interface IRegisterError {
  summary?: string;
  FullName?: string;
  Email?: string;
  PhoneNumber?: string;
  Country?: string;
  Password?: string;
  ConfirmPassword?: string;
}

export interface IEmailConfirmationError {
  summary?: string;
  email?: string;
}

export interface ILoginError {
  summary?: string;
  email?: string;
  password?: string;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
