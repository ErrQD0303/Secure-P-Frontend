import { Box, Chip, Container, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpiredClockIcon from "./svg-icons/ExpiredClock";
import ClockIcon from "./svg-icons/Clock";
import MonthlyParkingCardBody from "./MonthlyParkingCardBody";
import { formatTimeLeft, getShortDayString } from "../shared/helpers/dates";
import { ISubscriptionDetail } from "../types/subscription";
import ButtonLink from "./ButtonLink";

type Props = ISubscriptionDetail;

function MonthlyParkingCard(props: Props) {
  const { endDate, licensePlate, parkingZone, parkingLocation, isPaid } = props;
  const remainingTime = (endDate?.getTime() - new Date().getTime()) / 1000;
  const isExpired = remainingTime <= 0;
  const theme = useTheme();
  return (
    <Container
      sx={{
        height: "11.625rem",
        minWidth: "21.6875rem",
        maxWidth: "21.6875rem",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        padding: 0,
        color: "#fff",
        borderRadius: "0.25rem",
        background: `url("/src/assets/card-background.png") right 0.3125rem center no-repeat, linear-gradient(#0093D0 0%, #0055A5 90%)`,
        // border: "0.0625rem solid #69BCDE",
        [theme.breakpoints.up("sm")]: {
          padding: 0,
          minWidth: "21.6875rem",
          maxWidth: "21.6875rem",
        },
      }}
    >
      <Box
        sx={{
          px: "1rem",
          py: "0.625rem",
          flex: "0 1 auto",
          bgcolor: "#0055A54D",
          fontWeight: 700,
          fontSize: "0.875rem",
          lineHeight: "1.3125rem",
          color: `${isExpired ? "white" : "#FFD75C"}`,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ButtonLink
            type="none"
            to={""}
            state={props as unknown}
            sx={{ color: "inherit" }}
          >
            <Box
              component={"span"}
              sx={{
                display: "flex",
                gap: 0,
                padding: 0,
                alignItems: "center",
              }}
            >
              Monthly Parking
              <NavigateNextIcon viewBox="3 2.5 20 20" />
            </Box>
          </ButtonLink>
          <Box
            sx={{
              textAlign: "right",
              padding: 0,
              fontWeight: 600,
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {!isExpired ? (
              <>
                <Box
                  sx={{
                    p: 0,
                    mr: "0.3125rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <ClockIcon />
                </Box>
                {formatTimeLeft(remainingTime)} left
              </>
            ) : (
              <>
                <Box
                  sx={{
                    p: 0,
                    mr: "0.3125rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <ExpiredClockIcon />
                </Box>
                Expired
              </>
            )}
          </Box>
        </Box>
      </Box>
      <MonthlyParkingCardBody
        expireDate={getShortDayString(endDate)}
        licensePlate={licensePlate}
        parkingZone={parkingZone.name}
        parkingLocation={parkingLocation.address}
      />
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "1.25rem",
            height: "1.25rem",
            zIndex: 1,
            bgcolor: theme.palette.lightBlue.main,
            borderRadius: "50%",
            position: "absolute",
            top: "0.0625rem",
            left: 0,
            transform: "translate(-70%, -50%)",
          }}
        ></Box>
        <Box
          component="hr"
          sx={{
            border: 0,
            borderTop: "2px dotted #69BCDE",
            margin: 0,
            zIndex: 1,
            display: "flex",
          }}
        ></Box>
        <Box
          sx={{
            width: "1.25rem",
            height: "1.25rem",
            zIndex: 1,
            bgcolor: theme.palette.lightBlue.main,
            borderRadius: "50%",
            position: "absolute",
            top: "0.0625rem",
            left: "100%",
            transform: "translate(-40%, -50%)",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          px: "1rem",
          py: "0.3125rem",
          flex: "0 1 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component={"span"}
          sx={{
            fontWeight: 600,
            fontSize: "0.875rem",
            lineHeight: "1.3125rem",
          }}
        >
          Charge:
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.375rem",
          }}
        >
          <Box
            component={"span"}
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
            }}
          >
            $
            <Box
              component={"span"}
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.875rem",
              }}
            >
              55
            </Box>
          </Box>
          {isPaid ? (
            <Chip
              label="PAID"
              sx={{
                textTransform: "uppercase",
                color: "#197654",
                bgcolor: "#7CFCDD",
                height: "0.9375rem",
                fontSize: "75%",
                fontWeight: 500,
                lineHeight: 1,
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiChip-label": {
                  px: "0.21875rem",
                },
              }}
            />
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
                justifyContent: "center",
                "& .MuiChip-label": {
                  px: "0.21875rem",
                },
              }}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default MonthlyParkingCard;
