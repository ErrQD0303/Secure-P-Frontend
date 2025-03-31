import { ErrorResponse } from "react-router-dom";
import { BackendLogServerError } from "../../exceptions/BackendLogServerError";
import { PasswordResetModelValidationException } from "../../exceptions/PasswordResetModelValidationException";
import { AddNewUserParkingSubscritionException } from "../../exceptions/AddNewUserParkingSubscritionException";

export const isBackendLogServerError = (
  error: unknown
): error is BackendLogServerError => {
  return error instanceof BackendLogServerError;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse =>
  (error as ErrorResponse).data !== undefined;

export const isTypeError = (error: unknown): error is TypeError =>
  (error as TypeError).message !== undefined;

export const isPasswordResetModelValidationException = (
  error: unknown
): error is PasswordResetModelValidationException =>
  (error as PasswordResetModelValidationException).errors !== undefined;

export const isAddNewUserParkingSubscritionException = (
  error: unknown
): error is AddNewUserParkingSubscritionException =>
  (error as AddNewUserParkingSubscritionException).errors !== undefined;
