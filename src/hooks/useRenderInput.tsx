import { useCallback } from "react";
import { isAddNewSubscriptionPropsType } from "../shared/helpers/inputs";
import { Grid2Props } from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  AutocompleteProps,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { IParkingLocation } from "../types/parking";

const addNewSubscriptionRenderInput = (
  input: unknown,
  wrapper: (children: React.ReactNode, props: Grid2Props) => JSX.Element
): JSX.Element | null => {
  if (!isAddNewSubscriptionPropsType(input) || !wrapper) {
    return null;
  }

  const {
    label,
    name,
    type,
    values,
    value,
    placeholder,
    formControlProps,
    selectProps,
    labelProps,
    parentElementProps,
    textFieldProps,
    autoCompleteProps,
    isShown,
    ...props
  } = input;

  const switchValue = () => {
    switch (type) {
      case "select":
        return (
          <Stack key={name} {...(parentElementProps as StackProps)}>
            <Typography {...(labelProps as TypographyProps)}>
              {label}
            </Typography>
            <FormControl {...formControlProps}>
              <Select {...selectProps}>
                <MenuItem disabled key="" value="">
                  <em>--- {label} ---</em>
                </MenuItem>
                {values?.map((subInput) => {
                  return addNewSubscriptionRenderInput(subInput, (children) => {
                    return children as JSX.Element;
                  }) as JSX.Element;
                })}
              </Select>
            </FormControl>
          </Stack>
        );
      case "search-text-input":
        return (
          <Stack key={name} {...(parentElementProps as StackProps)}>
            <Typography {...(labelProps as TypographyProps)}>
              {label}
            </Typography>
            <Autocomplete
              key={
                autoCompleteProps?.resetStateKey as React.Key | null | undefined
              }
              {...(autoCompleteProps as AutocompleteProps<
                IParkingLocation,
                boolean | undefined,
                boolean | undefined,
                boolean | undefined
              >)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={name}
                  placeholder={placeholder}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    ...textFieldProps?.InputProps,
                  }}
                  {...textFieldProps}
                />
              )}
            />
          </Stack>
        );
      case "select-option":
        return (
          <MenuItem key={value as string} value={value as string} {...props}>
            {label}
          </MenuItem>
        );
      case "list":
        if (!isShown) return null;
        return (
          <Stack key={name} {...(parentElementProps as StackProps)}>
            <Typography {...(labelProps as TypographyProps)}>
              {label}
            </Typography>
            {props.wrapper
              ? props.wrapper(
                  values?.map(
                    (val) =>
                      addNewSubscriptionRenderInput(val, (children) => {
                        return children as JSX.Element;
                      }) as JSX.Element
                  ),
                  props as Grid2Props
                )
              : null}
          </Stack>
        );
      case "list-item":
        return props.wrapper
          ? props.wrapper(
              <>
                {(value ||
                  (values && values.filter((val) => val.value).length > 0)) && (
                  <>
                    {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
                    <ListItemText
                      primary={
                        value ? (
                          <Typography
                            {...(parentElementProps as TypographyProps)}
                          >
                            {value as string}
                          </Typography>
                        ) : (
                          values?.map(
                            (val) =>
                              addNewSubscriptionRenderInput(val, (children) => {
                                return children as JSX.Element;
                              }) as JSX.Element
                          )
                        )
                      }
                    />
                  </>
                )}
              </>,
              parentElementProps as Grid2Props
            )
          : null;
      case "list-item-text":
        return (value as string) ? (
          <Typography key={name} {...(parentElementProps as TypographyProps)}>
            {value as string}
          </Typography>
        ) : null;
      case "list-item-box": {
        return props.wrapper
          ? props.wrapper(
              <>
                {(value ||
                  (values && values.filter((val) => val.value).length > 0)) && (
                  <>
                    {props.icon && (value || values) && (
                      <ListItemIcon>{props.icon}</ListItemIcon>
                    )}
                    <ListItemText
                      primary={
                        (value as string) ? (
                          <Typography
                            {...(parentElementProps as TypographyProps)}
                          >
                            {value as string}
                          </Typography>
                        ) : (
                          values?.map(
                            (val) =>
                              addNewSubscriptionRenderInput(val, (children) => {
                                return children as JSX.Element;
                              }) as JSX.Element
                          )
                        )
                      }
                    />
                  </>
                )}
              </>,
              parentElementProps as Grid2Props
            )
          : null;
      }
      case "box":
        return "box";
      default:
        return null;
    }
  };

  return wrapper(switchValue(), props);
};

export interface RenderInputParams {
  input: unknown;
  routeName: string;
  wrapper: (children: React.ReactNode, props: Grid2Props) => JSX.Element;
}

const useRenderInput = () => {
  const renderInput = useCallback(
    ({ input, routeName, wrapper }: RenderInputParams) => {
      const normalizeRouteName = routeName.toLowerCase().replace(/\s/g, "-");
      switch (normalizeRouteName) {
        case "add-new-subscription":
          return addNewSubscriptionRenderInput(input, wrapper);
        default:
          return null;
      }
    },
    [] // Add dependencies here
  );

  return { renderInput };
};

export { useRenderInput };
