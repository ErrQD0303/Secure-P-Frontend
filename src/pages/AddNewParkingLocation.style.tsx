import { FormHelperText, InputAdornment, styled } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Grid2Props } from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Form, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../styles/theme";
import Error from "./Error";
import CloseIcon from "@mui/icons-material/Close";
import { IParkingRates } from "../types/parking";
import { IAddNewParkingLocationRequestParkingZoneError } from "../services/parkingLocationService";

export const StyledContainer = styled(Container)(({ theme }) => {
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

export const StyledPaper = styled(Paper)(({ theme }) => {
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
}).withComponent((props: React.ComponentProps<typeof Paper>) => (
  <Paper {...props} elevation={1}></Paper>
));

export const AddForm = styled(Form)(() => ({
  width: "100%",
  height: "100%",
})).withComponent((props: React.ComponentProps<typeof Form>) => {
  const { children, method, ...rest } = props;
  return (
    <Form method={method ?? "POST"} {...rest}>
      <StyledGridContainer>{children}</StyledGridContainer>
    </Form>
  );
});

export const StyledGridContainer = styled(Grid)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Grid>) => (
    <Grid
      {...props}
      container
      spacing={2}
      columns={{
        base: 1,
        md: 5,
      }}
    ></Grid>
  )
);

const StyledGrid = styled(Grid)(() => ({
  marginTop: "0.4rem",
  flex: "1 1 auto",
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <Grid size={{ base: 1, md: 5 }} {...props}></Grid>
));

const NumberTextFieldGrid = styled(StyledGrid)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Grid>) => (
    <Grid size={{ base: 1, md: 2.5 }} {...props}></Grid>
  )
);

const RateTextFieldGrid = styled(StyledGrid)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Grid>) => (
    <Grid size={{ base: 1, md: 5, lg: 1 }} {...props}></Grid>
  )
);

const OffsetOneRateTextFieldGrid = styled(StyledGrid)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Grid>) => (
    <Grid
      size={{ base: 1, md: 5, lg: 1 }}
      offset={{
        base: 0,
        md: 0,
        lg: 1,
      }}
      {...props}
    ></Grid>
  )
);

const CancelButtonGrid = styled(StyledGrid)(() => ({
  marginTop: "1.5rem",
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <Grid
    size={{ base: 1, md: 5, lg: 2 }}
    offset={{
      base: 0,
    }}
    order={{
      base: 0,
      md: 1,
      lg: 0,
    }}
    {...props}
  ></Grid>
));

const AddButtonGrid = styled(StyledGrid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginTop: "1.5rem",
  },
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <Grid
    size={{ base: 1, md: 5, lg: 2 }}
    offset={{
      base: 0,
      md: 0,
      lg: 1,
    }}
    order={{
      base: 1,
      md: 0,
      lg: 1,
    }}
    {...props}
  ></Grid>
));

const StyledTextFieldLabel = styled(Typography)(() => ({
  fontSize: "1rem",
  fontWeight: 600,
  lineHeight: "1.5rem",
  marginBottom: "0.5rem",
  textTransform: "capitalize",
})).withComponent(
  (
    props: React.ComponentProps<typeof Typography> & {
      labelContent?: React.ReactNode;
      htmlFor?: React.ReactNode;
    }
  ) => {
    const { labelContent, ...rest } = props;
    return (
      <Typography
        variant="h3"
        component={"label" as React.ElementType}
        {...(rest as React.ComponentProps<typeof Typography>)}
      >
        {labelContent}
      </Typography>
    );
  }
);

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  height: "100%",
})).withComponent(
  (
    props: React.ComponentProps<typeof TextField> & {
      labelProps?: React.ComponentProps<typeof StyledTextFieldLabel>;
      icon?: React.ReactNode;
      gridElement?: React.ComponentType<Grid2Props>;
    }
  ) => {
    const { labelProps, label, icon, gridElement, ...rest } = props;
    const GridWrapper = gridElement || StyledGrid;

    return (
      <GridWrapper>
        <Stack>
          <StyledTextFieldLabel
            labelContent={label}
            htmlFor={rest.id}
            {...labelProps}
          />
          <TextField
            id={rest.id}
            name={rest.id}
            key={rest.id}
            placeholder={label?.toString()}
            label={null}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              },
              inputLabel: {
                shrink: false,
              },
            }}
            {...rest}
          />
        </Stack>
      </GridWrapper>
    );
  }
);

