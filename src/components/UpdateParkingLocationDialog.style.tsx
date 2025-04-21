import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid2";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import Slide, { SlideProps } from "@mui/material/Slide";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import {
  Button,
  DialogContentText,
  DialogContentTextProps,
  styled,
} from "@mui/material";
import {
  AvailableSpacesField,
  CapacityField,
  NameTextField,
  ParkingZoneAvailableSpacesGrid,
  ParkingZoneCapacityGrid,
  ParkingZoneNameGrid,
  RemoveParkingZoneIcon,
  StyledGridContainer,
} from "../pages/AddNewParkingLocation.style";
import theme from "../styles/theme";
import { IUpdateParkingLocationRequestParkingZoneError } from "../services/parkingLocationService";

export const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children?: React.ReactNode },
  ref: React.Ref<unknown>
) {
  const { children, ...rest } = props;
  return (
    <Slide direction="up" ref={ref} {...rest}>
      {children}
    </Slide>
  );
});

export const StyledTransition = styled(Transition)(() => ({})).withComponent(
  (props: SlideProps & { children?: React.ReactNode }) => {
    return <Transition {...props} />;
  }
);

export const StyledDialogTitle = styled(DialogTitle)(() => ({})).withComponent(
  (props: DialogTitleProps) => {
    return <DialogTitle {...props} />;
  }
);

export const StyledDialogContent = styled(DialogContent)(
  () => ({})
).withComponent((props: DialogContentProps) => {
  return <DialogContent {...props} />;
});

export const StyledDialogContentText = styled(DialogContentText)(
  () => ({})
).withComponent((props: DialogContentTextProps) => {
  return <DialogContentText {...props} />;
});

export const StyledDialog = styled(Dialog)(() => ({})).withComponent(
  (props: DialogProps) => {
    return <Dialog {...props} maxWidth="lg" />;
  }
);

export const StyledDialogActions = styled(DialogActions)(() => ({
  display: "block",
  padding: "1rem 3rem",
})).withComponent((props: React.ComponentProps<typeof DialogActions>) => {
  const { children, ...rest } = props;
  return (
    <DialogActions {...rest}>
      <StyledGridContainer>{children}</StyledGridContainer>
    </DialogActions>
  );
});

const StyledGrid = styled(Grid)(() => ({
  marginTop: "0.4rem",
  flex: "1 1 auto",
})).withComponent((props: React.ComponentProps<typeof Grid>) => (
  <Grid size={{ base: 1, md: 5 }} {...props}></Grid>
));

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

