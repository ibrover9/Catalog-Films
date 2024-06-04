import { Box } from "@mui/material";
import Header from "./Header";
import Filters from "./Filters";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { API } from "../constants/constants";
import BoxCards from "./BoxCards";
import { userReduce } from "../store/userReducer";

export default function MainWindow() {
  const dispatch = useDispatch();
  const { CHANGE_ACCOUNT_ID } = userReduce.actions;
  console.log(CHANGE_ACCOUNT_ID(5));
  const idUser = useSelector((state) => state.user.accountId);
  console.log(idUser);

  async function GetAccountId() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: Cookies.get("tokenFilms"),
      },
    };

    const getAccountId = await fetch(API.CATALOG_FILMS.ACCOUNT_ID, options);
    const getAccountIdJson = await getAccountId.json();
    const newAccountId = getAccountIdJson.id;
    console.log(newAccountId);
    dispatch(CHANGE_ACCOUNT_ID(newAccountId));
  }
  useEffect(() => {
    GetAccountId();
  }, []);

  return (
    <>
      {idUser && (
        <>
          <Header nameFilm={"Films"} />
          <Box display="flex">
            <Filters />
            <BoxCards />
          </Box>
        </>
      )}
    </>
  );
}
