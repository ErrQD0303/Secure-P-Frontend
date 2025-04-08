import { AddNewParkingLocationException } from "../exceptions/AddNewParkingLocationException";
import { AddNewUserParkingSubscritionException } from "../exceptions/AddNewUserParkingSubscritionException";
import { PasswordResetModelValidationException } from "../exceptions/PasswordResetModelValidationException";
import { IRegisterUser } from "../types/user";
import {
  IAddNewParkingLocationRequest,
  IAddNewParkingLocationRequestError,
} from "./parkingLocationService";
import {
  IEmailConfirmationError,
  IPasswordResetError,
  IRegisterError,
  IUpdatePasswordError,
  IUpdateProfilePersonalInfoError,
  IUserParkingSubscriptionError,
  IUserParkingSubscriptionRequest,
} from "./userService";

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

export const validateEmail = (
  email: string | undefined | null
): IEmailConfirmationError | null => {
  if (!email || email.trim() === "") {
    return {
      email: "Email is required",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return {
      email: "Invalid email. Please enter a valid email address",
    };

  return null;
};

export const validatePhoneNumber = (
  phoneNumber: string
): IUpdateProfilePersonalInfoError | null => {
  if (!phoneNumber || phoneNumber.trim() === "") {
    return {
      Phone: "Phone number is required",
    };
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    return {
      Phone: "Invalid phone number. Please enter a valid 10-digit phone number",
    };
  }

  return null;
};

export const validateDateOfBirth = (
  dayOfBirth: string | undefined | null
): IUpdateProfilePersonalInfoError => {
  const errors: IUpdateProfilePersonalInfoError = {};
  if (!dayOfBirth || dayOfBirth.trim() === "") {
    errors.DayOfBirth = "Date of birth is required";
  } else {
    const date = new Date(dayOfBirth);
    if (isNaN(date.getTime())) {
      errors.DayOfBirth = "Invalid date format. Please use YYYY-MM-DD";
    } else if (date > new Date()) {
      errors.DayOfBirth = "Date of birth cannot be in the future";
    }
  }

  return errors;
};

export const validateUpdateProfilePersonalInfo = (
  email?: string,
  phone?: string,
  dayOfBirth?: string
): IUpdateProfilePersonalInfoError => {
  const errors: IUpdateProfilePersonalInfoError = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.Email = emailError.email;
  }

  const phoneError = validatePhoneNumber(phone || "");
  if (phoneError) {
    errors.Phone = phoneError.Phone;
  }

  const dateError = validateDateOfBirth(dayOfBirth);
  if (dateError.DayOfBirth) {
    errors.DayOfBirth = dateError.DayOfBirth;
  }

  return errors;
};

export const validateChangePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
): IUpdatePasswordError => {
  const errors: IUpdatePasswordError = {};

  if (!oldPassword || oldPassword.trim() === "") {
    errors.CurrentPassword = "Current password is required";
  }

  if (!newPassword || newPassword.trim() === "") {
    errors.NewPassword = { NewPasswordIsRequired: "New password is required" };
  }

  if (!confirmPassword || confirmPassword.trim() === "") {
    errors.ConfirmPassword = "Confirm Password is required";
  } else if (newPassword !== confirmPassword) {
    errors.ConfirmPassword = "Confirm Password do not match";
  }

  return errors;
};

export const validatePasswordReset = (
  email?: string | null | undefined,
  token?: string | null | undefined,
  password?: string | null | undefined,
  confirmPassword?: string | null | undefined
): void => {
  const errors: IPasswordResetError = {};
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!token) {
    errors.token = "Token is required";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required and cannot be empty";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (password.length > 100) {
    errors.password = "Password must be at most 100 characters long";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[a-zA-Z\d@#$%^&*!]{8,}$/.test(
      password
    )
  ) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  if (!confirmPassword || confirmPassword.trim() === "") {
    errors.confirm_password =
      "Confirm Password is required and cannot be empty";
  } else if (password !== confirmPassword) {
    errors.confirm_password = "Confirm Password do not match with password";
  }

  if (Object.keys(errors).length > 0) {
    throw new PasswordResetModelValidationException(
      "Password reset validation failed",
      errors as Record<string, string>
    );
  }
};

export const validateUserParkingSubscription = (
  request: IUserParkingSubscriptionRequest
): void => {
  const errors: IUserParkingSubscriptionError = {};

  if (isNaN(request.product_type)) {
    errors.product_type = "Please select a product type";
  }

  if (!request.parking_location || request.parking_location.trim() === "") {
    errors.parking_location = "Please select a parking location";
  }

  if (!request.parking_zone || request.parking_zone.trim() === "") {
    errors.parking_zone = "Please select a parking zone";
  }

  if (!request.start_date) {
    errors.start_date = "Start date is required";
  } else if (request.start_date < new Date()) {
    errors.start_date = "Start date cannot be less than current date";
  }

  if (!request.end_date) {
    errors.end_date = "End date is required";
  } else if (request.end_date < request.start_date) {
    errors.end_date = "End date cannot be less than start date";
  }

  if (Object.keys(errors).length > 0) {
    throw new AddNewUserParkingSubscritionException(
      "User parking subscription validation failed",
      errors as Record<string, string>
    );
  }
};

export const validateParkingLocationModel = ({
  name,
  capacity,
  address,
}: IAddNewParkingLocationRequest): void => {
  const errors: IAddNewParkingLocationRequestError = {};

  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!address || address.trim() === "") {
    errors.address = "Address is required";
  } else if (address.length < 2) {
    errors.address = "Address must be at least 2 characters long";
  }

  if (!capacity || capacity <= 0) {
    errors.capacity = "Capacity is required and must be a positive number";
  }

  if (Object.keys(errors).length > 0) {
    throw new AddNewParkingLocationException(
      "Parking location validation failed",
      errors as Record<string, string>
    );
  }
};
