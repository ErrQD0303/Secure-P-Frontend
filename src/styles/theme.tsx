import { createTheme } from "@mui/material";
import { WEB_COLORS } from "../shared/constants/web-color";
import { green, amber, lightBlue, red } from "@mui/material/colors";

// Define your color palette as constants for better organization
const lightThemePalette = {
  primary: {
    main: WEB_COLORS.blue,
  },
  secondary: {
    main: WEB_COLORS.darkBlue,
  },
  tertiary: {
    main: WEB_COLORS.yellow,
    light: WEB_COLORS.lightYellow,
  },
  light: {
    main: WEB_COLORS.white,
  },
  dark: {
    main: WEB_COLORS.purple,
    dark: WEB_COLORS.darkPurple,
    light: WEB_COLORS.lightPurple,
  },
  grey: {
    500: WEB_COLORS.grey,
  },
  success: {
    main: green[500],
  },
  warning: {
    main: amber[500],
  },
  info: {
    main: lightBlue[500],
  },
  error: {
    main: red[500],
  },
};

// Define typography settings as constants
const typography = {
  // sans-serif font: Poppins
  fontFamily:
    "'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif", // Added fallback fonts
  // h1: {
  //   fontSize: "2rem",
  //   fontWeight: 700,
  // },
  // h2: {
  //   fontSize: "1.75rem",
  //   fontWeight: 700,
  // },
  // Add other typography variants as needed
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 577,
    md: 769,
    lg: 1025,
    xl: 1440,
  },
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    ...lightThemePalette,
  },
  typography: {
    ...typography,
  },
  breakpoints: { ...breakpoints },
  spacing: 8, // or any valid SpacingOptions value
  components: {
    MuiCssBaseline: {
      styleOverrides: `
       * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          font-size: 100%; /* Ensure font-size is 100% of the user's default */
        }
        body {
          line-height: 1;
          font-family: ${typography.fontFamily}; /* Use the fontFamily defined above */
          text-rendering: optimizeLegibility;
        }
      `,
    },
  },
});

export default theme;
