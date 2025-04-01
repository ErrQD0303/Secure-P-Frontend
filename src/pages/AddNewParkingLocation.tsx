import { InputAdornment, styled } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Grid2Props } from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Form, Link, useActionData } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import theme from "../styles/theme";
import { Error } from "../LazyComponents";
import { IAddNewParkingLocationResponse } from "../services/parkingService";

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
}).withComponent((props: React.ComponentProps<typeof Paper>) => (
  <Paper {...props} elevation={1}></Paper>
));

const AddForm = styled(Form)(() => ({
  width: "100%",
  height: "100%",
})).withComponent((props: React.ComponentProps<typeof Form>) => {
  const { children, ...rest } = props;
  return (
    <Form method="POST" {...rest}>
      <StyledGridContainer>{children}</StyledGridContainer>
    </Form>
  );
});

const StyledGridContainer = styled(Grid)(() => ({})).withComponent(
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

const NameTextField = styled(StyledTextField)(() => ({})).withComponent(
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

const AddressTextField = styled(StyledTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
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
  }
);

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

const CapacityField = styled(NumberTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <NumberTextField
        id="capacity"
        label="Capacity"
        icon={<StorageIcon />}
        {...props}
      />
    );
  }
);

const AvailableSpacesField = styled(NumberTextField)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof TextField>) => {
    return (
      <NumberTextField
        id="available-spaces"
        label="Available Spaces"
        disabled
        icon={<MeetingRoomIcon />}
        {...props}
      />
    );
  }
);

const CancelButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = "Cancel";
    return (
      <CancelButtonGrid>
        <Button
          variant="contained"
          type="button"
          component={Link as React.ElementType}
          to="/parking-locations"
          aria-label={label}
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

const AddButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = "Add";
    return (
      <AddButtonGrid>
        <Button
          variant="contained"
          type="submit"
          aria-label={label}
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

const StyledError = styled(Error)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Error>) => {
    return (
      <StyledGrid>
        <Error message={props.message} />
      </StyledGrid>
    );
  }
);

function AddNewParkingLocation() {
  const [currentCapacity, setCurrentCapacity] = React.useState<number>(0);
  const HandleCapacityChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      if (isNaN(value) || value < 0) {
        setCurrentCapacity(0);
      } else {
        setCurrentCapacity(value);
      }
    },
    []
  );
  const response = useActionData() as
    | IAddNewParkingLocationResponse
    | undefined
    | null;
  const showError = Boolean(response && !response?.success);

  return (
    <StyledContainer>
      <StyledPaper>
        <AddForm>
          {showError && (
            <StyledError
              message={response?.message ?? "Unexpected Error Occured"}
            />
          )}
          <NameTextField
            error={!!response?.errors?.name}
            helperText={response?.errors?.name}
          />
          <AddressTextField
            error={!!response?.errors?.address}
            helperText={response?.errors?.address}
          />
          <CapacityField
            error={!!response?.errors?.capacity}
            helperText={response?.errors?.capacity}
            value={currentCapacity}
            onChange={HandleCapacityChange}
          />
          <AvailableSpacesField value={currentCapacity} />
          <CancelButton />
          <AddButton />
        </AddForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default AddNewParkingLocation;
