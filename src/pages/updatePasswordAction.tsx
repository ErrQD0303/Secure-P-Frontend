import { ActionFunctionArgs, redirect } from "react-router-dom";
import { updatePassword } from "../services/userService";
import { validateChangePassword } from "../services/modelValidateService";

export default async function updateProfilePassword({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    currentPassword: string;
    newPassword: string;
    retypeNewPassword: string;
  };

  const validatePasswordErrors = validateChangePassword(
    data.currentPassword,
    data.newPassword,
    data.retypeNewPassword
  );

  if (Object.keys(validatePasswordErrors).length > 0) {
    return validatePasswordErrors; // Return validation errors if any
  }

  const errors = await updatePassword({
    old_password: data.currentPassword,
    new_password: data.newPassword,
  });

  if (errors) {
    return errors;
  }

  return redirect("/logout"); // Redirect to the logout page after successful password update
}
