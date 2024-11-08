import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import PaymentHistoryCard from "../components/PaymentHistoryCard";
import { ISubscriptionDetail } from "../types/subscription";
import Stack from "@mui/material/Stack";
import ButtonLink from "../components/ButtonLink";
import Button from "@mui/material/Button";
import AddNewIcon from "../components/svg-icons/AddNew";
import React from "react";
import Loader from "../components/Loader";

function PaymentHistory() {
  const theme = useTheme();
  const { routeName, showBodyRouteName } = useOutletContext() as {
    routeName: string;
    showBodyRouteName: boolean;
  };
  const { subscriptionDetails: details, isNextPageAvailable: isNextPageAval } =
    useLoaderData() as {
      subscriptionDetails: ISubscriptionDetail[];
      isNextPageAvailable: boolean;
    };

  const [paymentDetails, setPaymentDetails] =
    React.useState<ISubscriptionDetail[]>(details);
  const [pageOffset, setPageOffset] = React.useState(0);
  const [isNextPageAvailable, setIsNextPageAvailable] =
    React.useState<boolean>(isNextPageAval);

  const fetcher = useFetcher();

  const showSpinner =
    fetcher.state === "loading" || fetcher.state === "submitting";

  React.useEffect(() => {
    if (fetcher.data) {
      setPaymentDetails((prevDetails) => [
        ...prevDetails,
        ...fetcher.data.subscriptionDetails,
      ]);
      setIsNextPageAvailable(fetcher.data.isNextPageAvailable);
      setPageOffset((prevOffset) => prevOffset + 1);
    }
  }, [fetcher.data]);
  return (
    <>
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
          {showBodyRouteName && (
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
                {routeName}
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
          )}
          <Stack spacing={2.5}>
            {paymentDetails.map((pd) => (
              <PaymentHistoryCard {...pd} fullDetailed />
            ))}
            {isNextPageAvailable && (
              <fetcher.Form method="POST">
                <input type="hidden" name="pageOffset" value={pageOffset} />
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: "0.375rem",
                    p: "0.875rem",
                    textTransform: "capitalize",
                    position: "relative",
                  }}
                  type="submit"
                >
                  {showSpinner && <Loader />}
                  <AddNewIcon />
                  <Box component={"span"} sx={{ textTransform: "none" }}>
                    Load more
                  </Box>
                </Button>
              </fetcher.Form>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default PaymentHistory;