export const NameTextField = styled(StyledTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <StyledTextField
        id="name"
        label="Name"
        icon={<PersonIcon />}
        {...props}
      />
    );
  }
);

export const AddressTextField = styled(StyledTextField)(
  () => ({})
).withComponent((props: React.ComponentProps<typeof TextField>) => {
  return (
    <StyledTextField
      id="address"
      label="Address"
      icon={<HomeIcon />}
      {...props}
      labelProps={{
        sx: {},
      }}
    />
  );
});

const NumberTextField = styled(StyledTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      if (isNaN(value) || value < 0) {
        e.target.value = "0";
      }
    };

    return (
      <StyledTextField
        type="number"
        gridElement={NumberTextFieldGrid}
        onChange={handleInputChange}
        {...props}
      />
    );
  }
);

const RateTextField = styled(NumberTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (isNaN(value) || value < 0) {
        e.target.value = "0";
        return;
      }
    };

    return (
      <NumberTextField
        onChange={handleRateChange}
        gridElement={RateTextFieldGrid}
        slotProps={{
          htmlInput: {
            min: 0,
            step: "0.01",
          },
        }}
        {...props}
      />
    );
  }
);

const IntegerTextField = styled(NumberTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    const handleIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (isNaN(value) || value < 0) {
        e.target.value = "0";
      }
    };

    return (
      <StyledTextField
        type="number"
        gridElement={NumberTextFieldGrid}
        slotProps={{
          htmlInput: {
            min: 0,
            step: "1",
          },
        }}
        onChange={handleIntegerChange}
        {...props}
      />
    );
  }
);

export const CapacityField = styled(NumberTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <IntegerTextField
        id="capacity"
        label="Capacity"
        icon={<StorageIcon />}
        {...props}
      />
    );
  }
);

export const AvailableSpacesField = styled(NumberTextField)(
  () => ({})
).withComponent((props: React.ComponentProps<typeof TextField>) => {
  return (
    <IntegerTextField
      id="available-spaces"
      label="Available Spaces"
      disabled
      icon={<MeetingRoomIcon />}
      {...props}
    />
  );
});

export const HourlyRateField = styled(RateTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <RateTextField
        id="hourly-rate"
        label="Hourly Rate"
        icon={<AccessTimeIcon />}
        {...props}
      />
    );
  }
);

export const MonthlyRateField = styled(RateTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <RateTextField
        id="monthly-rate"
        label="Monthly Rate"
        gridElement={OffsetOneRateTextFieldGrid}
        icon={<CalendarMonthIcon />}
        {...props}
      />
    );
  }
);

export const DailyRateField = styled(RateTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <RateTextField
        id="daily-rate"
        label="Daily Rate"
        gridElement={OffsetOneRateTextFieldGrid}
        icon={<TodayIcon />}
        {...props}
      />
    );
  }
);

export const CancelButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = props.children ?? "Cancel";
    return (
      <CancelButtonGrid>
        <Button
          variant="contained"
          type="button"
          component={Link as React.ElementType}
          to="/parking-locations"
          aria-label={label.toString()}
          {...props}
          sx={{
            width: "100%",
            display: {
              base: "none",
              md: "flex",
            },
            gap: "0.375rem",
            p: "0.875rem",
            textTransform: "capitalize",
            color: theme.palette.error.contrastText,
            backgroundColor: theme.palette.error.main,
          }}
        >
          {label}
        </Button>
      </CancelButtonGrid>
    );
  }
);

export const AddButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = props.children ?? "Add";
    return (
      <AddButtonGrid>
        <Button
          variant="contained"
          type="submit"
          aria-label={label.toString()}
          {...props}
          sx={{
            width: "100%",
            display: "flex",
            gap: "0.375rem",
            p: "0.875rem",
            textTransform: "capitalize",
          }}
        >
          {label}
        </Button>
      </AddButtonGrid>
    );
  }
);

