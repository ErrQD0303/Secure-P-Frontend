import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MonthlyParkingCard from "../components/MonthlyParkingCard";
import { ISubscriptionCard } from "../types/subscription";
import { useTheme } from "@emotion/react";
import Carousel from "../components/Carousel/Carousel";
import { carouselClasses } from "../components/Carousel/carouselClasses";
import { useLoaderData } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import AddNewIcon from "../components/svg-icons/AddNew";
import useViewPort from "../hooks/useViewPort";

function Home() {
  const theme = useTheme();
  const { viewWidth } = useViewPort();
  const FAKE_CARDS = useLoaderData() as ISubscriptionCard[];
  return (
    <>
      <img
        src={`/src/assets/${
          viewWidth < theme.breakpoints.values.lg
            ? "mobile-banner.png"
            : "bannerweb.png"
        }`}
        style={{
          width: "100%",
        }}
        alt="Secure Parking Banner"
        aria-label="Secure Parking Banner"
      ></img>
      <Container
        sx={{
          px: "1.437rem",
          pb: "4.8rem",
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
            to="/subscription"
            ariaLabel="My subscriptions"
            type="link"
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#2A2A5B",
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
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
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
            to="/subscription/add"
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
          dots={true}
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
          {FAKE_CARDS.slice(0, 3).map((value, idx) => (
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
                <MonthlyParkingCard {...value} />
              </Paper>
            </Box>
          ))}
        </Carousel>
      </Container>
    </>
  );
}

export default Home;
