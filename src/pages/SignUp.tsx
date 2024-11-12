import LoginSignUpLayout from "../layouts/LoginSignUpLayout";
import { Form } from "react-router-dom";
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
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function SignUp() {
  const theme = useTheme();
  const formFields = [
    {
      name: "accountType",
      type: "radio",
      column: {
        base: 3,
      },
      sx: {
        width: "100%",
      },
      formLabel: {
        id: "account-type-row-radio-buttons-group-label",
        children: "Gender",
      },
      radioGroup: {
        row: true,
        name: "account-type-row-radio-buttons-group",
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          with: "100%",
          [theme.breakpoints.up("sm")]: {
            justifyContent: "flex-start",
          },
        },
      },
      formControlLabels: [
        {
          label: "Individual",
          value: "personal",
          control: <Radio required />,
          sx: {
            "& .MuiFormControlLabel-asterisk": {
              display: "none",
            },
          },
        },
        {
          label: "Company",
          value: "company",
          control: <Radio required sx={{ borderRadius: 0 }} />,
          sx: {
            "& .MuiFormControlLabel-asterisk": {
              display: "none",
            },
          },
        },
      ],
    },
    {
      name: "name",
      type: "text",
      label: "Your name",
      required: true,
      column: {
        base: 3,
      },
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
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      column: {
        base: 3,
      },
      slotProps: {
        input: {
          /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
        mt: "2.1rem",
      },
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone number",
      required: true,
      column: {
        base: 3,
      },
      slotProps: {
        input: {
          /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
          startAdornment: (
            <InputAdornment position="start">
              <PhoneAndroidIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
        mt: "2.1rem",
      },
    },
    {
      name: "country",
      type: "text",
      label: "Nationality",
      required: true,
      column: {
        base: 3,
      },
      slotProps: {
        input: {
          /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
          startAdornment: (
            <InputAdornment position="start">
              <TravelExploreIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
        mt: "2.1rem",
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      column: {
        base: 3,
      },
      slotProps: {
        input: {
          /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
        mt: "2.1rem",
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Re-enter password",
      required: true,
      column: {
        base: 3,
      },
      slotProps: {
        input: {
          /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        },
      },
      sx: {
        width: "100%",
        mt: "2.1rem",
      },
    },
  ];

  return (
    <>
      <Form method="POST">
        <LoginSignUpLayout
          sx={{
            color: "#3D4B56",
            "& .PageLogo": {
              my: "1rem",
            },
          }}
          pageText="Login to your account"
          gridColumns={{ base: 1 }}
        >
          {formFields.map((field) => {
            return (
              <Grid
                key={field.name}
                sx={{
                  flex: "1 1 auto",
                }}
                size={field.column}
              >
                {field.type === "radio" ? (
                  <FormControl sx={field.sx}>
                    <RadioGroup {...field.radioGroup}>
                      {field.formControlLabels?.map((formControlLabel, idx) => (
                        <FormControlLabel
                          {...formControlLabel}
                          key={idx}
                          id={field.name}
                          name={field.name}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <TextField
                    id={field.name}
                    variant="outlined"
                    placeholder={field.label}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    InputProps={field.slotProps?.input}
                    sx={field.sx}
                  />
                )}
              </Grid>
            );
          })}
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
              Sign Up
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
              mt: "1.5rem",
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
                Already have an account?
              </Typography>
              <ButtonLink
                to="/login"
                type="link"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  flex: "0 1 auto",
                  width: "auto",
                }}
              >
                Sign in
              </ButtonLink>
            </Stack>
          </Grid>
        </LoginSignUpLayout>
      </Form>
    </>
  );
}

export default SignUp;
