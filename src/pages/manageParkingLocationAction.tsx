import { ActionFunctionArgs } from "react-router-dom";
import { updateParkingLocation } from "../services/parkingLocationService";

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
  const capacity = formData.get("capacity") as string;
  const available_spaces = formData.get("available-spaces") as string;
  const hourly_rate = formData.get("hourly-rate") as string;
  const daily_rate = formData.get("daily-rate") as string;
  const monthly_rate = formData.get("monthly-rate") as string;
  const concurrency_stamp = formData.get("concurrency_stamp") as string;

  return await updateParkingLocation({
    id,
    body: {
      name,
      address,
      capacity: +capacity,
      available_spaces: +available_spaces,
      hourly_rate: +hourly_rate,
      daily_rate: +daily_rate,
      monthly_rate: +monthly_rate,
      concurrency_stamp,
    },
  });
}
