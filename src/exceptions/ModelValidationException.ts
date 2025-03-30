export class ModelValidationException extends Error {
  constructor(message: string) {
    super(message);
  }
  level: string = "error";
}
