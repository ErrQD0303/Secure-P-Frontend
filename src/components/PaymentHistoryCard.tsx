import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { IProductType } from "../types/enum.d.ts";
import { ISubscriptionDetail } from "../types/subscription";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { getCasualRevenueCardDateString } from "../shared/helpers/dates";

type Props = ISubscriptionDetail;

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
}: Props) {
  const theme = useTheme();
  const totalFee = clampingFee + changeSignageFee;
  const parkingType = productType === IProductType.Tenant ? "Monthly" : "Daily";
  return (
    <StyledContainer>
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
                  {getCasualRevenueCardDateString(startDate)}
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
    </StyledContainer>
  );
}

export default PaymentHistoryCard;
