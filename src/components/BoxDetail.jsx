/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function BoxDetail({ typeDetail, detail }) {
  return (
    <Box key={typeDetail} display="flex" marginBottom="10px">
      <Box width="200px">{typeDetail}</Box>
      <Box marginLeft="50px" width="200px">
        {detail}
      </Box>
    </Box>
  );
}
