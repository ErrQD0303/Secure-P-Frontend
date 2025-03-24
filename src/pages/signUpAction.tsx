import { ActionFunctionArgs, redirect } from "react-router-dom";
import { IRegisterUser } from "../types/user";
import { register } from "../services/userService";
import { validateRegisterUser } from "../services/modelValidateService";

export default async function signUp({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    fullName: string;
    country?: string;
  };

  const user: IRegisterUser = {
    email: data.email,
    fullName: data.fullName,
    password: data.password,
    confirmPassword: data.confirmPassword,
    mobileNumber: data.phoneNumber,
    country: data.country,
  };

  const clientSideValidationErrors = validateRegisterUser(user);
  if (
    clientSideValidationErrors &&
    Object.keys(clientSideValidationErrors).length > 0
  ) {
    return clientSideValidationErrors;
  }

  try {
    const registerResponse = await register(user);

    if (registerResponse.success) {
      return redirect("/");
    }

    return registerResponse.errors;
  } catch (error) {
    console.error(error);
    return {
      summary: "An unexpected error occurred",
    };
  }
}
