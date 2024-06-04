import Cookies from "js-cookie";
import { API } from "../constants/constants";
import { userReduce } from "../store/userReducer";

export const getFavoriteCards = (idUser) => {
  const apiListIdFavoriteCards = `${API.CATALOG_FILMS.ACCOUNT}/${idUser}/favorite/movies`;
  const { GET_FAVORITE_CARDS } = userReduce.actions;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: Cookies.get("tokenFilms"),
    },
  };
  return async function (dispatch) {
    const listIdFavoriteCards = await fetch(apiListIdFavoriteCards, options);
    const listIdFavoriteCardsJson = await listIdFavoriteCards.json();
    dispatch(GET_FAVORITE_CARDS(listIdFavoriteCardsJson));
  };
};
