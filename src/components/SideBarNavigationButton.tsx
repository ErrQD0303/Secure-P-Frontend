import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ButtonLink from "../components/ButtonLink";
import { BoxProps, Typography } from "@mui/material";
import { Props as ButtonLinkProps } from "../components/ButtonLink";
import { useLocation } from "react-router-dom";

type Props = Omit<ButtonLinkProps, "type" | "sx"> & {
  type?: "string";
  sx?: BoxProps["sx"];
  icon?: React.ReactNode;
};

function SideBarNavigationButton({ ariaLabel, icon, ...props }: Props) {
  const routeUrl = useLocation().pathname;
  return (
    <ButtonLink
      {...props}
      ariaLabel={ariaLabel}
      type="none"
      sx={{
        flex: "1 1 auto",
        "&:hover": {
          bgcolor: "#EEF2F5",
          " p": {
            color: "#32336c",
            fontWeight: 600,
          },
        },
        [`&.active[href="${routeUrl}"]`]: {
          bgcolor: "#EEF2F5",
          " p": {
            color: "#32336c",
            fontWeight: 600,
          },
        },
      }}
    >
      <Button
        disableTouchRipple
        sx={{
          pl: {
            md: "2.5rem",
            lg: "3rem",
          },
          color: "#A3B0BF",
          flex: "1 1 auto",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1.5}
          sx={{
            alignItems: "center",
            justifyContent: "flex-start",
            flex: "1 1 auto",
          }}
        >
          <Box sx={{ flexBasis: "24px" }}>{icon}</Box>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "0.875rem",
              lineHeight: "1.313rem",
              letterSpacing: "0.00875rem",
            }}
          >
            {ariaLabel}
          </Typography>
        </Stack>
      </Button>
    </ButtonLink>
  );
}

export default SideBarNavigationButton;
