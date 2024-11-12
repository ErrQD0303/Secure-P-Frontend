import { styled } from "@mui/material/styles";
import Container, { ContainerProps } from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SideBarNavigationButtonGroup from "../components/SideBarNavigationButtonGroup";
import { useTheme } from "@emotion/react";
import ButtonLink from "../components/ButtonLink";
import Button from "@mui/material/Button";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "none",
  backgroundColor: "#fff",
  [theme.breakpoints.up("md")]: {
    display: "block",
    padding: 0,
    paddingTop: "2.188rem",
    height: "calc(100vh - 5.5rem)",
  },
}));

function SideBar(props: ContainerProps) {
  const theme = useTheme();
  return (
    <StyledContainer {...props}>
      <Stack component={"nav"} sx={{ bgcolor: "#fff" }}>
        <SideBarNavigationButtonGroup />
        <Stack
          component={Container}
          direction={"column"}
          sx={{
            flex: "0 1 auto",
            padding: {
              md: "2.5rem",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 0,
              pb: {
                md: "1.5rem",
              },
              "&:before": {
                content: "''",
                position: "absolute",
                background: "linear-gradient(180deg, #EEF4FE, #F9FBFF)",
                top: "50px",
                left: 0,
                height: "calc(100% - 50px)",
                width: "100%",
                zIndex: -1,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <img
                src="../assets/sidebar-image1.png"
                alt="Sidebar Image"
                aria-label="Sidebar Image"
              />
            </Box>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.secondary.main,
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                mt: "0.5rem",
              }}
            >
              <Typography>Season pass</Typography>
              <Typography>Unlimited Entry & Exit</Typography>
            </Stack>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: "1.25rem",
                lineHeight: "1.875rem",
                color: "#FCB034",
              }}
            >
              Only $55
            </Typography>
            <ButtonLink
              to="/"
              type={"button"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: "1.25rem",
                px: "1.25rem",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  gap: "0.375rem",
                  p: "0.875rem",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  Buy Now
                </Typography>
              </Button>
            </ButtonLink>
          </Box>
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export default SideBar;
