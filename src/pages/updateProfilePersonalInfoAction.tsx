import { ActionFunctionArgs } from "react-router-dom";
import store from "../store/store";
import { setUser } from "../store/userSlice";

export default async function updateProfilePersonalInfoAction({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    email: string;
    phone: string;
    dayOfBirth: string;
  };
  console.log(data.email);
  store.dispatch(
    setUser({
      ...(data.email && data.email !== "" ? { email: data.email } : {}),
      ...(data.phone && data.phone !== "" ? { mobileNumber: data.phone } : {}),
      ...(data.dayOfBirth && data.dayOfBirth !== ""
        ? { dayOfBirth: new Date(data.dayOfBirth) }
        : {}),
    })
  );
  return null;
}
