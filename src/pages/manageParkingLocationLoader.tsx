import { getAllParkingLocations } from "../services/parkingLocationService";
import TableSettings from "../shared/constants/tableSettings";
let dataCache: unknown = null;

export default async function loader() {
  /* if (dataCache) {
    return dataCache;
  } */
  const parkingLocations = await getAllParkingLocations({
    page: TableSettings.DEFAULT_PAGE_INDEX,
    limit: TableSettings.DEFAULT_PAGE_SIZE,
    sort: TableSettings.DEFAULT_SORT,
    search: "",
  });

  dataCache = parkingLocations.data ?? {
    items: [],
    total_pages: 0,
  };

  return dataCache;
}
