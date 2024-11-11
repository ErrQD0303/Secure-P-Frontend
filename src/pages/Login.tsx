import LoginSignUpLayout from "../layouts/LoginSignUpLayout";
import { useFetcher } from "react-router-dom";
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

function Login() {
  const theme = useTheme();
  const fetcher = useFetcher();
  const [response, setResponse] = React.useState<{
    status: number;
    message: string;
    error?: { credentials: string };
    loginData?: { phone: string };
  } | null>(null);

  const showSpinner =
    fetcher.state === "loading" || fetcher.state === "submitting";

  const showOtpPage = response?.status.toString() === "200";

  const [pageText, showWelcomeText] = React.useMemo(
    () =>
      !showOtpPage
        ? ["Login to your account", true]
        : ["Enter your code", false],
    [showOtpPage]
  );
  const formFields = [
    {
      name: "phone",
      type: "phone",
      label: "Phone number",
      required: true,
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
              {response?.error && (
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
                    {response?.error.credentials}
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
            src="/src/assets/loginPng.png"
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
