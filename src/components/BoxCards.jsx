import { useEffect, useState } from "react";
import BoxCardFilm from "./BoxCardFilm";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { API } from "../constants/constants";
import { useDispatch } from "react-redux";
import { getFavoriteCards } from "../asyncActions/getFavoriteCards";

export default function BoxCards() {
  const [listCards, setListCards] = useState([0]);
  const [listCardsBySearch, setListCardsBySearch] = useState(false);
  const dateFilterSortBy = useSelector((state) => state.filters.sortBy);
  const numberPage = useSelector((state) => state.filters.change);
  const idUser = useSelector((state) => state.user.accountId);
  const searchByName = useSelector((state) => state.filters.searchByName);
  const favoriteCards = useSelector((state) => state.user.favoriteCards);
  const dispatch = useDispatch();

  async function getListCards(dateFilterSortBy, numberPage) {
    const topRated = `${API.CATALOG_FILMS.FILTER.TOP_RATED}${numberPage}`;
    const popular = `${API.CATALOG_FILMS.FILTER.POPULAR}${numberPage}`;
    const urlSortBy = dateFilterSortBy === "Популярности" ? popular : topRated;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: Cookies.get("tokenFilms"),
      },
    };

    const listCardsTopRated = await fetch(urlSortBy, options);
    const listCardsTopRatedJson = await listCardsTopRated.json();
    setListCards(listCardsTopRatedJson);
  }

  async function getCardBySearch(searchByName) {
    const apiListCardBySearch = `${API.CATALOG_FILMS.SEARCH_BY_NAME}/movie?query=${searchByName}&include_adult=false&language=en`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: Cookies.get("tokenFilms"),
      },
    };
    const listCardBySearch = await fetch(apiListCardBySearch, options);
    const listCardBySearchJson = await listCardBySearch.json();
    setListCardsBySearch(listCardBySearchJson);
  }

  useEffect(() => {
    dispatch(getFavoriteCards(idUser));
    getFavoriteCards(idUser);
    getListCards(dateFilterSortBy, numberPage);
    getCardBySearch(searchByName);
  }, [dateFilterSortBy, numberPage, idUser, searchByName]);

  const resultListCards = listCards["results"];
  return (
    <>
      {resultListCards && favoriteCards && !searchByName && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gridTemplateRows="repeat(4,1fr)"
        >
          {favoriteCards["results"].map((element) => (
            <BoxCardFilm
              key={element.id}
              id={element.id}
              imageCard={element.backdrop_path}
              nameFilm={element.title}
              rating={element.vote_average}
              favorite={true}
            />
          ))}
          {(() => {
            const newVariable = listCards["results"].filter(
              (card) =>
                !favoriteCards["results"].some(
                  (favoriteCard) => favoriteCard.id === card.id
                )
            );
            return (
              <>
                {newVariable.map((element) => (
                  <BoxCardFilm
                    key={element.id}
                    id={element.id}
                    imageCard={element.backdrop_path}
                    nameFilm={element.title}
                    rating={element.vote_average}
                    favorite={false}
                  />
                ))}
              </>
            );
          })()}
        </Box>
      )}
      {searchByName && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gridTemplateRows="repeat(4,1fr)"
        >
          {listCardsBySearch["results"].map((element) => (
            <BoxCardFilm
              key={element.id}
              id={element.id}
              imageCard={element.backdrop_path}
              nameFilm={element.title}
              rating={element.vote_average}
              favorite={false}
            />
          ))}
        </Box>
      )}
    </>
  );
}
