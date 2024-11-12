import Box, { BoxProps } from "@mui/material/Box";

function Loader({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(108, 122, 137, 0.2)",
        backdropFilter: "blur(5px)",
        ...sx,
      }}
    >
      <Box className="loader"></Box>
    </Box>
  );
}

export default Loader;