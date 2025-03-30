import React from "react";
import LoginSignUpLayout from "../layouts/LoginSignUpLayout";
import {
  Grid2 as Grid,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ButtonLink from "../components/ButtonLink";
import Loader from "../components/Loader";
import { useFetcher } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { IPasswordResetResponse } from "../services/userService";

const StyledForm = styled("form")(() => ({}));

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

const StyledButtonLink = styled(ButtonLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 600,
  flex: "0 1 auto",
  width: "auto",
}));

function PasswordReset() {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const response = React.useMemo(
    () => fetcher.data as IPasswordResetResponse | null,
    [fetcher.data]
  );

  return (
    <StyledForm as={fetcher.Form} method="post">
      {isLoading && <Loader />}
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
          {response && (
            <StyledFormInfo sx={{ color: response?.success ? "green" : "red" }}>
              <Stack direction={"column"}>
                <Grid>{response?.message}</Grid>
                {response?.errors?.email && (
                  <Grid>{response?.errors?.email}</Grid>
                )}
                {response?.errors?.token && (
                  <Grid>{response?.errors?.token}</Grid>
                )}
              </Stack>
            </StyledFormInfo>
          )}
        </StyledGrid>
        <StyledGrid
          key={"password"}
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
            id="password"
            name="password"
            variant="outlined"
            placeholder="Your new password"
            type="password"
            error={!!response?.errors?.password}
            helperText={response?.errors?.password}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </StyledGrid>
        <StyledGrid
          key={"confirm-password"}
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
            id={"confirm-password"}
            name="confirm_password"
            variant="outlined"
            placeholder="Your confirm password"
            type="password"
            error={!!response?.errors?.confirm_password}
            helperText={response?.errors?.confirm_password}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </StyledGrid>
        <StyledGrid
          key={"reset-password"}
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
            <StyledButtonLink
              buttonProps={{
                variant: "contained",
                color: "primary",
                type: "submit",
                disabled: fetcher.state !== "idle",
              }}
              type="button"
              aria-label="Reset Password"
              to={response?.success ? "/login" : undefined}
            >
              {!response?.success ? "Reset Password" : "Go to Login Page"}
            </StyledButtonLink>
          </Stack>
        </StyledGrid>
      </StyledLoginSignUpLayout>
    </StyledForm>
  );
}

export default PasswordReset;
