import { ISubscriptionDetail } from "../types/subscription";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import ButtonLink from "./ButtonLink";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import {
  format12HourTime,
  getCasualRevenueCardDateString,
} from "../shared/helpers/dates";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props = ISubscriptionDetail;

function CasualRevenueCard(props: Props) {
  const theme = useTheme();
  const {
    endDate,
    parkingLocation,
    isPaid,
    clampingFee,
    changeSignageFee,
    startDate,
  } = props;
  const isActive = isPaid && endDate?.getTime() > new Date().getTime();
  const totalFee = clampingFee + changeSignageFee;
  return (
    <Container
      sx={{
        m: "0.625rem 0.75rem",
        bgcolor: "#fff",
        p: "0.625rem 1rem",
        borderRadius: "0.25rem",
      }}
    >
      <Stack spacing={0.5}>
        <Box>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 700,
              color: isActive ? theme.palette.primary.main : "#A3B0BF",
            }}
          >
            <ButtonLink
              to="/"
              type="link"
              sx={{
                fontWeight: "inherit",
                color: "inherit",
                p: 0,
                m: 0,
              }}
            >
              <Box
                component={"span"}
                sx={{
                  display: "flex",
                  gap: 0,
                  padding: 0,
                  alignItems: "center",
                  fontWeight: "inherit",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: "1.313rem",
                    fontWeight: "inherit",
                  }}
                >
                  Casual Revenue
                </Typography>
                <NavigateNextIcon
                  viewBox="3 2.5 20 20"
                  sx={{
                    transform: "scale(70%)",
                    fontWeight: "inherit",
                  }}
                />
              </Box>
            </ButtonLink>
            <Typography
              sx={{
                fontWeight: "inherit",
                fontSize: "1.25rem",
                lineHeight: "1.875rem",
                color: isActive ? "inherit" : "#2A2A5B",
              }}
            >
              <Box
                component={"span"}
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                }}
              >
                $
              </Box>
              {totalFee}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ color: "#202042", fontSize: "0.75rem", lineHeight: "1rem" }}>
          <Stack spacing={1}>
            <Box>
              <Stack>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "inherit",
                      lineHeight: "inherit",
                      fontWeight: 500,
                    }}
                  >
                    {parkingLocation.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "#A3B0BF",
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <PlaceIcon
                      sx={{
                        width: "1rem",
                        color: "#5E6A78",
                        transform: "translateX(-0.188rem)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "inherit",
                        lineHeight: "inherit",
                      }}
                    >
                      {parkingLocation.address}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ mt: "0.25rem" }}>
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                }}
                spacing={2}
              >
                <Box sx={{ flexBasis: "7rem" }}>
                  <Stack>
                    <Box>
                      <Stack direction={"row"} sx={{}}>
                        <CalendarMonthIcon
                          sx={{
                            width: "0.9rem",
                            color: "#5E6A78",
                            transform: "translate(-0.188rem, -0.313rem)",
                          }}
                        />
                        <Stack direction={"column"}>
                          <Typography
                            sx={{
                              fontSize: "inherit",
                              lineHeight: "inherit",
                              fontWeight: 500,
                            }}
                          >
                            {getCasualRevenueCardDateString(startDate)}
                          </Typography>
                          <Box
                            sx={{
                              color: "#A3B0BF",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "inherit",
                                lineHeight: "inherit",
                              }}
                            >
                              {format12HourTime(startDate)}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
                <ArrowForwardIcon />
                <Box sx={{ flexBasis: "7rem" }}>
                  <Stack>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "inherit",
                          lineHeight: "inherit",
                          fontWeight: 500,
                        }}
                      >
                        {getCasualRevenueCardDateString(endDate)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        color: "#A3B0BF",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "inherit",
                          lineHeight: "inherit",
                        }}
                      >
                        {format12HourTime(endDate)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                {isActive ? (
                  <Chip
                    label="Active"
                    sx={{
                      textTransform: "uppercase",
                      color: "#fff",
                      bgcolor: theme.palette.primary.main,
                      height: "0.9375rem",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      lineHeight: 1,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "0.2rem",
                      "& .MuiChip-label": {
                        px: "0.21875rem",
                        textTransform: "capitalize",
                      },
                      [theme.breakpoints.up("md")]: {
                        fontSize: "0.75rem",
                        lineHeight: "1.125rem",
                      },
                    }}
                  />
                ) : (
                  <Chip
                    label="Expired"
                    sx={{
                      textTransform: "uppercase",
                      color: "#A3B0BF",
                      bgcolor: "#E2E8F0",
                      height: "0.9375rem",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      lineHeight: 1,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "0.2rem",
                      "& .MuiChip-label": {
                        px: "0.21875rem",
                        textTransform: "capitalize",
                      },
                      [theme.breakpoints.up("md")]: {
                        fontSize: "0.75rem",
                        lineHeight: "1.125rem",
                      },
                    }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default CasualRevenueCard;
