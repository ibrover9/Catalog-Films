/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function BoxActors({ cast }) {
  return (
    <Box>
      <Box margin="0 15px 15px 50px" textAlign="left" fontSize="40px">
        Actors
      </Box>
      <Box
        margin="15px 15px 15px 50px"
        display="flex"
        justifyContent="left"
        fontSize="16px"
      >
        {cast.map((element, index) => {
          if (index < 15) {
            return `${element.name}, `;
          }
        })}
      </Box>
    </Box>
  );
}
