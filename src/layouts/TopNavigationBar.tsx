import AppBar from "@mui/material/AppBar";
import NotificationIcon from "../components/svg-icons/Notification";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import useViewPort from "../hooks/useViewPort";
import { Box, Divider, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// type Props = {};

function TopNavigationBar() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isHomePage = pathname === "/";
  const { viewWidth } = useViewPort();
  const isMobile = viewWidth < theme.breakpoints.values.md;
  return (
    <AppBar
      component={"nav"}
      sx={{
        background: "linear-gradient(to left, #0093D0, #0055A5)",
        paddingX: "1.844rem",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        position: "fixed",
        boxShadow: "none",
        color: "#32336C",
        [theme.breakpoints.up("md")]: {
          background: "white",
          filter: "drop-shadow(0px 4px 4px #B8C5D033)",
          paddingY: 0,
        },
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: {
            base: "0",
            md: "0",
          },
          minHeight: {
            xs: "4rem",
          },
        }}
      >
        {isHomePage && (
          <img
            src="/src/assets/logo.png"
            alt="Secure Parking Logo"
            aria-label="To Homepage"
            height={""}
            style={{
              cursor: "pointer",
              justifySelf: "center",
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.625rem",
            height: "4rem",
            fontSize: "0.875rem",
            lineHeight: "1.313rem",
            letterSpacing: "0.009rem",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { base: "none", md: "block" },
              color: "#5E6A78",
              fontWeight: 400,
              fontSize: "inherit",
              lineHeight: "inherit",
              letterSpacing: "inherit",
            }}
          >
            {new Date().toDateString()}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "#EAEFF5",
              borderWidth: "1px",
              display: {
                base: "none",
                md: "block",
              },
            }}
          />
          <NotificationIcon
            hasNotification
            {...(!isMobile
              ? { fill: "#0093D0", stroke: "#fff" }
              : { fill: "#fff", stroke: "#0093D0" })}
          />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "#EAEFF5",
              borderWidth: "1px",
              display: {
                base: "none",
                md: "block",
              },
            }}
          />
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "0.625rem",
              display: {
                base: "none",
                md: "flex",
              },
              height: "100%",
              borderRight: "0.125rem solid #EAEFF5",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                p: "1.5rem",
                background: "url('/src/assets/avatar.png')",
              }}
            ></Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
              }}
            >
              datvipcrvn
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                transform: "translateX(-0.5rem)",
              }}
            />
          </Box>
          {/* <Divider
            orientation="vertical"
            sx={{
              borderColor: "#EAEFF5",
              borderWidth: "1px",
              display: {
                base: "none",
                md: "block",
              },
            }}
          /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavigationBar;
