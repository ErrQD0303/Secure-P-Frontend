import { useLoaderData, useOutletContext } from "react-router-dom";
import {
  deleteParkingLocation,
  getAllParkingLocations,
  IGetAllParkingLocationResponseDto,
  IGetAllParkingLocationsResponse,
  IGetParkingLocationDto,
} from "../services/parkingLocationService";
import React from "react";
import TableSettings from "../shared/constants/tableSettings";
import { AppPolicy, ParkingLocationSortBy } from "../types/enum";
import AdminDataTable from "../components/AdminDataTable";
import {
  BodyTableRow,
  DeleteButton,
  EditButton,
  EditDeleteButtonCell,
  FirstCell,
  OtherCell,
} from "../components/AdminDataTable.style";
import { useSelector } from "react-redux";
import { isPermissionGranted } from "../store/userSlice";
import UpdateParkingLocationDialog from "../components/UpdateParkingLocationDialog";
import DeleteParkingLocationDialog from "../components/DeleteParkingLocationDialog";

function ManageParkingLocation() {
  const { logAlert } = useOutletContext<{
    logAlert: (message: string, severity: string) => void;
  }>();
  // const permissions = useSelector(getUserPermissions);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [currentId, setCurrentId] = React.useState<string | null>(null);
  const [response, setResponse] = React.useState<
    IGetAllParkingLocationResponseDto | undefined
  >(useLoaderData() as IGetAllParkingLocationResponseDto);

  const [sort, setSort] = React.useState<ParkingLocationSortBy>(
    TableSettings.DEFAULT_SORT
  );
  const [isDesc, setIsDesc] = React.useState<boolean>(
    TableSettings.DEFAULT_DESC_ORDER
  );
  const [page, setPage] = React.useState<number>(
    TableSettings.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = React.useState<number>(
    TableSettings.DEFAULT_PAGE_SIZE
  );
  const [search, setSearch] = React.useState<string>("");

  const [searchTextFieldPlaceholder, tableTitle] = React.useMemo(() => {
    const searchTextFieldPlaceholder =
      "Type parking location name or address to search...";
    const tableTitle = "Parking Locations";
    return [searchTextFieldPlaceholder, tableTitle];
  }, []);

  const getParkingLocations = React.useCallback(
    async (
      page: number,
      limit: number,
      sort: ParkingLocationSortBy,
      desc: boolean,
      search: string
    ) => {
      const fetchedData = (await getAllParkingLocations({
        page,
        limit,
        sort,
        desc,
        search,
      })) as IGetAllParkingLocationsResponse;
      setIsLoading(false);

      if (fetchedData?.success) {
        setResponse(fetchedData.data);
        logAlert(fetchedData.message, "success");
      } else {
        setResponse(undefined);
        logAlert(fetchedData?.message ?? fetchedData.errors.summary, "error");
      }
      setCurrentId(null);
    },
    [logAlert]
  );

  const handlePageChange = React.useCallback(
    async (newPage: number) => {
      setPage(newPage);
      setIsLoading(true);
      await getParkingLocations(newPage, pageSize, sort, isDesc, search);
      setIsLoading(false);
    },
    [getParkingLocations, isDesc, pageSize, search, sort]
  );

  const handlePageSizeChange = React.useCallback(
    async (newPageSize: number) => {
      setPageSize(newPageSize);
      setPage(1);
      setIsLoading(true);
      await getParkingLocations(1, newPageSize, sort, isDesc, search);
      setIsLoading(false);
    },
    [getParkingLocations, isDesc, search, sort]
  );

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const handleEnterKeyDown = React.useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;

      setPage(1);
      setIsLoading(true);
      await getParkingLocations(1, pageSize, sort, isDesc, search);
      setIsLoading(false);
    },
    [getParkingLocations, isDesc, pageSize, search, sort]
  );

  const handleOpenUpdateDialog = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = (event.currentTarget as HTMLButtonElement).dataset.rowid;
      if (!id) return;
      setCurrentId(id);
      setOpenUpdateDialog(true);
    },
    [setOpenUpdateDialog]
  );

  const handleCloseUpdateDialog = React.useCallback(
    async (refetch?: boolean) => {
      setOpenUpdateDialog(false);
      if (!refetch) return;
      await getParkingLocations(page, pageSize, sort, isDesc, search);
    },
    [getParkingLocations, isDesc, page, pageSize, search, sort]
  );

  const handleCloseDeleteDialog = React.useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  const handleSubmitDeleteDialog = React.useCallback(async () => {
    setIsLoading(true);
    const response = await deleteParkingLocation({
      id: currentId || "",
    });
    setIsLoading(false);
    if (response?.success) {
      setResponse((prev) => ({
        ...prev!,
        items: prev?.items.filter(
          (item) => item && item?.id && item.id !== currentId
        ) as unknown as IGetParkingLocationDto[],
      }));
      logAlert(response.message, "success");
    } else {
      logAlert(response.message ?? response.errors.summary, "error");
    }
    setCurrentId(null);
    setOpenDeleteDialog(false);
  }, [currentId, logAlert]);

  // const [canEdit, canDelete] = React.useMemo(() => {
  //   const canEdit = permissions.some(
  //     (permission) => permission === AppPolicy.UpdateParkingLocation
  //   );
  //   const canDelete = permissions.some(
  //     (permission) => permission === AppPolicy.DeleteParkingLocation
  //   );

  //   return [canEdit, canDelete];
  // }, [permissions]);
  const canEdit = useSelector(
    isPermissionGranted(AppPolicy.UpdateParkingLocation)
  );
  const canDelete = useSelector(
    isPermissionGranted(AppPolicy.DeleteParkingLocation)
  );

  const tableHeaders = React.useMemo(() => {
    const originalHeaders = [
      {
        id: String(ParkingLocationSortBy.Name),
        label: "Name",
        numeric: false,
      },
      {
        id: String(ParkingLocationSortBy.Address),
        label: "Address",
        numeric: false,
      },
      {
        id: String(ParkingLocationSortBy.TotalParkingZones),
        label: "Total Parking Zones",
        numeric: true,
      },
      {
        id: String(ParkingLocationSortBy.Capacity),
        label: "Capacity",
        numeric: true,
      },
      {
        id: String(ParkingLocationSortBy.AvailableSpaces),
        label: "Available",
        numeric: true,
      },
      {
        id: String(ParkingLocationSortBy.HourlyRate),
        label: "Hourly Rate",
        numeric: true,
      },
      {
        id: String(ParkingLocationSortBy.DailyRate),
        label: "Daily Rate",
        numeric: true,
      },
      {
        id: String(ParkingLocationSortBy.MonthlyRate),
        label: "Monthly Rate",
        numeric: true,
      },
      {
        id: "",
        label: "",
        numeric: false,
      },
    ];
    return canEdit || canDelete
      ? originalHeaders
      : originalHeaders.slice(0, -1);
  }, [canDelete, canEdit]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const HandleDeleteParkingLocation = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = (event.currentTarget as HTMLButtonElement).dataset.rowid;
      if (!id) return;
      setCurrentId(id);
      setOpenDeleteDialog(true);
    },
    []
  );

  const renderRow = React.useCallback(
    (row: IGetParkingLocationDto) => {
      const showEditDeleteCell = canEdit || canDelete;
      return (
        <BodyTableRow key={row.id}>
          <FirstCell numeric={false}>{row.name}</FirstCell>
          <OtherCell numeric={false}>{row.address}</OtherCell>
          <OtherCell numeric={true}>{row.parking_zones.length}</OtherCell>
          <OtherCell numeric={true}>
            {row.parking_zones.reduce((acc, pz) => acc + pz.capacity, 0)}
          </OtherCell>
          <OtherCell numeric={true}>
            {row.parking_zones.reduce(
              (acc, pz) => acc + pz.available_spaces,
              0
            )}
          </OtherCell>
          <OtherCell numeric={true}>{row.parking_rate.hourly_rate}</OtherCell>
          <OtherCell numeric={true}>{row.parking_rate.daily_rate}</OtherCell>
          <OtherCell numeric={true}>{row.parking_rate.monthly_rate}</OtherCell>
          {showEditDeleteCell && (
            <EditDeleteButtonCell>
              {canEdit && (
                <EditButton
                  data-rowId={row.id}
                  onClick={handleOpenUpdateDialog}
                />
              )}
              {canDelete && (
                <DeleteButton
                  data-rowId={row.id}
                  onClick={HandleDeleteParkingLocation}
                />
              )}
            </EditDeleteButtonCell>
          )}
        </BodyTableRow>
      );
    },
    [canEdit, canDelete, HandleDeleteParkingLocation, handleOpenUpdateDialog]
  );

  const handleRequestSort = React.useCallback(
    async (_: unknown, property: ParkingLocationSortBy) => {
      const isAsc = sort === property ? isDesc : true;
      setIsDesc(!isAsc);
      setSort(property);
      setPage(1);
      setIsLoading(true);
      await getParkingLocations(1, pageSize, property, !isAsc, search);
    },
    [getParkingLocations, isDesc, pageSize, search, sort]
  );

  React.useEffect(() => {
    const banner = document.getElementById("banner");
    if (!banner) return;
    const originalDisplay = banner.style.display;
    banner.style.display = "none";
    return () => {
      banner.style.display = originalDisplay;
    };
  }, []);

  return (
    <AdminDataTable
      loaderData={response as IGetAllParkingLocationResponseDto}
      headers={tableHeaders}
      sort={sort}
      isDesc={isDesc}
      pageIndex={page}
      pageSize={pageSize}
      search={search}
      renderRow={renderRow}
      handleRequestSort={handleRequestSort}
      isLoading={isLoading}
      searchPlaceholder={searchTextFieldPlaceholder}
      tableTitle={tableTitle}
      rowsPerPageOptions={TableSettings.DEFAULT_ROWS_PER_PAGE_OPTIONS}
      handleSearchChange={handleSearchChange}
      handleEnterKeyDown={handleEnterKeyDown}
      handlePageChange={handlePageChange}
      handlePageSizeChange={handlePageSizeChange}
    >
      {openUpdateDialog && (
        <UpdateParkingLocationDialog
          parkingLocationId={currentId}
          open={openUpdateDialog}
          handleClose={handleCloseUpdateDialog}
        />
      )}
      {openDeleteDialog && (
        <DeleteParkingLocationDialog
          parkingLocationId={currentId}
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          handleSubmit={handleSubmitDeleteDialog}
        />
      )}
    </AdminDataTable>
  );
}

export default ManageParkingLocation;
