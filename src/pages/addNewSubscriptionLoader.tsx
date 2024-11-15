import { Grid2Props } from "@mui/material/Grid2";
import { IProductType } from "../types/enum";
import { FormControlProps } from "@mui/material/FormControl";
import { SelectProps } from "@mui/material/Select";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import { CheckboxProps } from "@mui/material/Checkbox";
import { MenuProps } from "@mui/material/Menu";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import { IParkingLocation, IParkingZone } from "../types/parking";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
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
        options: FAKE_PARKING_LOCATIONS,
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
          <TextField {...params} label="Choose an option" />
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
          <TextField {...params} label="Choose an option" />
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
      sx: {},
    },
    {
      name: "other-charge",
      type: "box",
      placeholder: "Other Charge",
      sx: {},
      values: [
        {
          label: "Clamping Fee",
          name: "clampingFee",
          type: "checkbox",
          sx: {},
        },
        {
          label: "Change Signage Fee",
          name: "changeSignageFee",
          type: "checkbox",
          sx: {},
        },
      ] as Array<CheckboxProps & NewSubscriptionAdditionalProps>,
    },
  ];

  const parkingLocations = FAKE_PARKING_LOCATIONS;

  return { formInputs, parkingLocations };
};

export default loader;
