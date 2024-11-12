import { Outlet, useLocation } from "react-router-dom";
import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import AppBottomNavigation from "./AppBottomNavigation";
import useViewPort from "../hooks/useViewPort";
import { useTheme } from "@emotion/react";
import TopNavigationBar from "./TopNavigationBar";
import SideBar from "./SideBar";
import Grid from "@mui/material/Grid2";
import React from "react";
import Banner from "../components/Banner";
import { ROUTES } from "../shared/routes/routes";
import { getRouteName } from "../services/routeService";
import ButtonLink from "../components/ButtonLink";
import AddNewIcon from "../components/svg-icons/AddNew";
import { useSelector } from "react-redux";
import { getUserInfo } from "../store/userSlice";

function AppLayout() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { viewWidth } = useViewPort();
  const handleSetValue = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => setValue(newValue),
    []
  );
  const mainLayoutRef = React.useRef<HTMLElement>(null);
  const location = useLocation();
  const [routeUrl, subPage] = location.pathname.split("/").slice(1);
  const routeName = getRouteName(
    `/${routeUrl}` as keyof typeof ROUTES,
    subPage
  );
  const showBodyRouteName = viewWidth >= theme.breakpoints.values.md;
  const showAddNewButton = ["subscriptions", "payment-history"].includes(
    routeUrl
  );

  const selector = useSelector(getUserInfo);

  useEffect(() => {
    mainLayoutRef.current?.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(selector));
  });

  return (
    <Paper
      sx={{
        overflow: "auto",
        [theme.breakpoints.between("xs", "md")]: {},
      }}
    >
      <TopNavigationBar routeName={routeName} />

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
                    to="/subscriptions/add"
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
                        Add New Subscription
                      </Box>
                    </Button>
                  </ButtonLink>
                )}
              </Stack>
            )}
            <Banner />
            <Outlet context={{ routeName, showBodyRouteName }} />
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
