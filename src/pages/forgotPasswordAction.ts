import { LoaderFunctionArgs } from "react-router-dom";
import { IForgotPasswordResponse } from "../services/userService";

export default async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  return {
    statusCode: 200,
    success: true,
    message: "Email sent to " + email,
    errors: {},
    loginData: { email: email as string },
  } as IForgotPasswordResponse;
}
