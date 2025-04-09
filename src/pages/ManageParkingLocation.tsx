import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import {
  IDeleteParkingLocationResponse,
  IGetAllParkingLocationResponseDto,
  IGetParkingLocationDto,
} from "../services/parkingLocationService";
import React from "react";
import TableSettings from "../shared/constants/tableSettings";
import { AppPolicy, ParkingLocationSortBy } from "../types/enum";
import AdminDataTable from "./AdminDataTable";
import {
  DeleteButton,
  EditButton,
  EditDeleteButtonCell,
  FirstCell,
  OtherCell,
  StyledTableRow,
} from "./AdminDataTable.style";
import { useSelector } from "react-redux";
import { getUserPermissions } from "../store/userSlice";

function ManageParkingLocation() {
  const loaderData = useLoaderData() as IGetAllParkingLocationResponseDto;
  const permissions = useSelector(getUserPermissions);
  const [canEdit, canDelete] = React.useMemo(() => {
    const canEdit = permissions.some(
      (permission) => permission === AppPolicy.UpdateParkingLocation
    );
    const canDelete = permissions.some(
      (permission) => permission === AppPolicy.DeleteParkingLocation
    );

    return [canEdit, canDelete];
  }, [permissions]);
  const [currentId, setCurrentId] = React.useState<string | null>(null);
  const [response, setResponse] = React.useState<
    IGetAllParkingLocationResponseDto | undefined
  >(loaderData);

  const handleGetParkingLocationDto = React.useCallback(
    (response: IGetAllParkingLocationResponseDto) => {
      setResponse(response);
    },
    [setResponse]
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
  }, [canEdit, canDelete]);

  const fetcher = useFetcher();

  const HandleDeleteParkingLocation = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = (event.currentTarget as HTMLButtonElement).dataset.rowid;
      if (!id) return;
      const formData = new FormData();
      formData.append("id", id);
      formData.append("method", "DELETE");
      fetcher.submit(formData, {
        method: "POST",
        action: ".",
      });
      setCurrentId(id);
    },
    [fetcher]
  );

  const renderRow = React.useCallback(
    (row: IGetParkingLocationDto) => {
      const showEditDeleteCell = canEdit || canDelete;
      return (
        <StyledTableRow key={row.id}>
          <FirstCell numeric={false}>{row.name}</FirstCell>
          <OtherCell numeric={false}>{row.address}</OtherCell>
          <OtherCell numeric={true}>{row.capacity}</OtherCell>
          <OtherCell numeric={true}>{row.available_spaces}</OtherCell>
          <OtherCell numeric={true}>{row.hourly_rate}</OtherCell>
          <OtherCell numeric={true}>{row.daily_rate}</OtherCell>
          <OtherCell numeric={true}>{row.monthly_rate}</OtherCell>
          {showEditDeleteCell && (
            <EditDeleteButtonCell>
              {canEdit && <EditButton />}
              {canDelete && (
                <DeleteButton
                  data-rowId={row.id}
                  onClick={HandleDeleteParkingLocation}
                />
              )}
            </EditDeleteButtonCell>
          )}
        </StyledTableRow>
      );
    },
    [canEdit, canDelete, HandleDeleteParkingLocation]
  );

  const { logAlert } = useOutletContext<{
    logAlert: (message: string, severity: string) => void;
  }>();

  React.useEffect(() => {
    if (fetcher.data) {
      const response = fetcher.data as IDeleteParkingLocationResponse & {
        method: string;
      };
      if (response?.success) {
        setResponse((prev: IGetAllParkingLocationResponseDto | undefined) => ({
          ...prev!,
          items: prev!.items.filter(
            (item: IGetParkingLocationDto) => item.id !== currentId
          ),
        }));
        setCurrentId(null);
        logAlert(response.message, "success");
      }
      if (response?.errors?.summary) {
        logAlert(response.errors.summary, "error");
      }
      if (response?.statusCode === 403) {
        logAlert(
          "Forbidden! You do not have permission to delete this parking location.",
          "error"
        );
      }
    }
  }, [fetcher.data, currentId, logAlert]);

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
      defaultSort={TableSettings.DEFAULT_SORT}
      defaultIsDesc={TableSettings.DEFAULT_DESC_ORDER}
      defaultPageIndex={TableSettings.DEFAULT_PAGE_INDEX}
      defaultPageSize={TableSettings.DEFAULT_PAGE_SIZE}
      defaultSearch={""}
      renderRow={renderRow}
      setResponse={handleGetParkingLocationDto}
    />
  );
}

export default ManageParkingLocation;
