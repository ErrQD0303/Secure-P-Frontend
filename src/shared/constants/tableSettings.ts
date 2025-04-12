import { ParkingLocationSortBy } from "../../types/enum";

class TableSettings {
  static readonly DEFAULT_PAGE_INDEX = 1;
  static readonly DEFAULT_PAGE_SIZE = 10;
  static readonly DEFAULT_SORT = ParkingLocationSortBy.Name;
  static readonly DEFAULT_DESC_ORDER = false;
  static readonly DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
}

export default TableSettings;
