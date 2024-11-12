import { ActionFunctionArgs } from "react-router-dom";

export default async function updateProfilePassword({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  console.log(data);
  return null;
}
