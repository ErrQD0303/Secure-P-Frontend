import { ActionFunctionArgs, redirect } from "react-router-dom";
import { IRegisterUser } from "../types/user";
import { register } from "../services/userService";

export default async function signUp({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    email: string;
    password: string;
    confirmPassword: string;
    mobileNumber: string;
    username: string;
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country?: string;
    dayOfBirth?: string;
    postCode?: string;
    licensePlateNumber?: string;
  };

  data.country = data.country || "UK";

  const parsedData = {
    ...data,
    licensePlateNumber: data.licensePlateNumber?.split(","),
  };

  const user: IRegisterUser = {
    email: parsedData.email,
    password: parsedData.password,
    mobileNumber: parsedData.mobileNumber,
    username: parsedData.username,
    fullName: parsedData.fullName,
    addressLine1: parsedData.addressLine1,
    addressLine2: parsedData.addressLine2,
    city: parsedData.city,
    country: parsedData.country,
    dayOfBirth: parsedData.dayOfBirth
      ? new Date(parsedData.dayOfBirth)
      : undefined,
    postCode: parsedData.postCode ?? "",
    licensePlateNumber: parsedData.licensePlateNumber ?? [],
  };

  try {
    const createdUser = await register(user);

    if (createdUser) {
      return redirect("/");
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
