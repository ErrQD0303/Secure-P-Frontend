import { ActionFunctionArgs } from "react-router-dom";
import { getAllParkingLocations } from "../services/parkingLocationService";
import { ParkingLocationSortBy } from "../types/enum";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { page, limit, search, sort, desc } = Object.fromEntries(
    formData
  ) as unknown as {
    page: string;
    limit: string;
    search: string;
    sort: string;
    desc: string;
  };

  const parkingLocations = await getAllParkingLocations({
    page: +page,
    limit: +limit,
    sort: sort as unknown as ParkingLocationSortBy,
    desc: desc === "true",
    search,
  });

  return (
    parkingLocations.data ?? {
      items: [],
      total_pages: 0,
    }
  );
}
