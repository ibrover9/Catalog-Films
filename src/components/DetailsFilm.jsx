/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import BoxDetail from "./BoxDetail";

export default function DetailsFilm({
  details,
  yearFilm,
  informationCastAndCrew,
}) {
  const genres = details.genres
    .map((element) => {
      return element.name;
    })
    .join(", ");

  const director = informationCastAndCrew?.crew?.filter(
    (element) => element.department === "Directing"
  );
  const time =
    details.runtime > 59
      ? `${Math.floor(details.runtime / 60)} час ${details.runtime % 60} минут`
      : `${details.runtime} минут`;

  return (
    <>
      <Box display="block">
        <Box fontSize="36px" marginLeft="50px">
          Детали
        </Box>
        <Box marginTop="40px" fontSize="16px">
          <BoxDetail
            typeDetail="Страна"
            detail={details.production_companies[0].origin_country}
          />
          <BoxDetail typeDetail="Год" detail={yearFilm} />
          <BoxDetail typeDetail="Жанр" detail={genres} />
          <BoxDetail
            typeDetail="Режисер"
            detail={director?.map((element) => element.name).join(", ")}
          />
          <BoxDetail typeDetail="Время" detail={time} />
          {details.budget && (
            <BoxDetail typeDetail="Бюджет" detail={`${details.budget} $`} />
          )}
        </Box>
      </Box>
    </>
  );
}
