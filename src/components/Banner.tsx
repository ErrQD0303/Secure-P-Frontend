import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import mobileBanner from "/mobile-banner.png";
import webBanner from "/bannerweb.png";

function Banner() {
  const theme = useTheme();
  return (
    <Container
      id="banner"
      sx={{
        background: `url('${mobileBanner}') top right no-repeat, linear-gradient(to right, #513393, #513393)`,
        height: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.4rem",
        textTransform: "capitalize",
        color: "#fff",
        [theme.breakpoints.up("md")]: {
          color: "#2A2A5B",
          background: `url('${webBanner}') top right no-repeat`,
          fontFamily: "inherit",
          px: "2.125rem",
        },
      }}
      aria-label="Secure Parking Banner"
    >
      <Box
        sx={{
          fontWeight: 600,
          fontSize: "0.875rem",
          lineHeight: "1.234rem",
          fontFamily: "Arial Black",
          [theme.breakpoints.up("md")]: {
            color: "#0055A5",
            fontFamily: "inherit",
            fontSize: "1.5rem",
            lineHeight: "2.25rem",
          },
        }}
      >
        No Parking Worries!
      </Box>
      <Box
        sx={{
          fontWeight: 600,
          fontSize: "0.813rem",
          lineHeight: "1.2rem",
          fontFamily: "'Baloo 2'",
          [theme.breakpoints.up("md")]: {
            fontFamily: "inherit",
            fontSize: "1rem",
            lineHeight: "1.5rem",
          },
        }}
      >
        <Box>Season pass</Box>
        <Box>Unlimited Entry & Exit</Box>
      </Box>
      <Box
        sx={{
          fontWeight: 900,
          fontSize: "1.25rem",
          lineHeight: "1.846rem",
          fontFamily: "'Baloo 2'",
          color: "#FCB034",
          display: {
            md: "none",
            base: "block",
          },
        }}
      >
        $
        <Box
          component={"span"}
          sx={{
            fontSize: "1.875rem",
            lineHeight: "2.769rem",
          }}
        >
          55
        </Box>
      </Box>
    </Container>
  );
}

export default Banner;
