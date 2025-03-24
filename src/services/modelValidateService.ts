import { IRegisterUser } from "../types/user";
import { IRegisterError } from "./userService";

export const validateRegisterUser = (user: IRegisterUser): IRegisterError => {
  const errors: IRegisterError = {};

  if (!user.email || user.email.trim() === "") {
    errors.Email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.Email = "Invalid email format";
  }

  if (!user.fullName || user.fullName.trim() === "") {
    errors.FullName = "Full name is required";
  } else if (user.fullName.length < 2) {
    errors.FullName = "Full name must be at least 2 characters long";
  } else if (user.fullName.length > 100) {
    errors.FullName = "Full name must be at most 100 characters long";
  }

  if (!user.password || user.password.trim() === "") {
    errors.Password = "Password is required";
  } else if (user.password.length < 8) {
    errors.Password = "Password must be at least 8 characters long";
  } else if (user.password.length > 100) {
    errors.Password = "Password must be at most 100 characters long";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&*!]{8,}$/.test(
      user.password
    )
  ) {
    errors.Password =
      "Password must contain at least one uppercase letter, one lowercase letter and one number";
  }

  if (!user.confirmPassword || user.confirmPassword.trim() === "") {
    errors.ConfirmPassword = "Confirm password is required";
  } else if (user.password !== user.confirmPassword) {
    errors.ConfirmPassword = "Passwords do not match";
  }

  if (!user.mobileNumber || user.mobileNumber.trim() === "") {
    errors.PhoneNumber = "Phone number is required";
  }

  if (!user.country) {
    errors.Country = "Country is required";
  }

  return errors;
};
