import { Outlet } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { useTheme } from "@emotion/react";
import { CustomBottomNavigationAction } from "../components/AppBottomNavigationAction";
import AppBottomNavigation from "../components/AppBottomNavigation";

function AppLayout() {
  const theme = useTheme();
  console.log(theme);
  const [value, setValue] = useState(0);
  const handleSetValue = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => setValue(newValue),
    []
  );
  return (
    <Paper>
      <Container
        sx={{
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Container>
      <AppBottomNavigation value={value} handleSetValue={handleSetValue} />
    </Paper>
  );
}

export default AppLayout;
