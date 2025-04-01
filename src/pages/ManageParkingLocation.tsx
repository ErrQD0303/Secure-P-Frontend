import { styled } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import React from "react";

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    width: "100%",
    color: "#3D4B56",
    paddingLeft: "1rem",
    paddingBottom: "4rem",
    marginTop: "1rem",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "2rem",
      paddingBottom: "7rem",
      marginTop: "2rem",
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => {
  return {
    width: "100%",
    height: "100%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  };
});

const StyledGridContainer = styled(Grid)(() => ({}));

const StyledGrid = styled(Grid)(() => ({
  marginTop: "0.4rem",
}));

type Props = {};

function ManageParkingLocation({}: Props) {
  return (
    <StyledContainer>
      <StyledPaper elevation={1}>
        <StyledGridContainer
          container
          columns={{
            base: 1,
          }}
        >
          <StyledGrid
            size={{
              base: 1,
            }}
          >
            Your Parking Locations
          </StyledGrid>
        </StyledGridContainer>
      </StyledPaper>
    </StyledContainer>
  );
}

export default ManageParkingLocation;
