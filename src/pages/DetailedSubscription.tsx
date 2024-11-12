import { useLoaderData, useOutletContext } from "react-router-dom";
import { ISubscriptionDetail } from "../types/subscription";
import MonthlyParkingCard from "../components/MonthlyParkingCard";
import Container from "@mui/material/Container";
import CachedIcon from "@mui/icons-material/Cached";
import AddNewIcon from "../components/svg-icons/AddNew";
import ButtonLink from "../components/ButtonLink";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import Stack from "@mui/material/Stack";

function DetailedSubscription() {
  const { subscriptionDetail, showBodyRouteName } = useLoaderData() as {
    subscriptionDetail: ISubscriptionDetail;
    showBodyRouteName: boolean;
  };
  const theme = useTheme();

  const { routeName } = useOutletContext() as { routeName: string };

  const bottomButtons = [
    {
      name: "Renew Subscription",
      onClick: () => {},
      icon: <CachedIcon />,
      sx: {
        bgcolor: "#283453",
      } as BoxProps["sx"],
    },
    {
      name: "Add New Subscription",
      to: "/subscriptions/add",
      icon: <AddNewIcon />,
      sx: {} as BoxProps["sx"],
    },
  ];

  return (
    <Container
      sx={{
        px: "1.437rem",
        pb: {
          base: "6.8rem",
          md: 0,
        },
        mt: "1.438rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {showBodyRouteName && (
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
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
        </Stack>
      )}
      <MonthlyParkingCard
        subscriptionDetail={subscriptionDetail}
        sx={{
          minWidth: "20.438rem",
          maxWidth: "20.438rem",
        }}
        fullDetailed
      />
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
          justifyContent: "space-between",
          [theme.breakpoints.up("lg")]: {
            justifyContent: "space-between",
          },
        }}
      >
        {bottomButtons.map(({ name, icon, sx, ...props }) => (
          <ButtonLink
            type={"none"}
            {...props}
            sx={{
              flex: "1 1 auto",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
              minWidth: "20.438rem",
              maxWidth: "20.438rem",
              [theme.breakpoints.up("sm")]: {},
              ...sx,
            }}
          >
            <Button
              variant={"contained"}
              sx={{
                flex: "1 1 auto",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                ...sx,
              }}
            >
              <Stack
                direction={"row"}
                spacing={0.5}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "1 1 auto",
                }}
              >
                {icon}
                <Box>{name}</Box>
              </Stack>
            </Button>
          </ButtonLink>
        ))}
      </Stack>
    </Container>
  );
}

export default DetailedSubscription;
