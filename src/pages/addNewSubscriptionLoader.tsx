import { Grid2Props } from "@mui/material/Grid2";
import { IProductType } from "../types/enum";
import { FormControlProps } from "@mui/material/FormControl";
import { SelectProps } from "@mui/material/Select";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { MenuProps } from "@mui/material/Menu";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import { IParkingLocation, IParkingZone } from "../types/parking";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker.types";
import { Dayjs } from "dayjs";
import { BoxProps } from "@mui/material/Box";
import { ButtonProps, Paper, PaperProps, StackProps } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import theme from "../styles/theme";
export type NewSubscriptionAdditionalProps = {
  label?: string;
  name?: string;
  type?: string;
  values?: Array<unknown & NewSubscriptionAdditionalProps>;
  value?: unknown;
  placeholder?: string;
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  labelProps?: unknown;
  parentElementProps?: unknown;
  textFieldProps?: TextFieldProps;
  menuProps?: MenuProps;
  autoCompleteProps?: AutocompleteProps<
    IParkingLocation | IParkingZone,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  > & { resetStateKey?: boolean };
  onChange?: () => void;
  icon?: JSX.Element;
  resetStateKey?: boolean;
  isShown?: boolean;
  fromDateProps?: DateTimePickerProps<Dayjs, boolean>;
  toDateProps?: DateTimePickerProps<Dayjs, boolean>;
  timeRangeIconProps?: BoxProps;
  dateTimeRangeProps?: unknown;
  fromDateGridProps?: Grid2Props;
  timeRangeGridProps?: Grid2Props;
  toDateGridProps?: Grid2Props;
  checkBoxProps?: CheckboxProps;
  control?: JSX.Element;
  buttonType?: "submit" | "reset" | "button";
  buttonElementProps?: ButtonProps;
  wrapper?: (children: React.ReactNode, props: Grid2Props) => JSX.Element;
};

