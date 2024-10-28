export interface IAuth {
  status: "idle" | "loading" | "authenticated" | "unauthenticated" | "error";
  error: string | null;
  token: string | null;
  twoFactorRequired: boolean;
}

export interface IUserCredentials {
  password: string;
}

export interface IUsernameCredentials extends IUserCredentials {
  username: string;
}

export interface IEmailCredentials extends IUserCredentials {
  email: string;
}
