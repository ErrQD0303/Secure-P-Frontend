import { ActionFunctionArgs } from "react-router-dom";
import {
  IUpdateParkingLocationParkingZoneDto,
  IUpdateParkingLocationParkingZonesObjectDto,
  IUpdateParkingLocationRequestBody,
  updateParkingLocation,
} from "../services/parkingLocationService";
import { validateParkingLocationModel } from "../services/modelValidateService";
import { isUpdateParkingLocationException } from "../shared/helpers/errors";
export const extractParkingZones = (
  form: Record<string, FormDataEntryValue>
): IUpdateParkingLocationParkingZonesObjectDto => {
  const zones: IUpdateParkingLocationParkingZonesObjectDto = {};

  Object.entries(form).forEach(([key, value]) => {
    const match = key.match(
      /^parking_zones\[(.*)\]\.(capacity|available-spaces|name|id)$/
    );
    if (!match) return;

    const index = match[1] as string;
    const field = match[2].replace(
      "-",
      "_"
    ) as keyof IUpdateParkingLocationParkingZoneDto;

    if (!zones[index]) {
      zones[index] = { id: "", name: "", capacity: 0, available_spaces: 0 };
    }

    if (field === "name") {
      zones[index][field] = value as never;
      return;
    }
    zones[index][field] = Number(value) as never;
  });

  return Object.entries(zones)
    .filter(([, z]) => z !== undefined)
    .reduce((acc, [key, value]) => {
      const newValue = {
        ...value,
        id: key,
      };
      acc[key] = newValue;
      return acc;
    }, {} as IUpdateParkingLocationParkingZonesObjectDto);
};

export default async function action({ request }: ActionFunctionArgs) {
  if (!request)
    return {
      statusCode: 500,
      message: "Request is undefined",
      success: false,
      errors: {
        summary: "Request is undefined",
      },
    };

  if (request.method !== "PUT") {
    return {
      statusCode: 405,
      message: "Method not allowed",
      success: false,
      errors: {
        summary: "Method not allowed",
      },
    };
  }

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const parkingRateId = formData.get("parking-rate-id") as string;
  const concurrency_stamp = formData.get("concurrency_stamp") as string;

  const form = Object.fromEntries(formData.entries());
  const parkingZones = extractParkingZones(
    form as unknown as Record<string, FormDataEntryValue>
  ) as IUpdateParkingLocationParkingZonesObjectDto;
  const parking_zones = Object.entries(parkingZones).map(([, value]) => value);

  const updateFormBody: IUpdateParkingLocationRequestBody = {
    name,
    address,
    parking_rate_id: parkingRateId,
    concurrency_stamp,
    parking_zones,
  };

  try {
    validateParkingLocationModel(updateFormBody);
  } catch (error) {
    if (isUpdateParkingLocationException(error)) {
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

  return await updateParkingLocation({
    id,
    body: updateFormBody,
  });
}
