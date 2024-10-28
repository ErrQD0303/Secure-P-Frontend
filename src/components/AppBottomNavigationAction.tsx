import { BottomNavigationAction, styled } from "@mui/material";

export const CustomBottomNavigationAction = styled(BottomNavigationAction)(
  () => ({
    color: "#AFBDD4",
    fontWeight: 500, // Adjusted from "weight" to "fontWeight"
    fontSize: "0.75rem", // 12px as rem (assuming 16px root font size)
    lineHeight: "1.125rem", // 18px as rem
    letterSpacing: "0.00875rem",
    padding: 0,
    flex: "0 0 auto",
    minWidth: "18%",
    "&.Mui-selected": {
      color: "#56CCF2",
    },
    "& .MuiBottomNavigationAction-label.Mui-selected": {
      fontSize: "0.75rem", // 12px as rem (assuming 16px root font size)
    },
    "& .MuiSvgIcon-root": {
      width: "1rem", // 16px as rem
    },
  })
);
