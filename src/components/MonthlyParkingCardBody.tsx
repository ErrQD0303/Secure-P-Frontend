import { Box } from "@mui/material";

type Props = {
  expireDate: string;
  licensePlate: string;
  parkingZone: string;
  parkingLocation: string;
};

function MonthlyParkingCardBody({
  expireDate,
  licensePlate,
  parkingZone,
  parkingLocation,
}: Props) {
  return (
    <Box
      sx={{
        px: "1rem",
        py: "0.625rem",
        flex: "1",
        display: "grid",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignItems: "center",
        rowGap: "0.625rem",
      }}
    >
      <Box
        sx={{
          fontWeight: "400",
          gridColumn: "span 1",
        }}
      >
        <Box
          sx={{
            color: "#77EFFF",
            fontSize: "0.625rem",
            lineHeight: "0.9375rem",
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          Expiration Date
        </Box>
        <Box
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
          }}
        >
          {expireDate}
        </Box>
      </Box>
      <Box
        sx={{
          fontWeight: "400",
          gridColumn: "span 1",
        }}
      >
        <Box
          sx={{
            color: "#77EFFF",
            fontSize: "0.625rem",
            lineHeight: "0.9375rem",
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          License plate
        </Box>
        <Box
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
          }}
        >
          {licensePlate}
        </Box>
      </Box>
      <Box
        sx={{
          fontWeight: "400",
          gridColumn: "span 1",
        }}
      >
        <Box
          sx={{
            color: "#77EFFF",
            fontSize: "0.625rem",
            lineHeight: "0.9375rem",
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          Parking zone
        </Box>
        <Box
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
          }}
        >
          {parkingZone}
        </Box>
      </Box>
      <Box
        sx={{
          fontWeight: "400",
          gridColumn: "span 3",
        }}
      >
        <Box
          sx={{
            color: "#77EFFF",
            fontSize: "0.625rem",
            lineHeight: "0.9375rem",
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          Parking Location
        </Box>
        <Box
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
          }}
        >
          {parkingLocation.slice(0, 76)}
        </Box>
      </Box>
    </Box>
  );
}

export default MonthlyParkingCardBody;
