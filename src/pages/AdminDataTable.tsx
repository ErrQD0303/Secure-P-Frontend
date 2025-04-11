import React from "react";

import { IGetAllResponseDto } from "../types/response"; // Ensure this import points to the correct location
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
  sort: TSortBy;
  isDesc?: boolean;
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  renderRow: (row: TGetResponseDto) => React.ReactNode;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: TSortBy
  ) => void;
  children?: React.ReactNode;
  isLoading?: boolean;
}

function AdminDataTable<
  TData extends IGetAllResponseDto<unknown>,
  TSortBy extends string | number,
  TGetResponseDto
>({
  loaderData,
  sort = 0 as unknown as TSortBy,
  isDesc = false,
  pageIndex = 0,
  pageSize = 10,
  search = "",
  headers,
  renderRow,
  children,
  handleRequestSort,
  isLoading = false,
}: AdminDataTableProps<TData, TSortBy, TGetResponseDto>) {
  const rows = (loaderData?.items || []) as unknown as TGetResponseDto[];
  const total_pages = loaderData?.total_pages || 0;

  const createSortHandler = React.useCallback(
    (property: TSortBy) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  return (
    <StyledTableContainer>
      {isLoading && <Loader />}
      {children}
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
          {rows.map((row) => renderRow(row) as React.ReactNode)}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default AdminDataTable;
