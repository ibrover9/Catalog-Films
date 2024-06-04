import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DetailsFilm from "./DetailsFilm";
import BoxActors from "./BoxActors";
import Cookies from "js-cookie";
import { IMAGE, API } from "../constants/constants";
import { useDispatch } from "react-redux";
import { filtersReduce } from "../store/filterReducer";

export default function MovieInformation() {
  const params = useParams();
  const idFilm = params.idFilm;
  const dispatch = useDispatch();
  const { CHANGE_SEARCH_BY_NAME } = filtersReduce.actions;
  const [detailsFilms, setDetailsFilms] = useState("");
  const [informationCastAndCrew, setInformationCastAndCrew] = useState("");

  function handleSearchByName() {
    dispatch(CHANGE_SEARCH_BY_NAME(""));
  }

  async function getMoveInformation(idFilm) {
    const urlDetails = `${API.CATALOG_FILMS.MOVIE_INFORMATION.DETAILS}${idFilm}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: Cookies.get("tokenFilms"),
      },
    };
    const details = await fetch(urlDetails, options);
    const detailsJson = await details.json();
    console.log(detailsFilms);
    setDetailsFilms(detailsJson);
  }

  async function getInformationCast(idFilm) {
    const urlCast = `${API.CATALOG_FILMS.MOVIE_INFORMATION.DETAILS}${idFilm}/credits`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: Cookies.get("tokenFilms"),
      },
    };
    const details = await fetch(urlCast, options);
    const detailsJson = await details.json();
    setInformationCastAndCrew(detailsJson);
  }

  useEffect(() => {
    getMoveInformation(idFilm);
    getInformationCast(idFilm);
    handleSearchByName();
  }, [idFilm]);

  const urlImageCard = `${IMAGE.FILM.POSTER}${detailsFilms?.poster_path}`;
  const apiComplite = detailsFilms && informationCastAndCrew;
  return (
    <>
      {apiComplite && (
        <>
          <Header nameFilm={detailsFilms.title} />
          <Box display="flex">
            <Box>
              <Box
                component="img"
                sx={{
                  margin: 5,
                }}
                alt="The house from the offer."
                src={urlImageCard}
              />
            </Box>
            <Box
              sx={{
                marginTop: 6,
                fontWeight: "500",
                fontSize: 30,
              }}
            >
              {detailsFilms.title}
              {` (${detailsFilms.release_date.slice(0, 4)})   `}
              <StarIcon sx={{ color: "gold" }} />
              <Link to="/">
                <Box marginTop="20px">
                  <Button variant="text">
                    <ArrowBackIcon sx={{ color: "gray" }} />
                  </Button>
                </Box>
              </Link>

              <DetailsFilm
                details={detailsFilms}
                yearFilm={detailsFilms.release_date.slice(0, 4)}
                informationCastAndCrew={informationCastAndCrew}
              />
            </Box>
          </Box>
          <BoxActors cast={informationCastAndCrew.cast} />
        </>
      )}
    </>
  );
}
