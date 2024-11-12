import { useFetcher, useLoaderData } from "react-router-dom";
import { ISubscriptionDetail } from "../types/subscription";
import MonthlyParkingCard from "../components/MonthlyParkingCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import Stack from "@mui/material/Stack";
import React from "react";
import Loader from "../components/Loader";
import Grid from "@mui/material/Grid2";

function MySubscriptions() {
  const { subscriptionDetails: details, isNextPageAvailable: isNextPageAval } =
    useLoaderData() as {
      subscriptionDetails: ISubscriptionDetail[];
      isNextPageAvailable: boolean;
    };

  const [subscriptionDetails, setSubscriptionDetails] =
    React.useState<ISubscriptionDetail[]>(details);
  const [pageOffset, setPageOffset] = React.useState<number>(0);
  const [isNextPageAvailable, setIsNextPageAvailable] =
    React.useState<boolean>(isNextPageAval);

  const fetcher = useFetcher();

  const showSpinner =
    fetcher.state === "loading" || fetcher.state === "submitting";

  React.useEffect(() => {
    if (fetcher.data) {
      setSubscriptionDetails((prevDetails) => [
        ...prevDetails,
        ...fetcher.data.subscriptionDetails,
      ]);
      setIsNextPageAvailable(fetcher.data.isNextPageAvailable);
      setPageOffset((prevOffset) => +prevOffset + 1);
    }
  }, [fetcher.data]);

  const theme = useTheme();

  return (
    <>
      <Container
        sx={{
          pb: {
            base: "6.8rem",
            md: 0,
          },
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          height: "auto",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              textTransform: "capitalize",
              color: "#3D4B56",
              fontWeight: 600,
              fontSize: "1.25rem",
              lineHeight: "1.875rem",
              p: 0,
            }}
          >
            Monthly Parking Subscriptions
          </Box>
        </Stack>
        <Grid
          container
          rowGap={2}
          spacing={2}
          columns={{
            base: 1,
            lg: 2,
          }}
        >
          {subscriptionDetails.map((subscriptionDetail, idx) => (
            <Grid
              size={1}
              key={subscriptionDetail.id}
              sx={{
                [theme.breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: idx % 2 ? "start" : "end",
                },
              }}
            >
              <MonthlyParkingCard
                subscriptionDetail={subscriptionDetail}
                sx={{
                  minWidth: "20.438rem",
                  maxWidth: "20.438rem",
                }}
              />
            </Grid>
          ))}
          {isNextPageAvailable && (
            <Stack
              direction={{
                base: "column",
                lg: "row",
              }}
              gap={{
                base: 3,
                lg: 0,
              }}
              sx={{
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                [theme.breakpoints.up("lg")]: {
                  justifyContent: "center",
                },
              }}
            >
              <fetcher.Form method="post">
                <input type="hidden" name="pageOffset" value={pageOffset} />
                <Button
                  variant={"contained"}
                  sx={{
                    flex: "1 1 auto",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  type="submit"
                >
                  {showSpinner && <Loader />}
                  <Stack
                    direction={"row"}
                    spacing={0.5}
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "1 1 auto",
                    }}
                  >
                    <Box>Load More</Box>
                  </Stack>
                </Button>
              </fetcher.Form>
            </Stack>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default MySubscriptions;
