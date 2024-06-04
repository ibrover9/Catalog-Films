/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function BoxFilters({ children }) {
  return (
    <>
      <Box
        width="300px"
        height="650px"
        margin="10px"
        border="1px solid gray"
        borderRadius="10px"
      >
        {children}
      </Box>
    </>
  );
}
