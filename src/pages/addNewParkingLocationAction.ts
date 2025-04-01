import { ActionFunctionArgs } from "react-router-dom";
import { validateParkingLocationModel } from "../services/modelValidateService";
import { isAddNewParkingLocationException } from "../shared/helpers/errors";
import { addNewParkingLocation } from "../services/parkingService";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData.entries()) as unknown as {
    name: string;
    address: string;
    capacity: number;
  };

  try {
    validateParkingLocationModel(form);
  } catch (error) {
    if (isAddNewParkingLocationException(error)) {
      return {
        statusCode: 400,
        message: "Validation error",
        success: false,
        errors: error.errors,
      };
    }

    return {
      statusCode: 500,
      message: "Internal server error. An unexpected error occurred.",
      success: false,
      errors: {
        summary: "An unexpected error occurred.",
      },
    };
  }

  return await addNewParkingLocation(form);
}
