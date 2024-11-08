import { Outlet, useLocation } from "react-router-dom";
import { Container, Paper } from "@mui/material";
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

  useEffect(() => {
    mainLayoutRef.current?.scrollTo(0, 0);
  }, [location]);

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
            }}
          >
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
