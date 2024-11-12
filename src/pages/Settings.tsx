import Container, { ContainerProps } from "@mui/material/Container";
import SmallTickerIcon from "../components/svg-icons/SmallTicker";
import ManIcon from "../components/svg-icons/Man";
import SmallSpeakerIcon from "../components/svg-icons/SmallSpeaker";
import InformationIcon from "../components/svg-icons/Information";
import ExitIcon from "../components/svg-icons/Exit";
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ButtonLink from "../components/ButtonLink";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

type Props = ContainerProps;

function Settings(props: Props) {
  const links: Array<{
    name: string;
    icon: JSX.Element;
    to: string;
    endAdornment?: JSX.Element;
    sx?: object;
  }> = React.useMemo(
    () => [
      {
        name: "My Account",
        icon: <ManIcon />,
        to: "/profiles",
        sx: {
          m: 0,
        },
        endAdornment: (
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#F0F3F6",
              color: "#AFBDD4",
            }}
          >
            <ManIcon
              viewBox="0 0 14 14"
              style={{
                width: "22px",
                height: "22px",
              }}
            />
          </Box>
        ),
      },
      {
        name: "My Subscriptions",
        icon: <SmallTickerIcon />,
        to: "/subscriptions",
        sx: {
          mt: "1.75rem",
          mb: 0,
        },
      },
      {
        name: "Promotions",
        icon: <SmallSpeakerIcon />,
        to: "/promotions",
        sx: {
          m: 0,
        },
      },
      {
        name: "About us",
        icon: <InformationIcon />,
        to: "/about-us",
        sx: {
          m: 0,
        },
      },
      {
        name: "Log out",
        icon: <ExitIcon />,
        to: "/login",
        sx: {
          mt: "1.75rem",
          mb: 0,
        },
      },
    ],
    []
  );
  return (
    <>
      <Container
        {...props}
        sx={{
          px: { base: "0", md: "1.437rem" },
          pb: {
            base: "6.8rem",
            md: 0,
          },
          mt: "3rem",
        }}
      >
        <List
          component={"nav"}
          aria-label="Setting Navigation Buttons"
          sx={{
            gap: 0,
          }}
        >
          {links.map(({ to, icon, name, endAdornment, sx }, index) => (
            <ButtonLink
              key={index}
              type={"link"}
              to={to}
              sx={{
                bgcolor: "#fff",
                color: "#3D4B56",
                fontSize: "0.875rem",
                lineHeight: "1.313rem",
                fontWeight: 500,
                px: "1rem",
                "&:hover": {
                  color: "#32336C",
                  fontWeight: 700,
                },
                ...sx,
              }}
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <ListItemText primary={name} />
                  {endAdornment}
                </Stack>
              </ListItemButton>
            </ButtonLink>
          ))}
        </List>
      </Container>
    </>
  );
}

export default Settings;
