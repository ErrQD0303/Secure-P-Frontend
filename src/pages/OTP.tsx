import Box from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import { SimplePaletteColor, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";
import CookieName from "../shared/constants/cookieName";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/userSlice";

type Props = StackProps & {
  data?: { email: string };
};

export default function OTP({ data, ...props }: Props) {
  const [value, setValue] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = React.useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const theme = useTheme();
  const [cookies] = useCookies(["SecureP-OTP-Email"]);
  const [response, setResponse] = React.useState<{
    statusCode: number;
    message: string;
    error?: { summary: string };
  } | null>(null);

  const fetcher = useFetcher();
  const showLoader =
    fetcher.state === "loading" || fetcher.state === "submitting";

  const handleComplete = React.useCallback(
    (newValue: string) => {
      fetcher.submit(
        {
          type: "otp",
          otp: newValue,
          email: cookies[CookieName.TEMPORARY_EMAIL],
        },
        { method: "post" }
      );
    },
    [cookies, fetcher]
  );
  const validateChar = React.useCallback(
    (/* _character: string, _index: number */) => true,
    []
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.statusCode === 200) {
        if (fetcher.data.user) {
          dispatch(setUser(fetcher.data.user));
        }
        navigate("/");
        return;
      }
      setResponse(fetcher.data);
    }
  }, [dispatch, fetcher.data, navigate]);
  return (
    <Stack
      {...props}
      spacing={2}
      sx={{
        mt: "0.4rem",
        [theme.breakpoints.up("md")]: {
          mt: "1rem",
        },
      }}
    >
      {showLoader && (
        <Loader
          sx={{
            zIndex: 1,
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: "0.875rem",
          lineHeight: "1.313rem",
          display: "flex",
          flexDirection: "column",
          mt: "1rem",
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
            gap: "0.1rem",
          },
        }}
      >
        {response?.error && (
          <Box
            sx={{
              mt: "0.4rem",
              p: "1rem 2rem",
              bgcolor: (theme.palette.warning as SimplePaletteColor).bgcolor,
              borderRadius: "0.25rem",
              borderColor: (theme.palette.warning as SimplePaletteColor)
                .borderColor,
            }}
          >
            <Typography
              sx={{
                color: (theme.palette.warning as SimplePaletteColor).color,
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
            >
              {response?.error.summary}
            </Typography>
          </Box>
        )}
        <Box component={"span"}>Please type the code we sent to</Box>
        <Box
          component={"span"}
          sx={{
            color: "#27AE60",
            fontSize: "inherit",
            lineHeight: "inherit",
            fontWeight: 600,
          }}
        >
          {data?.email}
        </Box>
      </Typography>
      {response?.error && (
        <Box
          sx={{
            mt: "0.4rem",
            p: "1rem 2rem",
            bgcolor: (theme.palette.error as SimplePaletteColor).bgcolor,
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
            {response?.error.summary}
          </Typography>
        </Box>
      )}
      <MuiOtpInput
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        length={6}
        autoFocus
        validateChar={validateChar}
        TextFieldsProps={{
          placeholder: "•",
        }}
        sx={{
          border: "1px solid #F0F3F6",
          boxShadow: "0px 2px 4px 0px #0000000D",
          bgcolor: "#fff",
          "&.MuiOtpInput-Box": {
            gap: "0.625rem",
          },
          "& .MuiTextField-root": {
            // maxWidth: "56px",
          },
          "& .MuiInputBase-root": {
            border: "none",
            position: "relative",
          },
          "& input.MuiInputBase-input": {
            fontSize: "1.25rem",
            lineHeight: "1.875rem",
            fontWeight: "600",
            color: "#3D4B56",
            "&[value='']": {
              position: "relative",
              "&::placeholder": {},
            },
          },
          "& fieldset": {
            border: "none",
          },
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: "0.875rem",
            lineHeight: "1.313rem",
            color: "#5E6A78",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            mt: "0.5rem",
          }}
        >
          Not get the code?
          <Button
            component={"span"}
            sx={{
              cursor: "pointer",
              fontSize: "inherit",
              lineHeight: "inherit",
              color: "inherit",
              textTransform: "none",
              p: 0,
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            Resend
          </Button>
        </Typography>
      </Box>
    </Stack>
  );
}