export const StyledError = styled(Error)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Error>) => {
    return (
      <StyledGrid>
        <Error message={props.message} />
      </StyledGrid>
    );
  }
);

export const RemoveParkingZoneIcon = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  color: theme.palette.error.main,
  padding: 0,
  minWidth: "1rem",
})).withComponent((props: React.ComponentProps<typeof Button>) => {
  return (
    <Tooltip title={"Remove Parking Zone"}>
      <Button
        variant="text"
        type="button"
        aria-label="Remove Parking Zone"
        {...props}
      >
        <CloseIcon />
      </Button>
    </Tooltip>
  );
});

export const ParkingZoneGridParent = styled(StyledGrid)(() => ({
  marginTop: "1rem",
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <StyledGrid
    container
    spacing={2}
    justifyContent={"center"}
    columns={{
      base: 1,
      md: 5,
    }}
    {...props}
  />
));

export const ParkingZoneNameGrid = styled(StyledGrid)(() => ({
  marginTop: "0.4rem",
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <StyledGrid size={{ base: 1, md: 2.5 }} {...props} />
));

export const ParkingZoneCapacityGrid = styled(NumberTextFieldGrid)(() => ({
  marginTop: "0.4rem",
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <StyledGrid size={{ base: 1, md: 1.25 }} {...props} />
));

export const ParkingZoneAvailableSpacesGrid = styled(NumberTextFieldGrid)(
  () => ({
    marginTop: "0.4rem",
  })
).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <StyledGrid size={{ base: 1, md: 1.25 }} {...props} />
));

export const ParkingZoneGridRecord = styled(StyledGrid)(() => ({
  width: "100%",
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  padding: "1rem",
  position: "relative",
})).withComponent(
  (
    props: React.ComponentProps<typeof Grid> & {
      index?: number;
      zone?: {
        capacity?: number;
        availableSpaces?: number;
      };
      error?: IAddNewParkingLocationRequestParkingZoneError;
      handleRemoveZone?: (index: number) => void;
      handleZoneChange?: (
        index: number,
        newFieldValue: {
          field: string;
          value: number | string;
        }[]
      ) => void;
    }
  ) => {
    const { index, zone, handleZoneChange, handleRemoveZone, error, ...rest } =
      props;
    const { capacity } = zone || {};
    const [currentCapacity, setCurrentCapacity] = React.useState<number>(
      capacity || 0
    );
    const HandleCapacityChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 0) {
          setCurrentCapacity(0);
        } else {
          setCurrentCapacity(value);
        }
      },
      []
    );

    const HandleRemoveZone = React.useCallback(() => {
      if (index === undefined) {
        throw new TypeError("index is undefined");
      }
      handleRemoveZone?.(index);
    }, [index, handleRemoveZone]);

    React.useEffect(() => {
      if (currentCapacity !== zone?.capacity) {
        if (index === undefined) {
          throw new TypeError("index is undefined");
        }
        handleZoneChange?.(index, [
          {
            field: "capacity",
            value: currentCapacity,
          },
          {
            field: "availableSpaces",
            value: currentCapacity,
          },
        ]);
      }
    });

    return (
      <StyledGrid
        container
        {...rest}
        columns={{
          base: 1,
          md: 5,
        }}
        size={{ base: 1, md: 5 }}
        spacing={2}
      >
        <RemoveParkingZoneIcon onClick={HandleRemoveZone} />
        <NameTextField
          id={`parking_zones[${index}].name`}
          label="Parking Zone Name"
          icon={<PersonIcon />}
          defaultValue="New Parking Zone"
          gridElement={ParkingZoneNameGrid}
          error={!!error?.name}
          helperText={error?.name}
        />
        <CapacityField
          id={`parking_zones[${index}].capacity`}
          value={currentCapacity.toString()}
          onChange={HandleCapacityChange}
          gridElement={ParkingZoneCapacityGrid}
          error={!!error?.capacity}
          helperText={error?.capacity}
        />
        <AvailableSpacesField
          id={`parking_zones[${index}].available-spaces`}
          value={currentCapacity.toString()}
          gridElement={ParkingZoneAvailableSpacesGrid}
          error={!!error?.available_spaces}
          helperText={error?.available_spaces}
        />
      </StyledGrid>
    );
  }
);

