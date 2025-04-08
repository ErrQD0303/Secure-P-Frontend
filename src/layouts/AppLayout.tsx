import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import {
  AlertColor,
  AlertPropsColorOverrides,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { useCallback, useEffect, useState } from "react";
import AppBottomNavigation from "./AppBottomNavigation";
import useViewPort from "../hooks/useViewPort";
import { useTheme } from "@emotion/react";
import TopNavigationBar from "./TopNavigationBar";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import SideBar from "./SideBar";
import Grid from "@mui/material/Grid2";
import React from "react";
import Banner from "../components/Banner";
import { getRouteName } from "../services/routeService";
import ButtonLink from "../components/ButtonLink";
import AddNewIcon from "../components/svg-icons/AddNew";
import { useSelector } from "react-redux";
import { getUserPermissions, isEmailConfirmed } from "../store/userSlice";
import EmailConfirmNotificationBar from "./EmailConfirmNotificationBar";
import { AppPolicy } from "../types/enum";

const StyledAlert = styled(MuiAlert)(() => ({}));

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
})).withComponent(
  (
    props: SnackbarProps & {
      severity?:
        | OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
        | undefined;
      alertProps?: AlertProps;
    }
  ) => {
    const { alertProps, message, children, severity, onClose, ...rest } = props;

    return (
      <Snackbar
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        {...rest}
      >
        <StyledAlert
          onClose={
            onClose as unknown as
              | ((event: React.SyntheticEvent) => void)
              | undefined
          }
          severity={severity ?? "success"}
          {...alertProps}
        >
          {children ?? message}
        </StyledAlert>
      </Snackbar>
    );
  }
);

function AppLayout() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { viewWidth } = useViewPort();
  const { routeName: defaultRouteName } = useLoaderData() as {
    routeName: string;
  };
  const [routeName, setRouteName] = useState(defaultRouteName);
  const handleSetValue = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => setValue(newValue),
    []
  );
  const mainLayoutRef = React.useRef<HTMLElement>(null);
  const location = useLocation();
  const [routeUrl, actionUrl] = location.pathname.split("/").slice(1);
  const showBodyRouteName = viewWidth >= theme.breakpoints.values.md;
  const userPermissions = useSelector(getUserPermissions);
  const showAddNewButtonRouteName = React.useMemo(
    () => ({
      subscriptions: {
        to: "/subscriptions/add",
        text: "Add New Subscription",
        show: true,
      },
      "payment-history": {
        to: "/subscriptions/add",
        text: "Add New Subscription",
        show: true,
      },
      "parking-locations": {
        to: "/parking-locations/add",
        text: "Add New Parking Location",
        show: userPermissions?.includes(AppPolicy.CreateParkingLocation),
      },
    }),
    [userPermissions]
  ) as unknown as Record<string, { to: string; text: string; show: boolean }>;
  const showAddNewButton = React.useMemo(() => {
    const keys = Object.keys(showAddNewButtonRouteName);
    return (
      keys.includes(routeUrl) &&
      actionUrl !== "add" &&
      showAddNewButtonRouteName[routeUrl].show
    );
  }, [routeUrl, actionUrl, showAddNewButtonRouteName]);
  const haveEmailConfirmed = useSelector(isEmailConfirmed);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<
    OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
  >(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const logAlert = React.useCallback((newMessage: string, severity: string) => {
    setOpen(true);
    setMessage(newMessage);
    setSeverity(
      severity as
        | OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
        | undefined
    );
  }, []);

  // const selector = useSelector(getUserInfo);

  useEffect(() => {
    mainLayoutRef.current?.scrollTo(0, 0);
  }, [location]);

  /*   useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(selector));
  }, [selector]); */

  useEffect(() => {
    getRouteName(location.pathname).then((name) => {
      setRouteName(name ?? "");
    });
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        overflow: "auto",
        [theme.breakpoints.between("xs", "md")]: {},
      }}
    >
      <StyledSnackbar
        open={open}
        onClose={handleClose}
        message={message}
        severity={severity}
      />
      <TopNavigationBar routeName={routeName ?? ""} />

      <Grid
        container
        spacing={0}
        columns={{
          md: 16,
          lg: 20,
          xl: 24,
        }}
        sx={{
          pt: {
            base: "4rem",
            md: "5.5rem",
          },
          overflowY: "hidden",
          height: "100vh",
        }}
      >
        {haveEmailConfirmed || <EmailConfirmNotificationBar />}
        <Grid
          size={{
            base: 0,
            md: 5,
          }}
        >
          <SideBar sx={{}} />
        </Grid>
        <Grid
          component={"main"}
          id="main-content"
          size={"grow"}
          sx={{
            overflow: "auto",
            height: "100vh", // Default height
            padding: 0,
            [theme.breakpoints.up("xs")]: {
              height: "calc(100vh - 4rem)",
              px: 0,
            },
            [theme.breakpoints.up("md")]: {
              height: "calc(100vh - 5.5rem)",
            },
          }}
          ref={mainLayoutRef}
        >
          <Container
            sx={{
              mb: "2rem",
              px: {
                base: 0,
                md: "1rem",
                xl: 0,
              },
            }}
          >
            {showBodyRouteName && (
              <Stack
                direction={"row"}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    textTransform: "capitalize",
                    color: "#3D4B56",
                    fontWeight: 600,
                    fontSize: "1.625rem",
                    lineHeight: "2.438rem",
                    p: 0,
                    [theme.breakpoints.up("md")]: {
                      py: "1.876rem",
                    },
                  }}
                >
                  {routeName}
                </Box>
                {showAddNewButton && (
                  <ButtonLink
                    to={showAddNewButtonRouteName[routeUrl].to}
                    ariaLabel={showAddNewButtonRouteName[routeUrl].text}
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
                    <Button
                      variant="contained"
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: "0.375rem",
                        p: "0.875rem",
                        textTransform: "capitalize",
                      }}
                    >
                      <AddNewIcon />
                      <Box component={"span"} sx={{}}>
                        {showAddNewButtonRouteName[routeUrl].text}
                      </Box>
                    </Button>
                  </ButtonLink>
                )}
              </Stack>
            )}
            <Banner />
            <Outlet context={{ routeName, showBodyRouteName, logAlert }} />
          </Container>
        </Grid>
      </Grid>
      {viewWidth >= theme.breakpoints.values.xs &&
        viewWidth <= theme.breakpoints.values.md && (
          <AppBottomNavigation value={value} handleSetValue={handleSetValue} />
        )}
    </Paper>
  );
}

export default AppLayout;
