/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userReduce } from "../store/userReducer";

export default function Header({ nameFilm }) {
  const dispatch = useDispatch();
  const { CHANGE_TOKEN_CATALOG_FILMS } = userReduce.actions;
  function handleTokenFilm() {
    dispatch(CHANGE_TOKEN_CATALOG_FILMS(null));
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        borderBottom="1px solid black"
        backgroundColor="#2196F3"
      >
        <Link to="/">
          <Button style={{ color: "white", margin: "10px" }} variant="text">
            {nameFilm}
          </Button>
        </Link>
        <Button
          style={{ color: "white", margin: "10px" }}
          variant="text"
          onClick={handleTokenFilm}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
