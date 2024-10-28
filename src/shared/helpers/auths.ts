import {
  IEmailCredentials,
  IUserCredentials,
  IUsernameCredentials,
} from "../../types/auth";
import {
  FAKE_TOKEN,
  FAKE_USER,
  FAKE_VALIDATION_CODE,
  FAKER_USER_PASSWORD,
} from "../constants/fakeUser";

export const isLoginWithUsername = (
  credentials: IUserCredentials
): credentials is IUsernameCredentials => {
  return (credentials as IUsernameCredentials).username !== undefined;
};

export const isLoginWithEmail = (
  credentials: IUserCredentials
): credentials is IEmailCredentials => {
  return (credentials as IEmailCredentials).email !== undefined;
};

export const fakeLogin = ({
  username,
  email,
  password,
}: {
  username?: string;
  email?: string;
  password: string;
}): string | null => {
  if (!username) {
    if (!email) {
      throw new Error("Username or Email is required");
    }
    if (
      email.trim() === FAKE_USER.email.trim() &&
      password.trim() === FAKER_USER_PASSWORD.trim()
    )
      return FAKE_TOKEN;
    return null;
  }

  if (
    username.trim() === FAKE_USER.username!.trim() &&
    password.trim() === FAKER_USER_PASSWORD.trim()
  )
    return FAKE_TOKEN;
  return null;
};

export const fakeTwoFactorsValidation = (code: string): boolean =>
  code === FAKE_VALIDATION_CODE;
