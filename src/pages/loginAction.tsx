import { ActionFunctionArgs } from "react-router-dom";
import { login, otpLogin } from "../services/userService";

/* const FAKE_LOGIN_CLAMP = {
  email: "datvipcrvn@gmail.com",
  password: "123456",
  otp: "123456",
}; */

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { type } = Object.fromEntries(formData) as unknown as {
    type: string;
  };

  if (type === "login")
    return await loginAction(
      Object.fromEntries(formData) as {
        email: string;
        password: string;
      }
    );

  if (type === "otp")
    return await otpLoginAction(
      Object.fromEntries(formData) as { otp: string | number; email: string }
    );

  return {
    statusCode: 400,
    message: "Login failed",
    errors: {
      summary: "Invalid Login Type",
    },
  };
}

const loginAction = async (data: { email: string; password: string }) => {
  const loginResult = await login(
    data.email,
    undefined,
    undefined,
    data.password
  );

  if (!loginResult) {
    return {
      statusCode: 500,
      message: "Server error",
      errors: {
        summary:
          "An unexpected error occurred. Server may be down. Please try again later.",
      },
    };
  }

  if (typeof loginResult === "object" && loginResult !== null) {
    return {
      statusCode: loginResult.statusCode,
      message: loginResult.message,
      errors: loginResult.errors,
      loginData: loginResult.user,
    };
  }

  return {
    statusCode: 500,
    message: "Unexpected login result",
    errors: {
      summary: "An unexpected error occurred",
    },
  };
};

const otpLoginAction = async (data: {
  otp: string | number;
  email: string;
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!data.email) {
    return {
      statusCode: 400,
      message: "Login failed",
      errors: {
        summary: "Email cookie is missing",
      },
    };
  }

  const loginResult = await otpLogin(data);

  if (!loginResult) {
    return {
      statusCode: 401,
      message: "Login failed",
      errors: {
        summary: "Invalid email or password",
      },
    };
  }

  if (typeof loginResult === "object" && loginResult !== null) {
    return {
      statusCode: loginResult.statusCode,
      message: loginResult.message,
      errors: loginResult.errors,
      user: loginResult.user,
    };
  }

  return {
    statusCode: 500,
    message: "Unexpected login result",
    errors: {
      summary: "An unexpected error occurred",
    },
  };
};
