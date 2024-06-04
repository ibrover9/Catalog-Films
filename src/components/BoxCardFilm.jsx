/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { nameRestriction } from "../utils";
import { IMAGE } from "../constants/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { API } from "../constants/constants";
import Cookies from "js-cookie";

export default function BoxCardFilm({
  id,
  imageCard,
  nameFilm,
  rating,
  favorite,
}) {
  const urlImageCard = `${IMAGE.FILM.CARD_COVER}${imageCard}`;
  const nameCard = nameRestriction(nameFilm);
  const [favoriteCard, setFavoriteCard] = useState(favorite);
  async function handleFavorite() {
    try {
      setFavoriteCard(!favoriteCard);
      console.log(!favoriteCard);
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: Cookies.get("tokenFilms"),
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: id,
          favorite: !favoriteCard,
        }),
      };

      await fetch(API.CATALOG_FILMS.FAVORITE.ADD, options);
    } catch (error) {
      alert(error);
      setFavoriteCard(favoriteCard);
    }
  }
  return (
    <>
      <Box
        key={id}
        width="250px"
        height="250px"
        margin="8px"
        border="1px solid gray"
        borderRadius="10px"
      >
        <Link to={`/information/${id}`}>
          <Box
            width="250px"
            height="180px"
            borderRadius="10px"
            sx={{ backgroundImage: `url(${urlImageCard})` }}
          ></Box>
        </Link>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          margin="10px"
        >
          <Link to={`/information/${id}`}>
            <Box>
              <Box fontSize="22px">{nameCard}</Box>
              <Box fontSize="12px" color="gray">
                Рейтинг {rating}
              </Box>
            </Box>
          </Link>

          <Button
            sx={{
              color: "black",
              padding: "1px",
              margin: 0,
              minWidth: "14px",
              minHeight: "14px",
              width: "24px",
              height: "24px",
              "& .MuiButton-label": {
                padding: "10px",
                margin: "10px",
              },
              "& svg": {
                width: "100%",
                height: "100%",
              },
            }}
            onClick={handleFavorite}
          >
            {favoriteCard && <StarIcon sx={{ color: "#2196F3" }} />}
            {!favoriteCard && <StarBorderIcon />}
          </Button>
        </Box>
      </Box>
    </>
  );
}
