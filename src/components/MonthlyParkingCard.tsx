import {
  Box,
  Chip,
  Container,
  ContainerProps,
  Divider,
  Stack,
  Typography,
  useTheme,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpiredClockIcon from "./svg-icons/ExpiredClock";
import ClockIcon from "./svg-icons/Clock";
import MonthlyParkingCardBody from "./MonthlyParkingCardBody";
import {
  formatTimeLeft,
  getDailyParkingCardDateString,
} from "../shared/helpers/dates";
import { ISubscriptionDetail } from "../types/subscription";
import ButtonLink from "./ButtonLink";
import React from "react";
import { styled, SxProps, Theme } from "@mui/system";
import DetailedMonthlyParkingCardBody from "./DetailedMonthlyParkingCardBody";
import { getParkingType } from "../shared/helpers/parkings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import cardBackground from "/public/card-background.png";

type Props = ContainerProps & {
  subscriptionDetail: ISubscriptionDetail;
  fullDetailed?: boolean;
};

const StyledContainer = styled(Container)(() => ({}));

function MonthlyParkingCard({
  subscriptionDetail,
  fullDetailed,
  sx = {} as SxProps,
  ...props
}: Props) {
  const {
    id,
    endDate,
    licensePlate,
    parkingZone,
    parkingLocation,
    isPaid,
    subscriptionFee,
    clampingFee,
    changeSignageFee,
    productType,
  } = subscriptionDetail;
  const remainingTime = (endDate?.getTime() - new Date().getTime()) / 1000;
  const isExpired = remainingTime <= 0;
  const theme = useTheme();
  const defaultSx = React.useMemo(
    () => ({
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden",
      padding: 0,
      color: "#fff",
      borderRadius: "0.25rem",
      background: `url("${cardBackground}") right 0.3125rem center no-repeat, linear-gradient(#0093D0 0%, #0055A5 90%)`,
      // border: "0.0625rem solid #69BCDE",
      minWidth: "21.6875rem",
      maxWidth: "21.6875rem",
      height: "11.625rem",
      [theme.breakpoints.up("sm")]: {
        padding: 0,
      },
      [theme.breakpoints.up("md")]: {
        minWidth: "auto",
        maxWidth: "none",
        boxShadow: "0px 4px 4px 0px #B8C5D033",
        border: "1px solid #D8E0ED",
        background: "#FFFFFF",
        height: "auto",
        color: "#5E6A78",
      },
    }),
    [theme.breakpoints]
  ) as SxProps<Theme>;

  const [anchorEle, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = React.useMemo(() => !!anchorEle, [anchorEle]);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(
        event.currentTarget.closest(".dropdown-parent") as HTMLElement | null
      );
    },
    []
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const totalFee = React.useMemo(
    () => subscriptionFee + clampingFee + changeSignageFee,
    [changeSignageFee, clampingFee, subscriptionFee]
  );

  const outputFeeData = React.useMemo(
    () => [
      {
        name: "Subscription Fee",
        value: `$${subscriptionFee}`,
      },
      {
        name: "Clamping Fee",
        value: `$${clampingFee}`,
      },
      {
        name: "Change Signage Fee",
        value: `$${changeSignageFee}`,
      },
      {
        name: "Total Fee",
        value: `$${totalFee}`,
      },
    ],
    [subscriptionFee, clampingFee, changeSignageFee, totalFee]
  );

  const parkingType = getParkingType(productType);

  return (
    <StyledContainer
      sx={{
        ...defaultSx,
        ...(fullDetailed
          ? {
              height: "auto",
            }
          : {}),
        ...sx,
      }}
      {...props}
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
          [theme.breakpoints.up("md")]: {
            color: "#2D9CDB",
            bgcolor: "transparent",
          },
          ...(fullDetailed && {
            [theme.breakpoints.up("lg")]: {
              p: "1rem 3rem",
              fontSize: "1rem",
              lineHeight: "1.5rem",
            },
          }),
        }}
      >
        <Box
          sx={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            [theme.breakpoints.up("md")]: {
              flexDirection: "column",
              alignItems: "start",
            },
          }}
        >
          <Stack
            direction={"row"}
            spacing={{
              base: 0,
              md: 1.5,
            }}
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                bgcolor: "#D6ECF5",
                borderRadius: "9999px",
                display: "none",
                [theme.breakpoints.up("md")]: {
                  display: "block",
                },
              }}
            >
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <DirectionsCarIcon
                  sx={{
                    color: theme.palette.primary.main,
                    transform: "translateY(-0.125rem)",
                  }}
                />
              </Stack>
            </Box>
            <Stack
              direction={{
                base: "row",
                md: "column",
              }}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                [theme.breakpoints.up("md")]: {
                  alignItems: "start",
                  justifyContent: "center",
                },
              }}
            >
              <ButtonLink
                type="none"
                to={`/subscriptions/${id}`}
                state={subscriptionDetail as unknown}
                sx={{
                  color: "inherit",
                  [theme.breakpoints.up("md")]: {
                    color: "#3D4B56",
                    textDecoration: "none",
                  },
                }}
              >
                <Stack>
                  <Box
                    component={"span"}
                    sx={{
                      display: "flex",
                      gap: 0,
                      padding: 0,
                      alignItems: "center",
                      [theme.breakpoints.up("md")]: {
                        color: "#3D4B56",
                        textDecoration: "none",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                      },
                    }}
                  >
                    {parkingType} Parking
                    <NavigateNextIcon
                      viewBox="3 2.5 20 20"
                      sx={{
                        [theme.breakpoints.up("md")]: {
                          display: "none",
                        },
                      }}
                    />
                  </Box>
                </Stack>
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
                  ...(fullDetailed && {
                    [theme.breakpoints.up("lg")]: {
                      fontSize: "0.875rem",
                      lineHeight: "1.313rem",
                    },
                  }),
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
                        [theme.breakpoints.up("md")]: {
                          color: "#2D9CDB",
                        },
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
                        [theme.breakpoints.up("md")]: {
                          color: "#AFBDD4",
                        },
                      }}
                    >
                      <ExpiredClockIcon />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        lineHeight: "inherit",
                        [theme.breakpoints.up("md")]: {
                          color: "#AFBDD4",
                        },
                      }}
                    >
                      Expired
                    </Typography>
                  </>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Divider />
      {fullDetailed ? (
        <DetailedMonthlyParkingCardBody
          subscriptionDetail={subscriptionDetail}
          sx={{
            zIndex: 0,
            [theme.breakpoints.up("lg")]: {
              p: "1rem 3rem",
            },
          }}
        />
      ) : (
        <MonthlyParkingCardBody
          expireDate={getDailyParkingCardDateString(endDate)}
          licensePlate={licensePlate}
          parkingZone={parkingZone.name}
          parkingLocation={parkingLocation.address}
        />
      )}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        <Box
          component="hr"
          sx={{
            border: 0,
            borderTop: "3px dotted #69BCDE",
            margin: 0,
            display: "flex",
            width: "93%",
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          }}
        ></Box>
        {!fullDetailed && (
          <>
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
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
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
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
            ></Box>
          </>
        )}
      </Box>
      <Stack
        className="dropdown-parent"
        sx={{
          py: fullDetailed ? "1rem" : 0,
          ...(fullDetailed && {
            [theme.breakpoints.up("md")]: {},
          }),
          [theme.breakpoints.up("md")]: {
            color: "#fff",
            bgcolor: !isExpired ? "#56CCF2" : "#AFBDD4",
            m: "0rem 1.1rem 1.1rem 1.1rem",
            borderRadius: "0.375rem",
            py: "0.3rem",
            ...(fullDetailed && {
              mx: "2.2rem",
            }),
          },
        }}
      >
        {fullDetailed && (
          <Stack
            spacing={0}
            sx={{
              [theme.breakpoints.up("md")]: {
                pt: "0.5rem",
              },
            }}
          >
            {outputFeeData.slice(0, -1).map(({ name, value }) => (
              <Box
                key={name}
                sx={{
                  px: "1rem",
                  flex: "0 1 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  component={"span"}
                  sx={{
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                  }}
                >
                  {name}:
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  <Box component={"span"} sx={{}}>
                    {value}
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
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
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }}
          >
            {fullDetailed ? "Total Amount" : "Charge"}:
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.375rem",
              [theme.breakpoints.up("md")]: {
                flexDirection: "row-reverse",
              },
            }}
          >
            {fullDetailed || (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="text"
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    color: "#fff",
                    display: "none",
                    [theme.breakpoints.up("md")]: { display: "flex" },
                  }}
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEle}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      width: anchorEle?.clientWidth,
                      color: "#5E6A78",
                    },
                  }}
                >
                  {outputFeeData.map(({ name, value }) => (
                    <MenuItem
                      key={name}
                      onClick={handleClose}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        ...(name === outputFeeData.slice(-1)[0].name
                          ? {
                              fontSize: "1rem",
                              lineHeight: "1.5rem",
                              fontWeight: 600,
                            }
                          : {
                              fontSize: "0.875rem",
                              lineHeight: "1.375rem",
                            }),
                      }}
                    >
                      <Box>{name}</Box>
                      <Box>{value}</Box>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
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
                {totalFee}
              </Box>
            </Box>
            {fullDetailed || (
              <>
                {isPaid ? (
                  <Chip
                    label="PAID"
                    sx={{
                      textTransform: "uppercase",
                      color: "#197654",
                      bgcolor: "#7CFCDD",
                      fontSize: "75%",
                      fontWeight: 500,
                      lineHeight: 1,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "auto",
                      "& .MuiChip-label": {
                        px: "0.21875rem",
                      },
                      [theme.breakpoints.up("md")]: {
                        color: "#846711",
                        bgcolor: "#FFD75C",
                        fontSize: "0.625rem",
                        lineHeight: "0.938rem",
                        ".MuiChip-label": {
                          px: "0.21875rem",
                          py: "0.05rem",
                          horizontalAlign: "center",
                        },
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
                      fontSize: "75%",
                      fontWeight: 500,
                      lineHeight: 1,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "auto",
                      "& .MuiChip-label": {
                        px: "0.21875rem",
                        py: "0.1rem",
                        horizontalAlign: "center",
                      },
                      [theme.breakpoints.up("md")]: {
                        color: "#DEE7EE",
                        bgcolor: "#664DFD",
                        fontSize: "0.625rem",
                        lineHeight: "0.938rem",
                      },
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </StyledContainer>
  );
}

export default MonthlyParkingCard;
