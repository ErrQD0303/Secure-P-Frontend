import { getAllParkingLocations } from "../services/parkingLocationService";
import TableSettings from "../shared/constants/tableSettings";

export default async function loader() {
  const parkingLocations = await getAllParkingLocations({
    page: TableSettings.DEFAULT_PAGE_INDEX,
    limit: TableSettings.DEFAULT_PAGE_SIZE,
    sort: TableSettings.DEFAULT_SORT,
    desc: TableSettings.DEFAULT_DESC_ORDER,
  });
  return (
    parkingLocations.data ?? {
      items: [],
      total_pages: 0,
    }
  );
}
