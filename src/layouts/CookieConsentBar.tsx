import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useCookies } from "react-cookie";
import CookieName from "../shared/constants/cookieName";
import { acceptGDPR } from "../services/gdprService";

function CookieConsentBar() {
  const [cookies] = useCookies([CookieName.CONSENT_COOKIE]);
  const [show, setShow] = React.useState(!cookies.SecureP_ConsentCookie);
  const theme = useTheme();

  const handleAccept = async () => {
    await acceptGDPR();
    setShow(false);
  };

  const handleDecline = () => {
    setShow(false);
  };

  return show ? (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "background.paper",
        p: 2,
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Typography variant="body2" sx={{ mr: 2 }}>
        We use cookies to improve your experience. By using our site, you agree
        to our cookie policy.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          onClick={handleAccept}
        >
          Accept
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDecline}>
          Decline
        </Button>
      </Box>
    </Box>
  ) : null;
}

export default CookieConsentBar;
