import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { CustomBottomNavigationAction } from "./AppBottomNavigationAction";
import { BottomNavigation, Container } from "@mui/material";

type Props = {
  value: number;
  handleSetValue: (event: React.SyntheticEvent, newValue: number) => void;
};

function AppBottomNavigation({ value, handleSetValue }: Props) {
  return (
    <Container
      component={"nav"}
      sx={{
        height: "104px",
        width: "100%",
        position: "fixed",
        zIndex: 1000,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "end",
        padding: 0,
      }}
    >
      <Container
        component={"div"}
        sx={{
          bgcolor: "#283453",
          height: "83px",
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
          <CustomBottomNavigationAction label="Recents" icon={<HomeIcon />} />
          <CustomBottomNavigationAction
            label="History"
            icon={<ReceiptIcon />}
          />
          <CustomBottomNavigationAction
            label="Subscriptions"
            icon={
              <img
                src="/src/assets/Ticket.svg"
                alt="Subscriptions"
                width="26.79px"
                height="24px"
              />
            }
          />
          <CustomBottomNavigationAction label="Profile" icon={<PersonIcon />} />
          <CustomBottomNavigationAction
            label="Settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Container>
    </Container>
  );
}

export default AppBottomNavigation;
