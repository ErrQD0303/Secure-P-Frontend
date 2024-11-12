import Container, { ContainerProps } from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { ResponsiveStyleValue } from "@mui/system";

type Props = ContainerProps & {
  pageText: string;
  gridColumns?: ResponsiveStyleValue<number> | undefined;
  showWelcomeText?: boolean;
};

function LoginSignUpLayout({
  children,
  pageText,
  gridColumns,
  showWelcomeText = true,
  ...props
}: Props) {
  return (
    <Container
      {...props}
      sx={{
        p: "2.375rem",
        ...props.sx,
      }}
    >
      <Grid container columns={gridColumns}>
        <Grid
          size={gridColumns}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="PageLogo"
        >
          <Box
            component="img"
            src="../assets/LoginLogo.png"
            alt="Secure Parking Logo"
            aria-label="To Homepage"
            sx={{}}
          />
        </Grid>
        {showWelcomeText && (
          <Grid
            size={gridColumns}
            className="Layout-PageText"
            sx={{
              fontWeight: 600,
              fontSize: "1.25rem",
              lineHeight: "1.875rem",
            }}
          >
            Welcome,
          </Grid>
        )}
        <Grid
          size={gridColumns}
          className="Layout-PageText"
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: "1.875rem",
          }}
        >
          {pageText}
        </Grid>
        {children}
      </Grid>
    </Container>
  );
}

export default LoginSignUpLayout;