const UpdateButtonGrid = styled(StyledGrid)(({ theme }) => ({
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

export const CancelButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = props.children ?? "Cancel";
    return (
      <CancelButtonGrid>
        <Button
          variant="contained"
          type="button"
          aria-label={label.toString()}
          {...props}
          sx={{
            width: "100%",
            display: "flex",
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

export const UpdateButton = styled(Button)(() => ({})).withComponent(
  (props: React.ComponentProps<typeof Button>) => {
    const label = props.children ?? "Update";
    return (
      <UpdateButtonGrid>
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
      </UpdateButtonGrid>
    );
  }
);

export const EnableAvailableSpacesTextField = styled(AvailableSpacesField)(
  () => ({})
).withComponent((props: React.ComponentProps<typeof AvailableSpacesField>) => {
  return <AvailableSpacesField {...props} disabled={false} />;
});

export const IdTextField = styled(NameTextField)(() => ({})).withComponent(
  (
    props: React.ComponentProps<typeof NameTextField> & {
      value: string | number;
    }
  ) => {
    return <NameTextField label="id" {...props} />;
  }
);

export const DisabledIdTextField = styled(IdTextField)(
  () => ({})
).withComponent((props: React.ComponentProps<typeof IdTextField>) => {
  return <IdTextField disabled={true} {...props} />;
});

export const HiddenIdTextField = styled("input")(() => ({})).withComponent(
  (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <input type="hidden" name="id" {...props} />;
  }
);

export const HiddenConcurrencyStampTextField = styled("input")(
  () => ({})
).withComponent((props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="hidden" name="concurrency_stamp" {...props} />;
});

export const ErrorStyledGrid = styled(StyledGrid)(() => ({
  color: theme.palette.error.main,
  fontWeight: "bold",
  textAlign: "center",
  padding: "0.5rem",
  borderRadius: "8px",
})).withComponent(
  (
    props: React.ComponentProps<typeof StyledGrid> & {
      errorMessage?: string;
    }
  ) => {
    const { errorMessage, children, ...rest } = props;
    console.log(errorMessage);
    return (
      <StyledGrid {...rest}>
        {errorMessage ?? children ?? "Some errors have occured"}
      </StyledGrid>
    );
  }
);

export const UpdateParkingLocationParkingZoneGridRecord = styled(StyledGrid)(
  () => ({
    width: "100%",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "1rem",
    position: "relative",
  })
).withComponent(
  (
    props: React.ComponentProps<typeof Grid> & {
      zoneId?: string;
      zone?: {
        capacity?: number;
        available_spaces?: number;
        name?: string;
      };
      error?: IUpdateParkingLocationRequestParkingZoneError;
      handleRemoveZone?: (id: string) => void;
      handleZoneChange?: (
        id: string,
        newFieldValue: {
          field: string;
          value: number | string;
        }[]
      ) => void;
    }
  ) => {
    const { zoneId, zone, handleZoneChange, handleRemoveZone, error, ...rest } =
      props;
    const { capacity, available_spaces, name } = zone || {};
    const [currentCapacity, setCurrentCapacity] = React.useState<number>(
      capacity || 0
    );
    const [currentAvailableSpaces, setCurrentAvailableSpaces] =
      React.useState<number>(available_spaces || 0);

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

    const HandleAvailableSpacesChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 0) {
          setCurrentAvailableSpaces(0);
        } else {
          setCurrentAvailableSpaces(value);
        }
      },
      []
    );

    const HandleRemoveZone = React.useCallback(() => {
      if (zoneId === undefined) {
        throw new TypeError("zoneId is undefined");
      }
      handleRemoveZone?.(zoneId);
    }, [zoneId, handleRemoveZone]);

    React.useEffect(() => {
      if (
        currentCapacity !== zone?.capacity ||
        currentAvailableSpaces !== zone?.available_spaces
      ) {
        if (zoneId === undefined) {
          throw new TypeError("zoneId is undefined");
        }
        handleZoneChange?.(zoneId, [
          {
            field: "capacity",
            value: currentCapacity,
          },
          {
            field: "available_spaces",
            value: currentAvailableSpaces,
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
        sx={{
          gap: "1rem",
          padding: "1rem",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {error?.summary && <ErrorStyledGrid errorMessage={error?.summary} />}
        <RemoveParkingZoneIcon
          onClick={HandleRemoveZone}
          sx={{
            cursor: "pointer",
            color: theme.palette.error.main,
            "&:hover": {
              color: theme.palette.error.dark,
            },
          }}
        />
        <NameTextField
          id={`parking_zones[${zoneId}].name`}
          label={(zoneId?.startsWith("new-") ? "New " : " ") + "Parking Zone"}
          icon={<PersonIcon />}
          defaultValue={name}
          gridElement={ParkingZoneNameGrid}
          error={!!error?.name}
          helperText={error?.name}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
        />
        <CapacityField
          id={`parking_zones[${zoneId}].capacity`}
          value={currentCapacity.toString()}
          onChange={HandleCapacityChange}
          gridElement={ParkingZoneCapacityGrid}
          error={!!error?.capacity}
          helperText={error?.capacity}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
        />
        <EnableAvailableSpacesTextField
          id={`parking_zones[${zoneId}].available-spaces`}
          value={currentAvailableSpaces.toString()}
          onChange={HandleAvailableSpacesChange}
          gridElement={ParkingZoneAvailableSpacesGrid}
          error={!!error?.available_spaces}
          helperText={error?.available_spaces}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
        />
      </StyledGrid>
    );
  }
);
