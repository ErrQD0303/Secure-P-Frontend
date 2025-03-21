// ../types/theme.d.ts
import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    status: {
      danger: string;
    };
  }
}

declare module "@mui/material/styles" {
  /* interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Theme {
    status: {
      danger: string;
    };
  } */

  interface PaletteOptions {
    mode?: "light" | "dark";
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
    tertiary: SimplePaletteColorOptions;
    light: SimplePaletteColorOptions;
    dark: SimplePaletteColorOptions;
    grey: SimplePaletteColorOptions;
    success: SimplePaletteColorOptions;
    warning: SimplePaletteColorOptions;
    info: SimplePaletteColorOptions;
    error: SimplePaletteColorOptions;
    lightBlue: SimplePaletteColorOptions;
  }

  interface Palette {
    mode?: "light" | "dark";
    blue: SimplePaletteColorOptions;
    purple: SimplePaletteColorOptions;
    yellow: SimplePaletteColorOptions;
    grey: SimplePaletteColorOptions;
    light: SimplePaletteColorOptions;
    dark: SimplePaletteColorOptions;
    success: SimplePaletteColorOptions;
    warning: SimplePaletteColorOptions;
    info: SimplePaletteColorOptions;
    error: SimplePaletteColorOptions;
    lightBlue: SimplePaletteColorOptions;
  }

  interface SimplePaletteColorOptions {
    main: string;
    dark?: string;
    light?: string;
    color?: string;
    bgcolor?: string;
    borderColor?: string;
  }

  interface SimplePaletteColor {
    main: string;
    dark?: string;
    light?: string;
    color?: string;
    bgcolor?: string;
    borderColor?: string;
  }

  interface BreakpointOverrides {
    base: true;
    /* xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true; */
  }
}
