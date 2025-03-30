import { LoaderFunctionArgs } from "react-router-dom";
import { forgotPassword } from "../services/userService";

export default async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  if (!email) {
    return {
      statusCode: 400,
      success: false,
      message: "Email is required",
      errors: {},
    };
  }

  return await forgotPassword(email);
}
