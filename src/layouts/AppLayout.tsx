import { Outlet } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import AppBottomNavigation from "./AppBottomNavigation";
import useViewPort from "../hooks/useViewPort";
import { useTheme } from "@emotion/react";
import TopNavigationBar from "./TopNavigationBar";

function AppLayout() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { viewWidth } = useViewPort();
  const handleSetValue = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => setValue(newValue),
    []
  );

  return (
    <Paper
      sx={{
        overflow: "auto",
        [theme.breakpoints.between("xs", "md")]: {},
      }}
    >
      <TopNavigationBar />
      <Container
        sx={{
          height: "100vh", // Default height
          padding: 0,
          pt: "3.5rem",
          [theme.breakpoints.up("xs")]: {
            height: "calc(100vh - 5.1875rem)",
            px: 0,
          },
          [theme.breakpoints.up("md")]: {
            height: "100vh",
          },
        }}
      >
        <Outlet />
      </Container>
      {viewWidth >= theme.breakpoints.values.xs &&
        viewWidth <= theme.breakpoints.values.md && (
          <AppBottomNavigation value={value} handleSetValue={handleSetValue} />
        )}
    </Paper>
  );
}

export default AppLayout;
