import React from "react";
import { Form, useActionData } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  useTheme,
  Container,
  ContainerProps,
} from "@mui/material";
import { IEmailConfirmationError } from "../services/userService";

type Props = ContainerProps;

function ResendEmailConfirmation(props: Props) {
  const theme = useTheme();
  const errors = useActionData() as IEmailConfirmationError;
  const [showForm, setShowForm] = React.useState(true); // Always true on first load

  React.useEffect(() => {
    if (errors === null) {
      // If there are no errors, assume success and hide the form
      setShowForm(false);
    }
  }, [errors]);

  return showForm ? (
    <Container {...props}>
      <Form method="post">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <TextField
            label="Email Address"
            name="email"
            type="email"
            error={Boolean(errors?.email)}
            helperText={errors?.email}
            variant="outlined"
            required
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              width: "100%",
              py: "0.84rem",
              textTransform: "capitalize",
              borderRadius: "0.25rem",
              [theme.breakpoints.up("sm")]: {
                width: "180px",
                height: "44px",
              },
            }}
          >
            Resend Email
          </Button>
        </Box>
      </Form>
    </Container>
  ) : (
    <Container {...props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <p>Email confirmation sent successfully!</p>
      </Box>
    </Container>
  );
}

export default ResendEmailConfirmation;
