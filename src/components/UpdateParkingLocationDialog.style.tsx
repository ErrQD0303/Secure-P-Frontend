import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid2";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import Slide, { SlideProps } from "@mui/material/Slide";
import React from "react";
import {
  Button,
  DialogContentText,
  DialogContentTextProps,
  styled,
} from "@mui/material";
import {
  AvailableSpacesField,
  NameTextField,
  StyledGridContainer,
} from "../pages/AddNewParkingLocation.style";
import theme from "../styles/theme";

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
