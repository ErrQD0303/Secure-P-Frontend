import Box from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import { SimplePaletteColor, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
import { useFetcher, useNavigate } from "react-router-dom";

type Props = StackProps;

export default function OTP(props: Props) {
  const [value, setValue] = React.useState<string>("");
  const handleChange = React.useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  const theme = useTheme();
  const [response, setResponse] = React.useState<{
    status: number;
    message: string;
    error?: { credentials: string };
  } | null>(null);

  const fetcher = useFetcher();
  const handleComplete = React.useCallback(
    (newValue: string) => {
      fetcher.submit({ type: "otp", otp: newValue }, { method: "post" });
    },
    [fetcher]
  );
  const validateChar = React.useCallback(
    (/* _character: string, _index: number */) => true,
    []
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.status === 200) {
        navigate("/");
        return;
      }
      setResponse(fetcher.data);
    }
  }, [fetcher.data, navigate]);
  return (
    <Stack {...props}>
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
            {response?.error.credentials}
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
        sx={{
          "&.MuiOtpInput-Box": {
            gap: "0.625rem",
          },
          "& .MuiTextField-root": {
            maxWidth: "56px",
          },
        }}
      />
    </Stack>
  );
}
