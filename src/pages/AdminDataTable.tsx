import React from "react";

import { IGetAllResponseDto } from "../types/response"; // Ensure this import points to the correct location
import { useFetcher, useOutletContext } from "react-router-dom";
import {
  EnhancedTableHead,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
} from "./AdminDataTable.style";
import Loader from "../components/Loader";

export interface AdminDataTableHeader {
  id: string;
  label: string;
  numeric: boolean;
}

export interface AdminDataTableProps<
  TData extends IGetAllResponseDto<unknown>,
  TSortBy extends string | number,
  TGetResponseDto
> {
  loaderData: TData;
  headers: AdminDataTableHeader[];
  defaultSort: TSortBy;
  defaultIsDesc?: boolean;
  defaultPageIndex?: number;
  defaultPageSize?: number;
  defaultSearch?: string;
  renderRow: (row: TGetResponseDto) => React.ReactNode;
  setResponse: (response: TData) => void;
}

function AdminDataTable<
  TData extends IGetAllResponseDto<unknown>,
  TSortBy extends string | number,
  TGetResponseDto
>({
  loaderData,
  defaultSort,
  defaultIsDesc = false,
  defaultPageIndex = 0,
  defaultPageSize = 10,
  defaultSearch = "",
  headers,
  renderRow,
  setResponse,
}: AdminDataTableProps<TData, TSortBy, TGetResponseDto>) {
  const rows = (loaderData?.items || []) as unknown as TGetResponseDto[];
  const total_pages = loaderData?.total_pages || 0;

  const [sort, setSort] = React.useState<TSortBy>(defaultSort);
  const [isDesc, setIsDesc] = React.useState<boolean>(defaultIsDesc);
  const [page, setPage] = React.useState<number>(defaultPageIndex);
  const [pageSize, setPageSize] = React.useState<number>(defaultPageSize);
  const [search, setSearch] = React.useState<string>(defaultSearch);

  const { logAlert } = useOutletContext<{
    logAlert: (message: string, severity: string) => void;
  }>();

  const fetcher = useFetcher();

  const handleRequestSort = React.useCallback(
    (_: unknown, property: TSortBy) => {
      const isAsc = sort === property ? isDesc : true;
      setIsDesc(!isAsc);
      setSort(property);
      setPage(0);
    },
    [sort, isDesc]
  );

  const createSortHandler = React.useCallback(
    (property: TSortBy) => (event: React.MouseEvent<unknown>) => {
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
    formData.append("sort", sort.toString());
    formData.append("desc", isDesc.toString());
    formData.append("method", "GET");

    fetcher.submit(formData, {
      method: "POST",
      action: ".",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, isDesc, page, pageSize, search]);

  React.useEffect(() => {
    if (fetcher.data) {
      const responseData = fetcher.data as unknown as {
        statusCode: number;
        message: string;
        success: boolean;
        errors: unknown;
        data: TData;
      };

      if (!responseData.success) {
        logAlert(
          responseData.message || "An unexpected error occurred.",
          "error"
        );
        return;
      } else {
        logAlert(responseData.message || "Action is successful", "success");
      }
      setResponse(responseData.data);
    }
  }, [fetcher.data, logAlert]);

  return (
    <StyledTableContainer>
      <StyledTable>
        <EnhancedTableHead
          tableHeaders={headers}
          sort={sort as unknown as string}
          isDesc={isDesc}
          createSortHandler={
            createSortHandler as (
              property: string | number
            ) => (event: React.MouseEvent<unknown>) => void
          }
        />
        <StyledTableBody>
          {isLoading && <Loader />}
          {rows.map((row) => renderRow(row) as React.ReactNode)}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default AdminDataTable;
