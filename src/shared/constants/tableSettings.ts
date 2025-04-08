import { ParkingLocationSortBy } from "../../types/enum";

class TableSettings {
  static readonly DEFAULT_PAGE_INDEX = 0;
  static readonly DEFAULT_PAGE_SIZE = 10;
  static readonly DEFAULT_SORT = ParkingLocationSortBy.Name;
  static readonly DEFAULT_DESC_ORDER = false;
}

export default TableSettings;
