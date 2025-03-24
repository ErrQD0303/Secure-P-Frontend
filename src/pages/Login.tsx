import LoginSignUpLayout from "../layouts/LoginSignUpLayout";
import { redirect, useFetcher } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonLink from "../components/ButtonLink";
import Stack from "@mui/material/Stack";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import React from "react";
import Loader from "../components/Loader";
import OTP from "./OTP";
import { SimplePaletteColor } from "@mui/material/styles";
import logoPng from "/logo.png";
import { ILoginError } from "../services/userService";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../store/userSlice";

function Login() {
  const theme = useTheme();
  const fetcher = useFetcher();
  const [response, setResponse] = React.useState<{
    statusCode: number;
    message: string;
    errors: ILoginError;
    loginData?: { email: string };
  } | null>(null);

  const isAuth = useSelector(isAuthenticated);

  const showSpinner =
    fetcher.state === "loading" || fetcher.state === "submitting";

  const showOtpPage = response?.statusCode.toString() === "200";

  const [pageText, showWelcomeText] = React.useMemo(
    () =>
      !showOtpPage
        ? ["Login to your account", true]
        : ["Enter your code", false],
    [showOtpPage]
  );
  const formFields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      registerError: response?.errors?.email,
      slotProps: {
        input: {
          /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
        mt: "2.1rem",
        mb: "1.5rem",
        "& input.MuiInputBase-input": {
          ["-webkit-box-shadow"]: "initial",
          ["-webkit-text-fill-color"]: "initial",
          caretColor: "red",
        },
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      registerError: response?.errors?.password,
      required: true,
      slotProps: {
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
      },
    },
    {
      name: "type",
      type: "hidden",
      value: "login",
      sx: {
        display: "none",
      },
    },
  ];

  React.useEffect(() => {
    if (isAuth) {
      redirect("/");
    }
  }, [isAuth]);

  React.useEffect(() => {
    if (fetcher.data) {
      setResponse(fetcher.data);
    }
  }, [fetcher.data, response]);

  return (
    <>
      <fetcher.Form method="POST">
        <LoginSignUpLayout
          sx={{
            color: "#3D4B56",
            "& .PageLogo": {
              my: "4rem",
            },
          }}
          pageText={pageText}
          showWelcomeText={showWelcomeText}
          gridColumns={{ base: 1 }}
        >
          {!showOtpPage ? (
            <>
              {response?.errors && (
                <Grid
                  size={{
                    base: 1,
                  }}
                  sx={{
                    mt: "0.4rem",
                    p: "1rem 2rem",
                    bgcolor: (theme.palette.error as SimplePaletteColor)
                      .bgcolor,
                    borderRadius: "0.25rem",
                    borderColor: (theme.palette.error as SimplePaletteColor)
                      .borderColor,
                  }}
                >
                  <Typography
                    sx={{
                      color: (theme.palette.error as SimplePaletteColor).color,
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {response?.errors.summary}
                  </Typography>
                </Grid>
              )}
              {formFields.map((field) => (
                <Grid
                  key={field.name}
                  sx={{
                    flex: "1 1 auto",
                  }}
                  size={1}
                >
                  <TextField
                    id={field.name}
                    variant="outlined"
                    placeholder={field.label}
                    error={Boolean(field.registerError)}
                    helperText={field?.registerError}
                    {...field}
                  />
                </Grid>
              ))}
              <Grid
                size={{
                  base: 1,
                }}
                sx={{
                  mt: "0.4rem",
                }}
              >
                <ButtonLink
                  type="none"
                  to="/password-reset"
                  sx={{
                    textAlign: "right",
                    display: "block",
                    width: "100%",
                    textDecoration: "none",
                    color: "#3D4B56",
                    fontSize: "0.75rem",
                    lineHeight: "1.125rem",
                  }}
                >
                  Forgot password?
                </ButtonLink>
              </Grid>
              <Grid
                size={{
                  base: 1,
                }}
                sx={{
                  my: "1.5rem",
                  [theme.breakpoints.up("sm")]: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    py: "0.84rem",
                    textTransform: "capitalize",
                    borderRadius: "0.25rem",
                    [theme.breakpoints.up("sm")]: {
                      width: "180px",
                      height: "44px",
                    },
                  }}
                >
                  {showSpinner ? <Loader /> : "Login"}
                </Button>
              </Grid>
              <Grid
                size={{
                  base: 1,
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  spacing={0.5}
                >
                  <Typography component={"h3"} sx={{ flex: "0 0 auto" }}>
                    Don't have an account?
                  </Typography>
                  <ButtonLink
                    to="/signup"
                    type="link"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      fontWeight: 600,
                      flex: "0 1 auto",
                      width: "auto",
                    }}
                  >
                    Sign up
                  </ButtonLink>
                </Stack>
              </Grid>
            </>
          ) : (
            <OTP data={response?.loginData} />
          )}
        </LoginSignUpLayout>
      </fetcher.Form>
      {showOtpPage || (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            src={logoPng}
            sx={{
              maxWidth: "375px",
            }}
          ></Box>
        </Stack>
      )}
    </>
  );
}

export default Login;
