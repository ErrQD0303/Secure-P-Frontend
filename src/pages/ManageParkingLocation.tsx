import { useFetcher, useLoaderData } from "react-router-dom";
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  FirstCell,
  OtherCell,
  StyledTableBody,
  EditButton,
  DeleteButton,
  EditDeleteButtonCell,
  HeaderFirstCell,
  HeaderOtherCell,
} from "./ManageParkingLocation.style";
import { IGetAllParkingLocationResponseDto } from "../services/parkingLocationService";
import React from "react";
import TableSettings from "../shared/constants/tableSettings";
import { ParkingLocationSortBy } from "../types/enum";
import Loader from "../components/Loader";

function ManageParkingLocation() {
  const loaderData = useLoaderData() as unknown as
    | IGetAllParkingLocationResponseDto
    | undefined;
  const [response, setResponse] = React.useState<
    IGetAllParkingLocationResponseDto | undefined
  >(loaderData);
  const rows = response?.items || [];
  const total_pages = response?.total_pages || 0;

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

  const fetcher = useFetcher();

  const handleRequestSort = React.useCallback(
    (_: unknown, property: ParkingLocationSortBy) => {
      const isAsc = sort === property ? isDesc : true;
      setIsDesc(!isAsc);
      setSort(property);
      setPage(0);
    },
    [sort, isDesc]
  );

  const createSortHandler = React.useCallback(
    (property: ParkingLocationSortBy) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  React.useEffect(() => {
    const formData = new FormData();
    formData.append("page", page.toString());
    formData.append("limit", pageSize.toString());
    formData.append("search", search);
    formData.append("sort", sort as unknown as string);
    formData.append("desc", isDesc.toString());

    fetcher.submit(formData, {
      method: "POST",
      action: ".",
      encType: "application/x-www-form-urlencoded",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, isDesc, page, pageSize, search]);

  React.useEffect(() => {
    if (fetcher.data) {
      const responseData =
        fetcher.data as unknown as IGetAllParkingLocationResponseDto;
      setResponse(responseData);
    }
  }, [fetcher.data]);

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
    <StyledTableContainer>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <HeaderFirstCell
              id={ParkingLocationSortBy.Name as unknown as string}
              orderBy={sort}
              isDesc={isDesc}
              createSortHandler={createSortHandler}
              numeric={false}
            >
              Name
            </HeaderFirstCell>
            <HeaderOtherCell
              id={ParkingLocationSortBy.Address as unknown as string}
              orderBy={sort}
              isDesc={isDesc}
              createSortHandler={createSortHandler}
              numeric={false}
            >
              Address
            </HeaderOtherCell>
            <HeaderOtherCell
              id={ParkingLocationSortBy.Capacity as unknown as string}
              orderBy={sort}
              isDesc={isDesc}
              createSortHandler={createSortHandler}
              numeric={true}
            >
              Capacity
            </HeaderOtherCell>
            <HeaderOtherCell
              id={ParkingLocationSortBy.AvailableSpaces as unknown as string}
              orderBy={sort}
              isDesc={isDesc}
              createSortHandler={createSortHandler}
              numeric={true}
            >
              Available
            </HeaderOtherCell>
            <HeaderOtherCell
            // id={ParkingLocationSortBy.Name as unknown as string}
            // orderBy={sort}
            // isDesc={isDesc}
            // createSortHandler={createSortHandler}
            // numeric={true}
            >
              Hourly Rate
            </HeaderOtherCell>
            <HeaderOtherCell
            // id={ParkingLocationSortBy.Name as unknown as string}
            // orderBy={sort}
            // isDesc={isDesc}
            // createSortHandler={createSortHandler}
            // numeric={true}
            >
              Daily Rate
            </HeaderOtherCell>
            <HeaderOtherCell
            // id={ParkingLocationSortBy.Name as unknown as string}
            // orderBy={sort}
            // isDesc={isDesc}
            // createSortHandler={createSortHandler}
            // numeric={true}
            >
              Monthly Rate
            </HeaderOtherCell>
            <HeaderOtherCell></HeaderOtherCell>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {isLoading && <Loader />}
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <FirstCell numeric={false}>{row.name}</FirstCell>
              <OtherCell numeric={false}>{row.address}</OtherCell>
              <OtherCell numeric={true}>{row.capacity}</OtherCell>
              <OtherCell numeric={true}>{row.available_spaces}</OtherCell>
              <OtherCell numeric={true}>{row.hourly_rate}</OtherCell>
              <OtherCell numeric={true}>{row.daily_rate}</OtherCell>
              <OtherCell numeric={true}>{row.monthly_rate}</OtherCell>
              <EditDeleteButtonCell>
                <EditButton />
                <DeleteButton />
              </EditDeleteButtonCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default ManageParkingLocation;
