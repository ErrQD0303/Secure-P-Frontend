import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import ButtonLink from "../components/ButtonLink";

function EmailConfirmNotificationBar() {
  const theme = useTheme();
  const [showBar, setShowBar] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setShowBar(false);
  }, []);

  return showBar ? (
    <Grid
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar, // Ensures it stays above other elements
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
        textAlign: "center",
        padding: "0.5rem",
        fontWeight: 600,
        boxShadow: theme.shadows[2],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        Please confirm your Email!
        <ButtonLink
          to="/resend-email-confirmation"
          ariaLabel="My subscriptions"
          type="button"
          sx={{
            my: "1.4375rem",
            display: "none",
            [theme.breakpoints.up("sm")]: {
              width: "auto",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          Or Click here to resend Email
        </ButtonLink>
      </Box>
      <Button
        onClick={handleClose}
        sx={{
          minWidth: "auto",
          padding: 0,
          color: theme.palette.warning.contrastText,
          fontWeight: 700,
          fontSize: "1rem",
          lineHeight: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
          marginLeft: "auto",
        }}
      >
        ✕
      </Button>
    </Grid>
  ) : null;
}

export default EmailConfirmNotificationBar;
