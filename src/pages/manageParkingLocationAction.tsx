import { ActionFunctionArgs } from "react-router-dom";
import {
  deleteParkingLocation,
  getAllParkingLocations,
} from "../services/parkingLocationService";
import { ParkingLocationSortBy } from "../types/enum";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { page, limit, sort, desc, search, method, id } = Object.fromEntries(
    formData.entries()
  ) as {
    page: string;
    limit: string;
    sort: string;
    desc: string;
    search: string;
    method: string;
    id: string;
  };

  if (method.toUpperCase() === "GET") {
    const response = await getAllParkingLocations({
      page: +page,
      limit: +limit,
      sort: sort as unknown as ParkingLocationSortBy,
      desc: desc === "true",
      search,
    });

    return { ...response, method };
  } else if (method.toUpperCase() === "DELETE") {
    const response = await deleteParkingLocation({
      id: id,
    });

    return {
      ...response,
      method,
    };
  }

  return {
    statusCode: 400,
    message: "Invalid request method",
    success: false,
    errors: {
      summary: "Invalid request method",
    },
    method,
  };
}
