import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MonthlyParkingCard from "../components/MonthlyParkingCard";
import { useTheme } from "@emotion/react";
import Carousel from "../components/Carousel/Carousel";
import { carouselClasses } from "../components/Carousel/carouselClasses";
import ButtonLink from "../components/ButtonLink";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import AddNewIcon from "../components/svg-icons/AddNew";
import Banner from "../components/Banner";
import CasualRevenueCard from "../components/CasualRevenueCard";
import Stack from "@mui/material/Stack";
import PaymentHistoryCard from "../components/PaymentHistoryCard";
import { useSelector } from "react-redux";
import { getAllSubscriptionDetails } from "../store/subscriptionSlice";

function Home() {
  const theme = useTheme();
  const cards = useSelector(getAllSubscriptionDetails);
  const carouselCards = cards.slice(0, Math.min(cards.length - 2, 3));
  const casualRevenueCards = cards.slice(carouselCards.length - cards.length);
  const paymentHistoryCards = cards.filter(({ isPaid }) => isPaid).slice(0, 2);

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
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.up("sm")]: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <ButtonLink
            to="/subscriptions"
            ariaLabel="My subscriptions"
            type="link"
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#3D4B56",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                p: 0,
              }}
            >
              My Subscriptions
            </Typography>
            <Typography
              sx={{
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#5E6A78",
                [theme.breakpoints.up("sm")]: {},
              }}
            >
              See all
              <NavigateNextIcon
                sx={{
                  ml: "-0.3125px",
                }}
              />
            </Typography>
          </ButtonLink>

          <ButtonLink
            to="/subscriptions/add"
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
            >
              <AddNewIcon />
              <Box component={"span"} sx={{}}>
                Add new Subscription
              </Box>
            </Button>
          </ButtonLink>
        </Box>

        {/* {viewWidth >= theme.breakpoints.values.md && (
          <img
            src={`/src/assets/bannerweb.png`}
            style={{
              width: "100%",
            }}
            alt="Secure Parking Banner"
            aria-label="Secure Parking Banner"
          ></img>
        )} */}

        <Carousel
          renderDot={({ index: current, selected }) => (
            <IconButton
              aria-label={current + ""}
              sx={{
                p: "0.25rem",
                bgcolor: selected ? "#56CCF2" : "#AFBDD4",
                mx: "0.3125rem",
                "&:hover": {
                  bgcolor: "#56CCF2",
                },
                [theme.breakpoints.up("sm")]: {
                  p: "0.35rem",
                },
              }}
            ></IconButton>
          )}
          dots={carouselCards.length > 1}
          showSlides={1}
          speed={2000 * 1}
          spacing={0}
          autoPlay={true}
          transitionDelayTime={5000 * 1}
          infinity={true} // prev slide animation is broken (fixed in future)
          // value={slide}
          // onChange={(rawSlide, slide) => console.log("slide", slide)}
          pauseOnHover
          centerMode
          disableTransition={false}
          sx={{
            [`& .${carouselClasses.list}`]: {},
            [`& .${carouselClasses.item} > *`]: {
              zIndex: 0,
              transition: "all 1s",
              transform: "scale(0.95)",
              [theme.breakpoints.up("sm")]: {
                transform: "scale(1)",
              },
            },
            [`& .${carouselClasses.current} > *`]: {
              zIndex: 1,
            },
            [`& .${carouselClasses.item}`]: {
              zIndex: 0,
              position: "relative",
            },
            [`& .${carouselClasses.current}`]: {
              zIndex: 1,
            },
          }}
        >
          {carouselCards.map((value, idx) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper
                key={`item-${idx}`}
                elevation={4}
                sx={{
                  minWidth: "21.6875rem",
                  maxWidth: "21.6875rem",
                }}
              >
                <MonthlyParkingCard subscriptionDetail={value} />
              </Paper>
            </Box>
          ))}
        </Carousel>

        <Box
          sx={{
            my: "1.438rem",
          }}
        >
          <Stack
            direction={"column"}
            aria-label="Casual Revenue Cards Container"
            spacing={"1.438rem"}
          >
            {casualRevenueCards.map((value) => (
              <CasualRevenueCard key={value.id} {...value} />
            ))}
          </Stack>
          <ButtonLink
            to="/subscriptions/add"
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
            >
              <AddNewIcon />
              <Box component={"span"} sx={{ textTransform: "none" }}>
                Add more subscription
              </Box>
            </Button>
          </ButtonLink>
        </Box>

        <Box>
          <Stack spacing={2}>
            <Box
              sx={{
                [theme.breakpoints.up("sm")]: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              }}
            >
              <ButtonLink
                to="/payment-history"
                ariaLabel="Payment History"
                type="link"
              >
                <Typography
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
                </Typography>
                <Typography
                  sx={{
                    p: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#5E6A78",
                    [theme.breakpoints.up("sm")]: {},
                  }}
                >
                  See all
                  <NavigateNextIcon
                    sx={{
                      ml: "-0.3125px",
                    }}
                  />
                </Typography>
              </ButtonLink>
            </Box>
            {paymentHistoryCards.map((value) => (
              <PaymentHistoryCard {...value} />
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Home;
