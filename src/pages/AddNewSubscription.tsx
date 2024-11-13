import Container, { ContainerProps } from "@mui/material/Container";
import { styled } from "@mui/material/styles";
// import React from "react";

// StyledContainer with base styles
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingLeft: "1.437rem",
  paddingRight: "1.437rem",
  paddingBottom: "6.8rem",
  marginTop: "1.438rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  [theme.breakpoints.up("md")]: {
    paddingBottom: 0,
  },
}));

// AddNewSubscription component accepts sx and merges it with default styles
function AddNewSubscription({ sx, ...props }: ContainerProps) {
  return (
    <StyledContainer
      sx={{
        ...sx, // Merge the passed sx with the default ones
      }}
      {...props}
    >
      Add New Subscription
    </StyledContainer>
  );
}

export default AddNewSubscription;
