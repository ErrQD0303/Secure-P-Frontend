import { Grid2Props } from "@mui/material/Grid2";
import { IProductType } from "../types/enum";
import SearchIcon from "@mui/icons-material/Search";
import { FormControlProps } from "@mui/material/FormControl";
import { SelectProps } from "@mui/material/Select";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import { CheckboxProps } from "@mui/material/Checkbox";
import { MenuProps } from "@mui/material/Menu";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import { IParkingLocation, IParkingZone } from "../types/parking";
import List from "@mui/material/List";
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
  >;
  onChange?: () => void;
  icon?: JSX.Element;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
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
        gap: "1rem",
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
        startAdornment: (
          <InputAdornment position="start" sx={{ color: "#3D4B56" }}>
            <SearchIcon />
          </InputAdornment>
        ),
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
      parentElementProps: {},
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
      autoCompleteProps: {
        options: FAKE_PARKING_LOCATIONS,
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
      parentElementProps: {},
      labelProps: {
        sx: {
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
      autoCompleteProps: {
        options: FAKE_PARKING_LOCATIONS,
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
      type: "list",
      offset: { base: 0 },
      values: [],
      size: { base: 12, lg: 9 },
      sx: {},
      parentElementProps: {
        gap: "1rem",
      },
      component: List,
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
