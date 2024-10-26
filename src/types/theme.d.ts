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
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Theme {
    status: {
      danger: string;
    };
  }

  interface PaletteOptions {
    /* neutral: {
      main: string;
    }; */
    neutral?: SimplePaletteColorOptions;
  }

  interface Palette {
    /* neutral: {
      main: string;
    }; */
    neutral?: SimplePaletteColorOptions;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface SimplePaletteColor {
    darker?: string;
  }
}
