import Box from "@mui/material/Box";

function Loader() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(108, 122, 137, 0.2)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box className="loader"></Box>
    </Box>
  );
}

export default Loader;
