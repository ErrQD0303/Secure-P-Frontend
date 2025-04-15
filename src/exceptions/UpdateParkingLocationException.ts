import { ModelValidationException } from "./ModelValidationException";

export class UpdateParkingLocationException extends ModelValidationException {
  constructor(message: string, errors: Record<string, string>) {
    super(message);
    this.errors = errors;
  }
  level: string = "error";
  errors: Record<string, string> = {};
}
