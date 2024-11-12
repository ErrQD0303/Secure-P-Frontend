import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

type Props = BoxProps & {
  children?: React.ReactNode;
  index: number;
  value: number;
  pageName: string;
};

function CustomTabPanel({
  children,
  value,
  index,
  pageName,
  ...boxProps
}: Props) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`${pageName}-tabpanel-${index}`}
      aria-labelledby={`${pageName}-tab-${index}`}
      {...boxProps}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </Box>
  );
}

export default CustomTabPanel;
