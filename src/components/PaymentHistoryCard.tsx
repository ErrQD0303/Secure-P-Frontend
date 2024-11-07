import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { IProductType } from "../types/enum";
import { ISubscriptionDetail } from "../types/subscription";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import { useTheme } from "@emotion/react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { getDailyParkingCardDateString } from "../shared/helpers/dates";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";

type Props = ISubscriptionDetail & { fullDetailed?: boolean };

const StyledContainer = styled(Container)(() => ({
  backgroundColor: "#fff",
  padding: "0.875rem",
  borderRadius: "0.25rem",
}));

function PaymentHistoryCard({
  startDate,
  productType,
  clampingFee,
  changeSignageFee,
  endDate,
  parkingLocation,
  licensePlate,
  fullDetailed = false,
}: Props) {
  const theme = useTheme();
  const totalFee = clampingFee + changeSignageFee;
  const parkingType = productType === IProductType.Tenant ? "Monthly" : "Daily";
  const listItems = [
    {
      name: "Duration",
      value: `${getDailyParkingCardDateString(
        startDate
      )} - ${getDailyParkingCardDateString(endDate)}`,
      listIcon: CalendarMonthIcon,
    },
    {
      name: "Parking Location",
      value: parkingLocation.address,
      listIcon: PlaceIcon,
    },
    {
      name: "License Plate",
      value: licensePlate,
      listIcon: DirectionsCarIcon,
    },
  ];
  return (
    <StyledContainer>
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Box>
            <Stack>
              <Box
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                  bgcolor: "#D6ECF5",
                  borderRadius: "0.625rem",
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
            </Stack>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              lineHeight: "1.313rem",
              fontSize: "0.875rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Stack>
                  <Box sx={{ fontWeight: 500 }}>{parkingType} Parking</Box>
                  <Box
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "0.875rem",
                      color: "#A3B0BF",
                    }}
                  >
                    {getDailyParkingCardDateString(startDate)}
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    lineHeight: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  ${totalFee}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
        {fullDetailed && (
          <>
            <Divider />
            <List>
              {listItems.map(({ name, value, listIcon }, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    alignItems: "flex-start",
                    gap: "0.5rem",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 1 auto",
                      minWidth: "auto",
                    }}
                  >
                    {React.createElement(listIcon)}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      flex: "1 1 auto",
                      "& .MuiListItemText-primary": {
                        fontSize: "0.75rem",
                        lineHeight: "1.125rem",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {name}
                    </Box>
                    <Box>{value}</Box>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Stack>
    </StyledContainer>
  );
}

export default PaymentHistoryCard;
