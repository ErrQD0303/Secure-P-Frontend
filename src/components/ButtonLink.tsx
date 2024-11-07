import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export type Props = {
  children?: React.ReactNode;
  to: string;
  ariaLabel?: string;
  type: string;
  sx?: SxProps<Theme> | undefined;
  state?: unknown;
};

function ButtonLink({ children, to, ariaLabel, type, sx, state }: Props) {
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
    },
    button: {
      display: "block",
      width: "100%",
      textTransform: "capitalize",
      textDecoration: "none",
    },
    none: {},
  };

  return (
    <Link
      component={RouterLink}
      aria-label={ariaLabel}
      to={to}
      state={state}
      sx={{ ...linkTypes[type], ...sx } as SxProps<Theme>}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
