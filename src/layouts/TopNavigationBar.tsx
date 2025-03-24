import AppBar from "@mui/material/AppBar";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import React from "react";
import ButtonLink from "../components/ButtonLink";
import NotificationButton from "../components/NotificationButton";
import { useNavigate } from "react-router-dom";
import useViewPort from "../hooks/useViewPort";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import logoImage from "/logo.png";
import avatarImage from "/avatar.png";
import { useSelector } from "react-redux";
import { getFullName } from "../store/userSlice";

type Props = {
  routeName: string;
};

function TopNavigationBar({ routeName }: Props) {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { viewWidth } = useViewPort();
  const showAppBar =
    viewWidth < theme.breakpoints.values.md &&
    location.pathname.match(/\/login|\/register/)
      ? false
      : true;
  const showLogo =
    viewWidth >= theme.breakpoints.values.md || location.pathname === "/";
  /* const showGoBack = !["/", "/payment-history", "/subscriptions/add"].includes(
    location.pathname
  ); */
  const showGoBack = true;
  const navigate = useNavigate();
  const fullName = useSelector(getFullName);

  const handleGoBack = React.useCallback(() => {
    console.log("OK");
    navigate(-1);
    return null;
  }, [navigate]);

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
    showAppBar && (
      <AppBar
        component={"nav"}
        sx={{
          background: "linear-gradient(to left, #0093D0, #0055A5)",
          pl: !showLogo && showGoBack ? 0 : "1.844rem",
          pr: "1.844rem",
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
          {showLogo ? (
            <ButtonLink to={"/"} type={"none"}>
              <Box
                component="img"
                src={logoImage}
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
            </ButtonLink>
          ) : (
            <>
              {showGoBack && (
                <ButtonLink
                  onClick={handleGoBack}
                  type={"none"}
                  sx={{
                    flexBasis: 1,
                    p: 0,
                  }}
                >
                  <ChevronLeftIcon sx={{ fontSize: "2rem", color: "#fff" }} />
                </ButtonLink>
              )}
              <Stack
                sx={{
                  flex: "1 0 auto",
                  color: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  lineHeight: "1.688rem",
                }}
              >
                {routeName}
              </Stack>
            </>
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
              <ButtonLink to={"profiles"} type="none">
                <Tooltip title="My Profile">
                  <Box
                    sx={{
                      borderRadius: "50%",
                      p: "1.5rem",
                      background: `url(${avatarImage})`,
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
                    {fullName}
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
                    to="/profiles"
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
                    to="/login"
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
    )
  );
}

export default TopNavigationBar;
