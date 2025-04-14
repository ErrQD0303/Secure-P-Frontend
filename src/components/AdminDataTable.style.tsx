import {
  keyframes,
  styled,
  TablePagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
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
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import TableSettings from "../shared/constants/tableSettings";

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
    position: "relative",
  };
});

const StyledPaper = styled(Paper)(({ theme }) => {
  return {
    width: "100%",
    height: "100%",
    // padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "auto",
    backgroundColor: theme.palette.background.paper,
  };
}).withComponent((props: React.ComponentProps<typeof Paper>) => {
  return <Paper {...props} elevation={1} />;
});

const StyledTableContainer = styled(TableContainer)(() => ({
  overflowX: "auto", // <-- allow horizontal scrolling
  width: "100%", // ensure it takes full width
  maxWidth: "100%", // prevent expanding beyond parent
})).withComponent((props: React.ComponentProps<typeof TableContainer>) => {
  return (
    <StyledContainer>
      <StyledPaper>
        {/* This is where the scrolling happens */}
        <TableContainer {...props} />
      </StyledPaper>
    </StyledContainer>
  );
});

const StyledTable = styled(Table)(() => ({
  minWidth: 650,
  // width: "100%",
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

const BodyTableRow = styled(TableRow)(() => ({
  cursor: "pointer",
})).withComponent((props: React.ComponentProps<typeof TableRow>) => {
  return <TableRow hover {...props} />;
});

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

const FilterListTooltip = styled(Tooltip)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Tooltip>) => {
    return <Tooltip {...props} />;
  }
);

const TableNameText = styled(Typography)(() => ({
  flex: "1 1 100%",
  fontWeight: "bold",
  fontSize: "1.625rem",
  textAlign: "left",
  lineHeight: "2.438rem",
  // marginBottom: "1rem",
})).withComponent((props: React.ComponentProps<typeof Typography>) => {
  const { children, ...rest } = props;
  return (
    <Typography {...rest} variant="h6" id="tableTitle">
      {children}
    </Typography>
  );
});

const WhiteFilterListIcon = styled(FilterListIcon)(() => ({
  color: "white",
  "&:hover,&:active": {
    color: "#f4f4f4",
  },
})).withComponent(
  (
    props: React.ComponentProps<typeof FilterListIcon> & {
      open?: boolean;
    }
  ) => {
    const { open, ...rest } = props;
    return open ? <CloseIcon {...rest} /> : <FilterListIcon {...rest} />;
  }
);

export interface EnhancedTableToolbarProps
  extends React.ComponentProps<typeof Toolbar> {
  search: string;
  searchTextFieldPlaceholder?: string;
  tableName?: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const lengthExpandTextField = keyframes`
  0% {
    width: 0;
    }
    100% {
    width: 100%;
    }
    `;

const lengthCollapseTextField = keyframes`
  0% {
    width: 100%;
    }
    100% {
    width: 0;
    }
    `;

const SearchTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "0.5rem",
  width: "0",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.dark.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.dark.main,
    },
    "&.Mui-focused fieldset": { borderColor: theme.palette.dark.main },
  },
})).withComponent(
  (
    props: React.ComponentProps<typeof TextField> & {
      open?: boolean;
    }
  ) => {
    const { open, ...rest } = props;
    return (
      <TextField
        {...rest}
        size="small"
        sx={{
          animation: `${
            open ? lengthExpandTextField : lengthCollapseTextField
          } 0.5s ease-in-out forwards`,
        }}
      />
    );
  }
);

const EnhancedTableToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  width: "100%",
  padding: "1.5rem 0rem",
})).withComponent((props: EnhancedTableToolbarProps) => {
  const {
    search,
    handleSearchChange,
    handleEnterKeyDown,
    searchTextFieldPlaceholder,
    tableName,
    ...rest
  } = props;
  const [open, setOpen] = React.useState(false);
  const [showTextField, setShowTextField] = React.useState(false);
  const handleClick = React.useCallback(() => {
    if (open) {
      setOpen(false);
      setTimeout(() => setShowTextField(false), 500);
    } else {
      setShowTextField(true);
      setOpen(true);
    }
  }, [open]);

  return (
    <Toolbar {...rest}>
      {showTextField ? (
        <SearchTextField
          placeholder={searchTextFieldPlaceholder ?? "Type to search..."}
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleEnterKeyDown}
          open={open}
        />
      ) : (
        <TableNameText>{tableName}</TableNameText>
      )}
      <FilterListTooltip title={open ? "Close" : "Filter list"}>
        <IconButton onClick={handleClick} size="large">
          <WhiteFilterListIcon open={open} />
        </IconButton>
      </FilterListTooltip>
    </Toolbar>
  );
});

const StyledTablePagination = styled(TablePagination)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TablePagination>) => {
    return (
      <TablePagination
        component="div"
        rowsPerPageOptions={TableSettings.DEFAULT_ROWS_PER_PAGE_OPTIONS}
        {...props}
      />
    );
  }
);

export {
  StyledContainer,
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  StyledTablePagination,
  BodyTableRow,
  FirstCell,
  OtherCell,
  StyledTableBody,
  EditButton,
  DeleteButton,
  EditDeleteButtonCell,
  HeaderFirstCell,
  HeaderOtherCell,
  EnhancedTableHead,
  EnhancedTableToolbar,
};
