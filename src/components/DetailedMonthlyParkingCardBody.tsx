import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import styled from "@mui/material/styles/styled";
import { BoxProps } from "@mui/material/Box";
import { ISubscriptionDetail } from "../types/subscription";
import { getDailyParkingCardDateString } from "../shared/helpers/dates";
import React from "react";
import { useTheme } from "@emotion/react";

type Props = BoxProps & { subscriptionDetail: ISubscriptionDetail };

const StyledBox = styled(Box)(() => ({
  padding: "0.625rem 1rem",
  flex: "1",
  display: "grid",
  gridTemplateRows: "repeat(2, 1fr)",
  gridTemplateColumns: "repeat(3, 1fr)",
  alignItems: "center",
  rowGap: "0.625rem",
}));

function DetailedMonthlyParkingCardBody({
  subscriptionDetail: {
    startDate,
    endDate,
    paymentDate,
    licensePlate,
    parkingZone,
    parkingLocation,
    isPaid,
  },
  ...props
}: Props) {
  const gridCellData = React.useMemo(
    () => [
      {
        label: "Start Date",
        value: getDailyParkingCardDateString(startDate),
        gridRow: "1",
        gridColumn: "span 1",
      },
      {
        label: "Expiration Date",
        value: getDailyParkingCardDateString(endDate),
        gridRow: "1",
        gridColumn: "span 1",
      },
      {
        label: "Payment Date",
        value: isPaid ? (
          getDailyParkingCardDateString(paymentDate!)
        ) : (
          <Chip
            label="UNPAID"
            sx={{
              textTransform: "uppercase",
              color: "#745341",
              bgcolor: "#FB8F89",
              height: "0.9375rem",
              fontSize: "75%",
              fontWeight: 500,
              lineHeight: 1,
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              width: "3.125rem",
              justifyContent: "center",
              "& .MuiChip-label": {
                px: "0.21875rem",
              },
            }}
          />
        ),
        gridRow: "2",
        gridColumn: "span 1",
      },
      {
        label: "License plate",
        value: licensePlate,
        gridRow: "2",
        gridColumn: "span 1",
      },
      {
        label: "Parking Location",
        value: parkingLocation.address,
        gridRow: "3",
        gridColumn: "span 3",
      },
      {
        label: "Parking zone",
        value: parkingZone.name,
        gridRow: "4",
        gridColumn: "span 3",
      },
    ],
    [
      endDate,
      isPaid,
      licensePlate,
      parkingLocation.address,
      parkingZone.name,
      paymentDate,
      startDate,
    ]
  );

  const theme = useTheme();

  return (
    <StyledBox {...props}>
      {gridCellData.map(({ label, value, gridRow, gridColumn }) => (
        <Box
          key={label}
          sx={{
            fontWeight: "400",
            gridRow,
            gridColumn,
          }}
        >
          <Box
            sx={{
              color: "#77EFFF",
              fontSize: "0.625rem",
              lineHeight: "0.9375rem",
              textTransform: "uppercase",
              textAlign: "left",
              [theme.breakpoints.up("lg")]: {
                fontSize: "0.75rem",
                lineHeight: "1.125rem",
              },
            }}
          >
            {label}
          </Box>
          <Box
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
              [theme.breakpoints.up("lg")]: {
                fontSize: "0.875rem",
                lineHeight: "1.313rem",
              },
            }}
          >
            {value}
          </Box>
        </Box>
      ))}
    </StyledBox>
  );
}

export default DetailedMonthlyParkingCardBody;
