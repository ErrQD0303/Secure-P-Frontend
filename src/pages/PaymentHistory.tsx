import Banner from "../components/Banner";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { useLoaderData } from "react-router-dom";
import PaymentHistoryCard from "../components/PaymentHistoryCard";
import { ISubscriptionDetail } from "../types/subscription";
import Stack from "@mui/material/Stack";
import ButtonLink from "../components/ButtonLink";
import Button from "@mui/material/Button";
import AddNewIcon from "../components/svg-icons/AddNew";
import React from "react";

function PaymentHistory() {
  const theme = useTheme();
  const { paymentDetails, isNextPageAvailable } = useLoaderData() as {
    paymentDetails: ISubscriptionDetail[];
    isNextPageAvailable: boolean;
  };

  // Load more Logic here
  const handleOnClick = React.useCallback(() => {
    // console.log(location.pathname);
  }, []);
  return (
    <>
      <Banner />
      <Container
        sx={{
          px: "1.437rem",
          pb: {
            base: "6.8rem",
            md: 0,
          },
          mt: "1.438rem",
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                textTransform: "capitalize",
                color: "#3D4B56",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                p: 0,
              }}
            >
              Payment History
            </Box>
            <ButtonLink
              to="/subscriptions/add"
              ariaLabel="My subscriptions"
              type="button"
              sx={{
                my: "1.4375rem",
                display: "none",
                [theme.breakpoints.up("sm")]: {
                  width: "auto",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "0.375rem",
                  p: "0.875rem",
                  textTransform: "capitalize",
                }}
              >
                <AddNewIcon />
                <Box component={"span"} sx={{}}>
                  Add New Subscription
                </Box>
              </Button>
            </ButtonLink>
          </Stack>
          <Stack spacing={2.5}>
            {paymentDetails.map((pd) => (
              <PaymentHistoryCard {...pd} fullDetailed />
            ))}
            {isNextPageAvailable && (
              <ButtonLink
                ariaLabel="My subscriptions"
                type="button"
                sx={{
                  my: "1.4375rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  [theme.breakpoints.up("sm")]: {
                    width: "auto",
                    flexShrink: 0,
                    display: "none",
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: "0.375rem",
                    p: "0.875rem",
                    textTransform: "capitalize",
                  }}
                  onClick={handleOnClick}
                >
                  <AddNewIcon />
                  <Box component={"span"} sx={{ textTransform: "none" }}>
                    Load more
                  </Box>
                </Button>
              </ButtonLink>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default PaymentHistory;
