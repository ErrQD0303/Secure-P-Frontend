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

  useEffect(() => {
    if (!mainLayoutRef.current) return;
    mainLayoutRef.current.scrollTo(0, 0);
  }, [location]);

  return (
    <Paper
      sx={{
        overflow: "auto",
        [theme.breakpoints.between("xs", "md")]: {},
      }}
    >
      <TopNavigationBar />

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
        }}
      >
        <Grid
          size={{
            base: 0,
            md: 5,
          }}
        >
          <SideBar />
        </Grid>
        <Grid
          component={"main"}
          id="main-content"
          size={"grow"}
          sx={{
            overflow: "auto",
          }}
          ref={mainLayoutRef}
        >
          <Container
            sx={{
              height: "100vh", // Default height
              padding: 0,
              [theme.breakpoints.up("xs")]: {
                height: "calc(100vh - 5.1875rem)",
                px: 0,
              },
              [theme.breakpoints.up("md")]: {
                height: "calc(100vh - 5.5rem)",
              },
            }}
          >
            <Outlet />
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
