import React from "react";
import { Form, useFetcher } from "react-router-dom";
import LoginSignUpLayout from "../layouts/LoginSignUpLayout";
import Grid from "@mui/material/Grid2";
import {
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ButtonLink from "../components/ButtonLink";

type Props = {};

const StyledForm = styled(Form)(() => ({}));

const StyledLoginSignUpLayout = styled(LoginSignUpLayout)(() => ({
  color: "#3D4B56",
  "& .PageLogo": {
    margin: "4rem 0", // Replace `my` with `margin` shorthand
    width: "100%",
  },
  "& .Layout-PageText": {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#3D4B56",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
}));

const StyledGrid = styled(Grid)(() => ({
  flex: "1 1 auto",
  margin: "1.2rem 0",
}));

const StyledTextInput = styled(TextField)(() => ({
  width: "100%",
  "& input.MuiInputBase-input": {
    ["-webkit-box-shadow"]: "initial",
    ["-webkit-text-fill-color"]: "initial",
    caretColor: "red",
  },
}));

const StyledFormInfo = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "#4B5563", // Darker color
}));

const ResetPasswordButton = styled(ButtonLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 600,
  flex: "0 1 auto",
  width: "auto",
}));

function ForgotPassword({}: Props) {
  const fetcher = useFetcher();
  return (
    <StyledForm method="post" action="/forgot-password">
      <StyledLoginSignUpLayout
        showWelcomeText={false}
        pageText={"Reset your Password"}
        gridColumns={{
          base: 1,
          lg: 4,
        }}
      >
        <StyledGrid
          size={{
            base: 1,
            lg: 2,
          }}
          offset={{
            base: 0,
            lg: 1,
          }}
        >
          <StyledFormInfo>
            Enter your email address and we will send you instructions to reset
            your password
          </StyledFormInfo>
        </StyledGrid>
        <StyledGrid
          key={"email"}
          size={{
            base: 1,
            lg: 2,
          }}
          offset={{
            base: 0,
            lg: 1,
          }}
        >
          <StyledTextInput
            id="email"
            name="email"
            variant="outlined"
            placeholder="Your email address"
            error={false}
            helperText={""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </StyledGrid>
        <StyledGrid
          key={"email"}
          size={{
            base: 1,
            lg: 2,
          }}
          offset={{
            base: 0,
            lg: 1,
          }}
        >
          <Stack direction={"row"} spacing={2} justifyContent="center">
            <ResetPasswordButton
              buttonProps={{
                variant: "contained",
                color: "primary",
                type: "submit",
                disabled: fetcher.state !== "idle",
              }}
              type="button"
              aria-label="Reset Password"
            >
              Reset Password
            </ResetPasswordButton>
          </Stack>
        </StyledGrid>
      </StyledLoginSignUpLayout>
    </StyledForm>
  );
}

export default ForgotPassword;
