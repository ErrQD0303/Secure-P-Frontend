import { ActionFunctionArgs } from "react-router-dom";
import { validateParkingLocationModel } from "../services/modelValidateService";
import { isAddNewParkingLocationException } from "../shared/helpers/errors";
import {
  addNewParkingLocation,
  IAddNewParkingLocationParkingZoneDto,
} from "../services/parkingLocationService";

export const extractParkingZones = (
  form: Record<string, FormDataEntryValue>
): IAddNewParkingLocationParkingZoneDto[] => {
  const zones: IAddNewParkingLocationParkingZoneDto[] = [];

  Object.entries(form).forEach(([key, value]) => {
    const match = key.match(
      /^parking_zones\[(\d+)\]\.(capacity|available-spaces|name)$/
    );
    if (!match) return;

    const index = parseInt(match[1], 10);
    const field = match[2].replace(
      "-",
      "_"
    ) as keyof IAddNewParkingLocationParkingZoneDto;

    if (!zones[index]) {
      zones[index] = { name: "", capacity: 0, available_spaces: 0 };
    }

    if (field === "name") {
      zones[index][field] = value as never;
      return;
    }
    zones[index][field] = Number(value) as never;
  });

  return zones.filter((z) => z !== undefined);
};

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData.entries()) as unknown as {
    name: string;
    address: string;
    "parking-rate-id": string | null;
  };
  const parkingZones = extractParkingZones(
    form as unknown as Record<string, FormDataEntryValue>
  ).map((zone) => ({ ...zone, available_spaces: zone.capacity }));

  const addNewForm = {
    name: form.name,
    address: form.address,
    parking_rate_id: form["parking-rate-id"] ?? null,
    parking_zones: parkingZones,
  };

  try {
    validateParkingLocationModel(addNewForm);
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

  return await addNewParkingLocation(addNewForm);
}
