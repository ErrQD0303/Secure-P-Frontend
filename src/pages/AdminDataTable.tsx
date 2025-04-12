import React from "react";

import { IGetAllResponseDto } from "../types/response"; // Ensure this import points to the correct location
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
  StyledTablePagination,
} from "./AdminDataTable.style";
import Loader from "../components/Loader";
import TableSettings from "../shared/constants/tableSettings";

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
  handleSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePageChange?: (newPage: number) => void;
  handlePageSizeChange?: (newPageSize: number) => void;
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
  handleSearchChange,
  handleEnterKeyDown,
  handlePageChange,
  handlePageSizeChange,
  isLoading = false,
}: AdminDataTableProps<TData, TSortBy, TGetResponseDto>) {
  const rows = (loaderData?.items || []) as unknown as TGetResponseDto[];
  const totalItems = loaderData?.total_items || 0;

  const createSortHandler = React.useCallback(
    (property: TSortBy) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  const handleTablePaginationPageChange = React.useCallback(
    (_: unknown, newPage: number) => {
      if (handlePageChange) {
        handlePageChange(newPage + 1); // Adjusting for zero-based index
      }
    },
    [handlePageChange]
  );

  const handleTablePaginationPageSizeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (handlePageSizeChange) {
        handlePageSizeChange(parseInt(event.target.value, 10));
      }
    },
    [handlePageSizeChange]
  );

  return (
    <StyledTableContainer>
      {isLoading && <Loader />}
      {children}
      <EnhancedTableToolbar
        search={search}
        handleSearchChange={
          handleSearchChange as unknown as (
            event: React.ChangeEvent<HTMLInputElement>
          ) => void
        }
        handleEnterKeyDown={
          handleEnterKeyDown as unknown as (
            event: React.KeyboardEvent<HTMLInputElement>
          ) => void
        }
      />
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
      <StyledTablePagination
        rowsPerPageOptions={TableSettings.DEFAULT_ROWS_PER_PAGE_OPTIONS}
        rowsPerPage={pageSize}
        count={totalItems}
        page={pageIndex - 1}
        onPageChange={handleTablePaginationPageChange}
        onRowsPerPageChange={handleTablePaginationPageSizeChange}
      />
    </StyledTableContainer>
  );
}

export default AdminDataTable;