const loader = async () => {
  const formInputs: Array<Grid2Props & NewSubscriptionAdditionalProps> = [
    {
      name: "product-type",
      type: "select",
      label: "Choose Products",
      values: Array.from(
        Object.values(IProductType).map((value) => ({
          type: "select-option",
          label: value,
          value,
          sx: {},
        }))
      ) as Array<unknown & NewSubscriptionAdditionalProps>,
      offset: { base: 0 },
      size: {
        base: 12,
        lg: 9,
      },
      sx: {},
      parentElementProps: {
        gap: { base: 1 },
      },
      formControlProps: {
        sx: { width: "100%" },
      },
      selectProps: {
        labelId: "product-type-uncontrolled-select-label",
        id: "product-type-uncontrolled-open-select",
        name: "product-type",
        defaultValue: "",
        displayEmpty: true,
        required: true,
        renderValue: (selected: string) => {
          if (!selected || selected?.length === 0 || selected === "") {
            return <em>--- Choose Products ---</em>;
          }

          return selected;
        },
        inputProps: { "aria-label": "Without label" },
        /* startAdornment: (
          <InputAdornment position="start" sx={{ color: "#3D4B56" }}>
            <SearchIcon />
          </InputAdornment>
        ), */
      } as SelectProps,
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
    {
      name: "parking-location",
      type: "search-text-input",
      label: "Parking Location",
      placeholder: "Choose parking location...",
      offset: { base: 0 },
      size: { base: 12, lg: 4 },
      sx: {},
      parentElementProps: {
        gap: { base: 1 },
      },
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
      autoCompleteProps: {
        options: [],
        freeSolo: true,
        autoComplete: true,
        disablePortal: false,
        noOptionsText: "Type another location",
        sx: {
          width: "100%",
          "& .MuiInputAdornment-root": {
            color: "#3D4B56",
          },
        },
        getOptionKey: (option: IParkingLocation) => option.id,
        getOptionLabel: (option: IParkingLocation) => option.name,
        renderInput: (params) => (
          <TextField {...params} label="Choose an option" required />
        ),
      } as AutocompleteProps<
        IParkingLocation | IParkingZone,
        boolean | undefined,
        boolean | undefined,
        boolean | undefined
      >,
    },
    {
      name: "parking-zone",
      type: "search-text-input",
      label: "Parking Zone",
      placeholder: "Choose parking zone...",
      size: { base: 12, lg: 4 },
      offset: { base: 0, lg: 1 },
      sx: {},
      parentElementProps: {
        gap: { base: 1 },
      },
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
      autoCompleteProps: {
        options: FAKE_PARKING_LOCATIONS,
        freeSolo: true,
        autoComplete: true,
        disablePortal: false,
        noOptionsText: "Please choose the parking location first",
        sx: {
          width: "100%",
          "& .MuiInputAdornment-root": {
            color: "#3D4B56",
          },
        },
        getOptionKey: (option: IParkingLocation) => option.id,
        getOptionLabel: (option: IParkingLocation) => option.name,
        renderInput: (params) => (
          <TextField {...params} label="Choose an option" required />
        ),
      } as AutocompleteProps<
        IParkingLocation | IParkingZone,
        boolean | undefined,
        boolean | undefined,
        boolean | undefined
      >,
    },
    {
      name: "parking-info",
      label: "Parking Info",
      type: "list",
      offset: { base: 0 },
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
      component: List,
      container: true,
      // gap: "1rem",
      columns: {
        base: 12,
      },
      values: [
        {
          type: "list-item",
          name: "parking-location-meta-info",
          icon: <PlaceIcon />,
          parentElementProps: {
            component: ListItem,
            size: {
              base: 12,
              lg: 5,
            },
            offset: { base: 0 },
            sx: {
              alignItems: "start",
              justifyContent: "center",
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
              fontWeight: 400,
            },
          },
          values: [
            {
              type: "list-item-text",
              name: "parking-location-name",
              parentElementProps: {
                sx: {
                  color: "#3D4B56",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  fontWeight: 600,
                },
              },
            },
            {
              type: "list-item-text",
              name: "parking-location-address",
              parentElementProps: {
                sx: {
                  color: "#3D4B56",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  fontWeight: 400,
                },
              },
            },
          ],
          wrapper: (children: React.ReactNode, props) => (
            <Grid {...props}>{children}</Grid>
          ),
        },
        {
          type: "list-item",
          name: "parking-location-additional-info",
          parentElementProps: {
            size: {
              base: 12,
              lg: 5,
            },
            offset: { base: 0, lg: 2 },
            sx: {
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
              fontWeight: 600,
              color: "#3D4B56",
            },
          },
          values: [
            {
              type: "list-item-box",
              name: "parking-location-available-spaces",
              icon: <DirectionsCarFilledIcon />,
              parentElementProps: {
                sx: {
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  fontWeight: 600,
                  color: "#3D4B56",
                },
              },
              wrapper: (children: React.ReactNode, props: ListItemProps) => (
                <ListItem {...{ props }}>{children}</ListItem>
              ),
            },
            {
              type: "list-item-box",
              name: "parking-zone-name",
              icon: <DirectionsCarFilledIcon />,
              parentElementProps: {
                sx: {
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  fontWeight: 600,
                  color: "#3D4B56",
                  mt: "0.3rem",
                },
              },
              wrapper: (children: React.ReactNode, props: ListItemProps) => (
                <ListItem {...{ props }}>{children}</ListItem>
              ),
            },
          ] as Array<Grid2Props & NewSubscriptionAdditionalProps>,
          wrapper: (children: React.ReactNode, props) => (
            <Grid {...props}>{children}</Grid>
          ),
        },
      ] as Array<Grid2Props & NewSubscriptionAdditionalProps>,
      size: { base: 12, lg: 9 },
      sx: {
        "& .MuiListItem-root": {
          p: 0,
          "& .MuiListItemIcon-root": {
            minWidth: "auto",
            mr: "0.5rem",
          },
        },
      },
      parentElementProps: {},
      wrapper: (children: React.ReactNode, props) => (
        <Grid {...props}>{children}</Grid>
      ),
    },
    {
      name: "duration",
      type: "date-time-range",
      placeholder: "Choose a date",
      label: "Duration",
      icon: <EastIcon />,
      size: { base: 12, lg: 9 },
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
          alignSelf: "start",
        },
      },
      parentElementProps: {
        sx: {
          alignItems: "center",
          justifyContent: "center",
        },
        gap: { base: 1 },
      } as StackProps,
      dateTimeRangeProps: {
        columns: {
          base: 11,
          lg: 18,
        },
        direction: "row",
        sx: {
          width: "100%",
        },
      },
      fromDateGridProps: {
        size: {
          base: 5,
          lg: 8,
        },
      },
      timeRangeGridProps: {
        size: {
          base: 1,
          lg: 2,
        },
        offset: {
          base: 0,
        },
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      toDateGridProps: {
        size: {
          base: 5,
          lg: 8,
        },
        offset: {
          base: 0,
        },
      },
      fromDateProps: {
        name: "startDate",
        disablePast: true,
        label: "Start",
        format: "DD/MM/YYYY HH:mm",
        sx: {
          width: "100%",
        },
      },
      toDateProps: {
        name: "endDate",
        disablePast: true,
        label: "End",
        format: "DD/MM/YYYY HH:mm",
        sx: {
          width: "100%",
        },
      },
      timeRangeIconProps: {
        sx: {
          fontSize: "1.5rem",
          color: "#3D4B56",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      sx: {},
    },
    {
      name: "other-charge",
      type: "form-group",
      label: "Other Charge",
      size: { base: 12, lg: 9 },
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
          alignSelf: "start",
        },
      },
      parentElementProps: {
        sx: {
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        },
        gap: { base: 1 },
      } as StackProps,
      sx: {
        fontSize: "0.75rem",
        lineHeight: "1.125rem",
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.up("lg")]: {
          justifyContent: "flex-start",
          gap: "9.625rem",
        },
      },
      values: [
        {
          name: "clampingFee",
          type: "checkbox",
          sx: {},
          control: <Checkbox defaultChecked />,
          label: "Clamping Fee",
        },
        {
          name: "changeSignageFee",
          type: "checkbox",
          sx: {},
          control: <Checkbox defaultChecked />,
          label: "Change Signage Fee",
        },
      ] as Array<CheckboxProps & NewSubscriptionAdditionalProps>,
    },
    {
      name: "fee-data",
      type: "box",
      size: { base: 12, lg: 9 },
      parentElementProps: {
        sx: {
          alignItems: "start",
          justifyContent: "center",
        },
      },
      wrapper: (children: React.ReactNode, props) => (
        <Paper
          {...(props as PaperProps)}
          sx={{
            bgcolor: "#fff",
            boxShadow: "0px 2px 4px 0px #0000000D",
            p: "1rem",
            [theme.breakpoints.up("md")]: {
              bgcolor: "#F2F7FD",
            },
            "& .Mui-Fee-Box": {
              fontSize: "0.75rem",
              lineHeight: "1.5rem",
              fontWeight: 500,
            },
            "& .MuiStack-root:has(.Mui-Fee-Box)": {
              "&:last-child": {
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                "& >.Mui-Fee-Box": {
                  fontWeight: 600,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                },
              },
            },
            "& .Mui-DollarSign-Box": {
              fontWeight: 700,
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
            },
            "& .Mui-TotalFee-Box": {
              fontWeight: 700,
              fontSize: "1.5rem",
              lineHeight: "1.875rem",
            },
          }}
        >
          {children}
        </Paper>
      ),
    },
    {
      name: "pay-now",
      type: "button",
      label: "pay now",
      size: { base: 12, lg: 9 },
      parentElementProps: {
        sx: {
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        },
      },
      buttonElementProps: {
        type: "submit",
        variant: "contained",
        sx: {
          width: "100%",
          maxWidth: "20.4375rem",
        },
      },
    },
  ];

  const parkingLocations = FAKE_PARKING_LOCATIONS;
  const changeSignageFee = 10;
  const clampingFee = 20;

  return { formInputs, parkingLocations, changeSignageFee, clampingFee };
};

export default loader;
