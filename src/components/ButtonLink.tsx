import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Button from "@mui/material/Button";

export type Props = {
  children?: React.ReactNode;
  to?: React.ComponentProps<typeof RouterLink>["to"];
  ariaLabel?: string;
  type: string;
  sx?: SxProps<Theme> | undefined;
  state?: unknown;
  onClick?: (event: React.MouseEvent) => void;
};

function ButtonLink({
  children,
  to,
  ariaLabel,
  type,
  sx,
  state,
  onClick,
}: Props) {
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

  if (!to)
    return (
      <Button sx={sx} onClick={onClick}>
        {children}
      </Button>
    );

  return (
    <Link
      component={RouterLink}
      aria-label={ariaLabel}
      to={to}
      state={state}
      sx={
        {
          ...linkTypes[type],
          ...sx,
        } as SxProps<Theme>
      }
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
