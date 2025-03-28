import { ActionFunctionArgs } from "react-router-dom";
import {
  IUpdateProfilePersonalInfoError,
  updateProfilePersonalInfo,
} from "../services/userService";
import { validateUpdateProfilePersonalInfo } from "../services/modelValidateService";

export default async function updateProfilePersonalInfoAction({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    email: string;
    phone: string;
    dayOfBirth: string;
  };

  const errors: IUpdateProfilePersonalInfoError =
    validateUpdateProfilePersonalInfo(data.email, data.phone, data.dayOfBirth);

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return await updateProfilePersonalInfo({
    email: data.email,
    phone_number: data.phone,
    day_of_birth: new Date(data.dayOfBirth),
  });
}
