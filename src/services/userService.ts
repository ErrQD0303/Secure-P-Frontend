import axios from "axios";
import { IRegisterUser, IUser } from "../types/user";
import CookieName from "../shared/constants/cookieName";

export const register = async (user: IRegisterUser): Promise<IUser> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const registerUrl = backendUrl + import.meta.env.VITE_USER_REGISTER_URL;

  const registerRequest = {
    email: user.email,
    password: user.password,
    phone_number: user.mobileNumber,
    username: user.username,
    full_name: user.fullName,
    address_line1: user.addressLine1 ?? "",
    address_line2: user.addressLine2,
    city: user.city ?? "",
    country: user.country,
    day_of_birth: user.dayOfBirth ?? "",
    post_code: user.postCode,
    license_plates: user.licensePlateNumber,
  };

  const response = await axios.post(registerUrl, registerRequest);

  if (response.status !== 201) {
    console.error(response);
    throw new Error("Failed to register");
  }

  return response.data;
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

export const getUserInfoFromDB = async (): Promise<IUser> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const userInfoUrl = backendUrl + import.meta.env.VITE_USER_INFO_URL;

  let response;
  try {
    const tokens = `Bearer ${
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(CookieName.ACCESS_TOKEN))
        ?.split("=")[1]
    }`;
    response = await axios.get(userInfoUrl, {
      withCredentials: true,
      headers: {
        Authorization: tokens,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.user;
    }
    throw error;
  }

  return response!.data.user;
};

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

export interface ILoginError {
  summary?: string;
  email?: string;
  password?: string;
}
