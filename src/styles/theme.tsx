import { createTheme, colors } from "@mui/material";
// import { red } from "@mui/material/colors";

// Define your color palette as constants for better organization
const palette = {
  primary: {
    main: colors.blue[500],
  },
  secondary: {
    main: colors.orange[500],
  },
  neutral: {
    main: colors.grey[500],
    darker: colors.grey[700],
  },
};

// Define typography settings as constants
const typography = {
  fontFamily: "'Open Sans', 'Roboto', 'Arial', sans-serif", // Added fallback fonts
  h1: {
    fontSize: "2rem",
    fontWeight: 700,
  },
  h2: {
    fontSize: "1.75rem",
    fontWeight: 700,
  },
  // Add other typography variants as needed
};

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  cssVariables: true,
  palette: {
    ...palette,
  },
  typography: {
    ...typography,
  },
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
          line-height: 1.5;
          font-family: ${typography.fontFamily}; /* Use the fontFamily defined above */
          text-rendering: optimizeLegibility;
        }
      `,
    },
  },
});

export default theme;
