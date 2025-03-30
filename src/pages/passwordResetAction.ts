import { ActionFunctionArgs } from "react-router-dom";
import { validatePasswordReset } from "../services/modelValidateService";
import { isPasswordResetModelValidationException } from "../shared/helpers/errors";
import { passwordReset } from "../services/userService";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  try {
    validatePasswordReset(email, token, password, confirmPassword);
  } catch (error: unknown) {
    if (isPasswordResetModelValidationException(error)) {
      return {
        status: 400,
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }

    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred",
    };
  }

  return await passwordReset({
    email: email!,
    token: token!,
    password,
    confirm_password: confirmPassword,
  });
}
