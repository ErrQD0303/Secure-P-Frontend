import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import TicketIcon from "../components/svg-icons/Ticket";
import CustomBottomNavigationAction from "../components/AppBottomNavigationAction";
import { BottomNavigation, Container } from "@mui/material";
import { useTheme } from "@emotion/react";

type Props = {
  value: number;
  handleSetValue: (event: React.SyntheticEvent, newValue: number) => void;
};

function AppBottomNavigation({ value, handleSetValue }: Props) {
  const theme = useTheme();
  return (
    <Container
      component={"nav"}
      sx={{
        width: "100vw",
        height: "7rem",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "end",
        padding: "0 !important",
        minWidth: "23.4375rem",
        zIndex: 2,
      }}
    >
      <Container
        component={"div"}
        sx={{
          bgcolor: "#283453",
          height: "5.1875rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 0,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleSetValue}
          sx={{
            bgcolor: "#283453",
            width: "100%",
            height: "100%",
            justifyContent: "space-around",
            flexWrap: "nowrap",
          }}
        >
          <CustomBottomNavigationAction
            to={"/"}
            label="Home"
            icon={<HomeIcon />}
          />
          <CustomBottomNavigationAction
            to={"/payment-history"}
            label="History"
            icon={<ReceiptIcon />}
          />
          <CustomBottomNavigationAction
            to={"/subscriptions/add"}
            label="Subscription"
            sx={{
              content: "''",
              clear: "both",
              zIndex: 9999, // Ensure it stays on top
            }}
            icon={
              <Container
                sx={{
                  position: "absolute",
                  width: "4rem",
                  height: "4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage:
                    "radial-gradient(circle at center, #556995 0, #283453 65%)",
                  borderRadius: "50%",
                  top: "-35%",
                  [theme.breakpoints.up("sm")]: {
                    padding: 0,
                  },
                }}
              >
                <TicketIcon />
              </Container>
            }
          />
          <CustomBottomNavigationAction
            to={"/help-center"}
            label="Help Center"
            aria-label="Help Center"
            icon={<HelpIcon />}
          />
          <CustomBottomNavigationAction
            to={"/settings"}
            label="Settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Container>
    </Container>
  );
}

export default AppBottomNavigation;
