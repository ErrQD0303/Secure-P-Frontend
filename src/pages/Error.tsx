import { useRouteError } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { isErrorResponse, isTypeError } from "../shared/helpers/errors";
import { Box, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

function Error() {
  const theme = useTheme();
  const error = useRouteError();

  let errorMessage: string | undefined;
  if (isErrorResponse(error)) errorMessage = error.data;
  else if (isTypeError(error)) errorMessage = error.message;
  else errorMessage = "Unexpected error";
  return (
    <Box
      component={"section"}
      sx={{
        px: "1.5rem",
        py: "1.25rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          letterSpacing: "0.01562rem",
          textAlign: "center",
          [theme.breakpoints.up("sm")]: {
            textAlign: "left",
          },
        }}
      >
        Something went wrong 😢
      </Typography>
      <Typography
        variant="body1"
        sx={{
          px: "1.5rem",
          py: "1.25rem",
          color: red[700],
          bgcolor: red[100],
          mt: "0.5rem",
        }}
      >
        {errorMessage}
      </Typography>
      <Button></Button>
    </Box>
  );
}

export default Error;
