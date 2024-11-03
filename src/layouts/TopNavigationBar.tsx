import AppBar from "@mui/material/AppBar";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import React from "react";
import ButtonLink from "../components/ButtonLink";
import NotificationButton from "../components/NotificationButton";

// type Props = {};

function TopNavigationBar() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isHomePage = pathname === "/";
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

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
          px: "3.125rem",
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
          <Box
            component="img"
            src="/src/assets/logo.png"
            alt="Secure Parking Logo"
            aria-label="To Homepage"
            sx={{
              cursor: "pointer",
              justifySelf: "center",
              width: "100px",
              [theme.breakpoints.up("md")]: {
                width: "160px",
                height: "31.67px",
              },
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.625rem",
            height: {
              base: "4rem",
              md: "5.5rem",
            },
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
          <NotificationButton />
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
            <ButtonLink to={"profile"} type="none">
              <Tooltip title="My Profile">
                <Box
                  sx={{
                    borderRadius: "50%",
                    p: "1.5rem",
                    background: "url('/src/assets/avatar.png')",
                    cursor: "pointer",
                  }}
                ></Box>
              </Tooltip>
            </ButtonLink>
            <Tooltip title="Profile Settings">
              <Button
                type="button"
                aria-label={"Profile Settings"}
                onClick={handleOpenUserMenu}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.625rem",
                  cursor: "pointer",
                  color: "#3D4B56",
                  textTransform: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "inherit",
                    lineHeight: "1.3125rem",
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
              </Button>
            </Tooltip>
            <Menu
              id="profile-menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
              sx={{
                "& .MuiPaper-root": {
                  ml: "-1.1rem",
                },
              }}
            >
              <MenuItem key={"profile"}>
                <ButtonLink
                  to="/profile"
                  ariaLabel="My Profile"
                  type="link"
                  sx={{
                    m: 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#3D4B56",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      lineHeight: "1.3125rem",
                      letterSpacing: "0.00875rem",
                    }}
                  >
                    My Profile
                  </Typography>
                </ButtonLink>
              </MenuItem>
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <ButtonLink
                  to="/"
                  ariaLabel="Log out"
                  type="link"
                  sx={{
                    m: 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.error.main,
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      lineHeight: "1.3125rem",
                      letterSpacing: "0.00875rem",
                    }}
                  >
                    Log Out
                  </Typography>
                </ButtonLink>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavigationBar;
