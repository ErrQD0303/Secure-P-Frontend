import AppBar from "@mui/material/AppBar";

// type Props = {};

function TopNavigationBar() {
  return (
    <AppBar
      component={"nav"}
      sx={{
        background: "linear-gradient(to right, #0093D0, #0055A5)",
        padding: "1.844rem",
        flexDirection: "row",
      }}
    >
      <img
        src="/src/assets/logo.png"
        alt="Secure Parking Logo"
        aria-label="To Homepage"
        height={""}
      />
      <img
        src="/src/assets/logo.png"
        alt="Secure Parking Logo"
        aria-label="To Homepage"
        height={""}
      />
    </AppBar>
  );
}

export default TopNavigationBar;
