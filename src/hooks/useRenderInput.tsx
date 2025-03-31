import { useCallback } from "react";
import { isAddNewSubscriptionPropsType } from "../shared/helpers/inputs";
import Grid, { Grid2Props } from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import {
  Autocomplete,
  AutocompleteProps,
  Box,
  Button,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { IParkingLocation } from "../types/parking";
import React from "react";

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
    fromDateProps,
    toDateProps,
    timeRangeIconProps,
    dateTimeRangeProps,
    fromDateGridProps,
    timeRangeGridProps,
    toDateGridProps,
    buttonElementProps,
    error,
    errorMessage,
    ...props
  } = input;

  const switchValue = () => {
    switch (type) {
      case "select":
        return (
          <Stack key={name} {...(parentElementProps as StackProps)}>
            {error && <Typography color="error">{errorMessage}</Typography>}
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
            {error && <Typography color="error">{errorMessage}</Typography>}
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
                            (val, index) =>
                              addNewSubscriptionRenderInput(val, (children) => {
                                return React.cloneElement(
                                  children as JSX.Element,
                                  { key: index }
                                );
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
      case "date-time-range":
        return (
          <Stack key={name} {...(parentElementProps as StackProps)}>
            {(
              fromDateProps as DateTimePickerProps<Dayjs, boolean> & {
                error?: boolean;
                errorMessage?: string;
              }
            )?.error && (
              <Typography color="error">
                {
                  (
                    fromDateProps as DateTimePickerProps<Dayjs, boolean> & {
                      error?: boolean;
                      errorMessage?: string;
                    }
                  )?.errorMessage
                }
              </Typography>
            )}
            {(
              toDateProps as DateTimePickerProps<Dayjs, boolean> & {
                error?: boolean;
                errorMessage?: string;
              }
            )?.error && (
              <Typography color="error">
                {
                  (
                    toDateProps as DateTimePickerProps<Dayjs, boolean> & {
                      error?: boolean;
                      errorMessage?: string;
                    }
                  )?.errorMessage
                }
              </Typography>
            )}
            <Typography {...(labelProps as TypographyProps)}>
              {label}
            </Typography>
            <Grid container {...(dateTimeRangeProps as Grid2Props)}>
              <Grid {...fromDateGridProps}>
                <DateTimePicker {...fromDateProps} />
              </Grid>
              <Grid {...timeRangeGridProps}>
                <Box {...timeRangeIconProps}>{props.icon ?? "-"}</Box>
              </Grid>
              <Grid {...toDateGridProps}>
                <DateTimePicker {...toDateProps} />
              </Grid>
            </Grid>
          </Stack>
        );
      case "form-group":
        return (
          <Stack key={name} {...(parentElementProps as StackProps)}>
            <Typography {...(labelProps as TypographyProps)}>
              {label}
            </Typography>
            <FormGroup {...props}>
              {values?.map(
                (val, index) =>
                  addNewSubscriptionRenderInput(val, (children) => {
                    return React.cloneElement(children as JSX.Element, {
                      key: index,
                    });
                  }) as JSX.Element
              )}
            </FormGroup>
          </Stack>
        );
      case "checkbox":
        return (
          <FormControlLabel
            name={name}
            {...(props as FormControlLabelProps)}
            label={label}
          />
        );
      case "button":
        return (
          <Stack {...(parentElementProps as StackProps)}>
            <Button {...buttonElementProps}>{label ?? "Submit"}</Button>
          </Stack>
        );
      case "box":
        if (value) {
          return props.wrapper ? (
            props.wrapper(
              <Stack key={name} {...(parentElementProps as StackProps)}>
                <Box>{name}</Box>
                <Box>{value as React.ReactNode}</Box>
              </Stack>,
              parentElementProps as Grid2Props
            )
          ) : (
            <Stack key={name} {...(parentElementProps as StackProps)}>
              <Box className="Mui-Fee-Box">{name}</Box>
              <Box>{value as React.ReactNode}</Box>
            </Stack>
          );
        }
        if (values) {
          return props.wrapper ? (
            props.wrapper(
              <Stack key={name} {...(parentElementProps as StackProps)}>
                {values.map(
                  (val, index) =>
                    addNewSubscriptionRenderInput(val, (children) => {
                      return React.cloneElement(children as JSX.Element, {
                        key: index,
                      });
                    }) as JSX.Element
                )}
              </Stack>,
              parentElementProps as Grid2Props
            )
          ) : (
            <Stack key={name} {...(parentElementProps as StackProps)}>
              {values.map(
                (val, index) =>
                  addNewSubscriptionRenderInput(val, (children) => {
                    return React.cloneElement(children as JSX.Element, {
                      key: index,
                    });
                  }) as JSX.Element
              )}
            </Stack>
          );
        }
        return null;
      default:
        return null;
    }
  };

  const returnValue = switchValue();
  return returnValue !== null ? wrapper(returnValue, props) : null;
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
