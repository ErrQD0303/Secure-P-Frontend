import { ActionFunctionArgs } from "react-router-dom";
import { validateEmail } from "../services/modelValidateService";
import { resendEmailConfirmation } from "../services/userService";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData) as unknown as {
    email: string;
  };
  if (!formDataObject.email) {
    return {
      email: "Email is required",
    };
  }
  const clientSideValidationErrors = validateEmail(formDataObject.email);

  if (clientSideValidationErrors) {
    return clientSideValidationErrors;
  }

  await resendEmailConfirmation(formDataObject.email);

  return null;
}
