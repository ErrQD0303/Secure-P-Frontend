import { ActionFunctionArgs } from "react-router-dom";

const FAKE_LOGIN_CLAMP = {
  phone: "0339482105",
  password: "123456",
  otp: "123456",
};

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { type } = Object.fromEntries(formData) as unknown as {
    type: string;
  };
  if (type === "login")
    return await loginAction(
      Object.fromEntries(formData) as {
        phone: string;
        password: string;
      }
    );
  if (type === "otp")
    return await otpLoginAction(
      Object.fromEntries(formData) as { otp: string }
    );

  return {
    status: 401,
    message: "Login failed",
    error: {
      credentials: "Invalid Login Type",
    },
  };
}

const loginAction = async (data: { phone: string; password: string }) => {
  if (
    data.phone === FAKE_LOGIN_CLAMP.phone &&
    data.password === FAKE_LOGIN_CLAMP.password
  )
    return {
      status: 200,
      message: "Credentials check successful",
      loginData: { phone: data.phone },
    };

  return {
    status: 401,
    message: "Login failed",
    error: {
      credentials: "Invalid phone number or password",
    },
  };
};

const otpLoginAction = async (data: { otp: string | number }) => {
  await new Promise(
    (resolve, reject) =>
      console.dir(resolve) ?? console.dir(reject) ?? setTimeout(resolve, 1500)
  );
  if (data.otp.toString() === FAKE_LOGIN_CLAMP.otp) {
    return {
      status: 200,
      message: "OTP check successful",
    };
  }

  return {
    status: 401,
    message: "Login failed",
    error: {
      credentials: "Invalid OTP",
    },
  };
};
