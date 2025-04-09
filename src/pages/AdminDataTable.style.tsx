import { styled } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";
import { visuallyHidden } from "@mui/utils";

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    width: "100%",
    color: "#3D4B56",
    paddingLeft: "1rem",
    paddingBottom: "4rem",
    marginTop: "1rem",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "2rem",
      paddingBottom: "7rem",
      marginTop: "2rem",
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => {
  return {
    width: "100%",
    height: "100%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  };
}).withComponent((props: React.ComponentProps<typeof Paper>) => {
  return <Paper {...props} elevation={1} />;
});

const StyledTableContainer = styled(TableContainer)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TableContainer>) => {
    return (
      <StyledContainer>
        <TableContainer component={StyledPaper} {...props}></TableContainer>
      </StyledContainer>
    );
  }
);

const StyledTable = styled(Table)(() => ({
  minWidth: 650,
})).withComponent((props: React.ComponentProps<typeof Table>) => {
  return <Table aria-label="simple table" {...props} />;
});

const StyledTableHead = styled(TableHead)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TableHead>) => {
    return <TableHead {...props} />;
  }
);

const StyledTableRow = styled(TableRow)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TableRow>) => {
    return <TableRow {...props} />;
  }
);

const FirstCell = styled(TableCell)(() => ({})).withComponent(
  (
    props: React.ComponentProps<typeof TableCell> & {
      numeric?: boolean;
    }
  ) => {
    const { numeric, ...rest } = props;
    return <TableCell align={numeric ? "right" : "left"} {...rest} />;
  }
);

const OtherCell = styled(TableCell)(() => ({})).withComponent(
  (
    props: React.ComponentProps<typeof TableCell> & {
      numeric?: boolean;
    }
  ) => {
    const { numeric, ...rest } = props;
    return <TableCell align={numeric ? "right" : "left"} {...rest} />;
  }
);

function GenericHeaderFirstCell<TSortBy extends string | number>(
  props: React.ComponentProps<typeof FirstCell> & {
    numeric?: boolean;
    orderBy?: TSortBy;
    isDesc?: boolean;
    createSortHandler?: (
      property: TSortBy
    ) => (event: React.MouseEvent<unknown>) => void;
  }
) {
  const { numeric, children, orderBy, isDesc, createSortHandler, ...rest } =
    props;

  return (
    <FirstCell
      {...rest}
      key={rest.id}
      align={numeric ? "right" : "left"}
      sortDirection={orderBy === rest.id ? (isDesc ? "desc" : "asc") : false}
    >
      {orderBy || orderBy === 0 ? (
        <TableSortLabel
          active={orderBy === (rest.id as unknown as TSortBy)}
          direction={
            orderBy === (rest.id as unknown as TSortBy)
              ? isDesc
                ? "desc"
                : "asc"
              : undefined
          }
          onClick={
            createSortHandler
              ? createSortHandler(rest.id as unknown as TSortBy)
              : undefined
          }
        >
          {children}
          {orderBy === (rest.id as unknown as TSortBy) ? (
            <Box component="span" sx={visuallyHidden}>
              {isDesc ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      ) : (
        children
      )}
    </FirstCell>
  );
}

const HeaderFirstCell = styled(FirstCell)(() => ({
  fontWeight: "bold",
})).withComponent(GenericHeaderFirstCell);

const HeaderOtherCell = styled(HeaderFirstCell)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof OtherCell>) => {
    return <HeaderFirstCell {...props} />;
  }
);

function GenericEnhancedTableHead<TSortBy extends string | number>(
  props: React.ComponentProps<typeof TableHead> & {
    tableHeaders: { id: string; numeric: boolean; label: string }[];
    sort: TSortBy;
    isDesc: boolean;
    createSortHandler: (
      property: TSortBy
    ) => (event: React.MouseEvent<unknown>) => void;
  }
) {
  const { tableHeaders, sort, isDesc, createSortHandler } = props;
  return (
    <StyledTableHead>
      <StyledTableRow>
        {tableHeaders.map(({ id, numeric, label }, idx) =>
          idx === 0 ? (
            <HeaderFirstCell
              id={id}
              orderBy={sort}
              isDesc={isDesc}
              createSortHandler={
                createSortHandler as (
                  property: string | number
                ) => (event: React.MouseEvent<unknown>) => void
              }
              numeric={numeric}
            >
              {label}
            </HeaderFirstCell>
          ) : (
            <HeaderOtherCell
              id={id}
              orderBy={sort}
              isDesc={isDesc}
              createSortHandler={
                createSortHandler as (
                  property: string | number
                ) => (event: React.MouseEvent<unknown>) => void
              }
              numeric={numeric}
            >
              {label}
            </HeaderOtherCell>
          )
        )}
      </StyledTableRow>
    </StyledTableHead>
  );
}

const EnhancedTableHead = styled(TableHead)(() => ({})).withComponent(
  GenericEnhancedTableHead
);

const StyledTableBody = styled(TableBody)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TableBody>) => {
    return <TableBody {...props} />;
  }
);

const EditDeleteButtonCell = styled(OtherCell)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TableCell>) => {
    return (
      <OtherCell
        align="right"
        {...props}
        children={
          <Stack
            direction={"row"}
            spacing={0.5}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {props.children}
          </Stack>
        }
      />
    );
  }
);

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
})).withComponent((props: React.ComponentProps<typeof Button>) => {
  return <Button {...props}>Edit</Button>;
});

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
})).withComponent((props: React.ComponentProps<typeof Button>) => {
  return <Button {...props}>Delete</Button>;
});

export {
  StyledContainer,
  StyledPaper,
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
  EnhancedTableHead,
};
