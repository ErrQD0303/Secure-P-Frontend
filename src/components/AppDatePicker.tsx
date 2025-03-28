import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Dayjs } from "dayjs";

const StyledStaticDatePicker = styled(DatePicker)({
  ".MuiPickersToolbar-root": {
    color: "#1565c0",
    borderRadius: "2px",
    borderWidth: "1px",
    borderColor: "#2196f3",
    border: "1px solid",
    backgroundColor: "#90caf9",
  },
});

export default function AppDatePicker({
  name,
  defaultValue,
  disableFuture,
  error,
  helperText,
}: {
  name?: string;
  defaultValue?: Dayjs | null;
  disableFuture?: boolean;
  error?: boolean;
  helperText?: string;
}) {
  return (
    <StyledStaticDatePicker
      label="dd/mm/yyyy"
      views={["day", "month", "year"]}
      name={name}
      slots={{
        openPickerIcon: CalendarMonthIcon,
      }}
      defaultValue={defaultValue}
      disableFuture={disableFuture ?? false}
      slotProps={{
        textField: {
          error: error,
          helperText: helperText,
          sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          },
        },
      }}
    />
  );
}
