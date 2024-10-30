import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useTheme, Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

type Props = {
  children?: React.ReactNode;
  to: string;
  ariaLabel?: string;
  type: string;
  sx?: SxProps<Theme> | undefined;
};

function ButtonLink({ children, to, ariaLabel, type, sx }: Props) {
  const theme = useTheme();
  const linkTypes: { [key: string]: SxProps<Theme> | undefined } = {
    link: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      textTransform: "none",
      textDecoration: "none",
      my: "1.4375rem",
      p: 0,
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    button: {
      display: "block",
      width: "100%",
    },
  };
  console.log(linkTypes[type]);
  return (
    <Link
      component={RouterLink}
      aria-label={ariaLabel}
      to={to}
      sx={{ ...linkTypes[type], ...sx } as SxProps<Theme>}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