export const TotalParkingLocationCapacityAndAvailableSpaces = styled(
  StyledGrid
)(() => ({})).withComponent(
  (
    props: React.ComponentProps<typeof Grid> & {
      capacity?: number;
      availableSpaces?: number;
    }
  ) => {
    const { capacity, availableSpaces, ...rest } = props;
    return (
      <StyledGrid
        container
        {...rest}
        columns={{
          base: 1,
          md: 5,
        }}
        spacing={2}
      >
        <CapacityField
          disabled
          id={`total_capacity`}
          value={capacity}
          label="Total Capacity"
        />
        <AvailableSpacesField
          id={`total_available_spaces`}
          value={availableSpaces}
          label="Total Available Spaces"
        />
      </StyledGrid>
    );
  }
);

export const AddNewParkingZoneButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = props.children ?? "Add New Parking Zone";
    return (
      <Tooltip title={label.toString()}>
        <Button
          variant="outlined"
          type="button"
          aria-label={label.toString()}
          {...props}
        >
          {label}
        </Button>
      </Tooltip>
    );
  }
);

export const AddNewParkingZoneGrid = styled(StyledGrid)(() => ({
  marginTop: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})).withComponent(
  (
    props: React.ComponentProps<typeof Grid> & {
      handleAddZone: () => void;
    }
  ) => {
    const { handleAddZone, ...rest } = props;
    return (
      <StyledGrid {...rest}>
        <AddNewParkingZoneButton
          variant="outlined"
          type="button"
          onClick={handleAddZone}
        >
          {props.children ?? "Add New Parking Zone"}
        </AddNewParkingZoneButton>
      </StyledGrid>
    );
  }
);

export const ParkingRateSelectInput = styled(Select)(() => ({
  width: "100%",
  height: "100%",
})).withComponent(
  (
    props: React.ComponentProps<typeof Grid> & {
      userControlParkingRateId?: string;
      label?: string;
      parkingRates?: IParkingRates[];
      handleParkingRateChange?: (rate: string | null) => void;
      errorEle?: string;
      input?: Record<
        string,
        | React.ComponentProps<typeof Select>
        | React.ComponentProps<typeof MenuItem>
        | React.ComponentProps<typeof StyledTextFieldLabel>
        | React.ComponentProps<typeof Tooltip>
        | React.ComponentProps<typeof FormControl>
      >;
    }
  ) => {
    const {
      label,
      input,
      parkingRates,
      errorEle,
      handleParkingRateChange,
      userControlParkingRateId,
      ...rest
    } = props;
    const labelId = input?.inputLabel?.id || "parking-rate-label";
    const [parkingRateId, setParkingRateId] = React.useState<string>("");
    const handleChange = React.useCallback(
      (event: SelectChangeEvent<unknown>) => {
        setParkingRateId(event.target.value as string);
        handleParkingRateChange?.(event.target.value as string);
      },
      [handleParkingRateChange]
    );

    return (
      <StyledGrid container {...rest}>
        <FormControl
          fullWidth
          error={!!props.errorEle}
          {...(input?.formControl as React.ComponentProps<typeof FormControl>)}
        >
          <StyledTextFieldLabel
            labelContent={label ?? "Parking Rate"}
            htmlFor={rest.id}
            {...(input?.label as React.ComponentProps<
              typeof StyledTextFieldLabel
            >)}
          />
          <Select
            labelId={labelId}
            id="parking-rate-id"
            name="parking-rate-id"
            value={userControlParkingRateId ?? parkingRateId}
            onChange={handleChange}
            displayEmpty
            required
            {...(input?.select as React.ComponentProps<typeof Select>)}
          >
            <MenuItem value="" disabled hidden>
              Select Parking Rate
            </MenuItem>
            {parkingRates?.map(({ id, hourly, daily, monthly }) => (
              <MenuItem value={id}>
                Hourly: {hourly}, Daily: {daily}, Monthly: {monthly}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errorEle}</FormHelperText>
        </FormControl>
      </StyledGrid>
    );
  }
);
