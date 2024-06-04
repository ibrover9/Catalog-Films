import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TextField, Autocomplete, Slider, Pagination } from "@mui/material";
import BoxFilters from "./BoxFilters";
import BoxHeaderFilters from "./BoxHeaderFilters";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { API } from "../constants/constants";
import { filtersReduce } from "../store/filterReducer";

export default function Filters() {
  const dispatch = useDispatch();
  const initialSlider = useSelector((state) => state.filters.releaseYear);
  const sortBy = useSelector((state) => state.filters.sortBy);
  const genres = useSelector((state) => state.filters.genres);
  const numberPage = useSelector((state) => state.filters.numberPage);
  const searchByName = useSelector((state) => state.filters.searchByName);
  const { CHANGE_SORT_BY } = filtersReduce.actions;
  const { CHANGE_RELEASE_YEAR } = filtersReduce.actions;
  const { CHANGE_GENRES } = filtersReduce.actions;
  const { CHANGE_PAGE } = filtersReduce.actions;
  const { CHANGE_SEARCH_BY_NAME } = filtersReduce.actions;

  const [allGenres, setAllGenres] = useState([]);

  async function dataCheckBox() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: Cookies.get("tokenFilms"),
      },
    };
    const response = await fetch(API.CATALOG_FILMS.FILTER.GENRES, options);
    const answerJson = await response.json();
    const checkboxElements = answerJson.genres.map((element) => {
      return {
        key: element.id,
        label: element.name,
      };
    });
    setAllGenres(checkboxElements);
  }

  function handleSortBy(newValue) {
    dispatch(CHANGE_SORT_BY(newValue));
  }

  function handleGenres(selectedOption) {
    dispatch(CHANGE_GENRES(selectedOption));
  }

  function handlePage(page) {
    dispatch(CHANGE_PAGE(page));
  }

  const handleSearchByName = useCallback(
    (event) => {
      dispatch(CHANGE_SEARCH_BY_NAME(event.target.value));
    },
    [dispatch]
  );

  function valuetext(value) {
    return `${value}`;
  }

  const Options = ["Популярности", "Рэйтингу"];

  useEffect(() => {
    dataCheckBox();
  }, []);

  const minDistance = 100;
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      dispatch(
        CHANGE_RELEASE_YEAR([
          Math.min(newValue[0], initialSlider[1] - minDistance),
          initialSlider[1],
        ])
      );
    } else {
      dispatch(
        CHANGE_RELEASE_YEAR([
          initialSlider[0],
          Math.max(newValue[1], initialSlider[0] + minDistance),
        ])
      );
    }
  };

  return (
    <BoxFilters>
      <BoxHeaderFilters />
      <TextField
        id="standard-basic"
        value={searchByName}
        label="Поиск"
        variant="standard"
        sx={{ width: 250, margin: "20px 20px 40px 20px" }}
        onChange={(event) => {
          handleSearchByName(event);
        }}
      />
      <Autocomplete
        value={sortBy}
        disablePortal
        id="combo-box-demo"
        options={Options}
        sx={{ width: 250, margin: "20px 20px 40px 20px" }}
        renderInput={(params) => (
          <TextField {...params} label="Сортировать по" variant="standard" />
        )}
        onChange={(event, newValue) => {
          handleSortBy(newValue);
        }}
      />

      {/* <Slider
        getAriaLabel={() => "Minimum distance"}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={1700}
        max={2100}
        value={initialSlider}
        sx={{ width: 250, margin: "20px" }}
      /> */}

      {/* <Autocomplete
        multiple
        options={allGenres}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} label="Жанры" variant="standard" />
        )}
        sx={{
          width: 250,
          margin: "20px",
        }}
        ListboxProps={{
          style: {
            maxHeight: "100px",
            overflowY: "auto",
          },
        }}
        value={genres}
        onChange={(event, selectedOption) => {
          handleGenres(selectedOption);
        }}
      /> */}

      <Pagination
        value={numberPage}
        count={100}
        color="primary"
        size="small"
        sx={{ paddingLeft: 1, paddingTop: 8 }}
        onChange={(event, newValue) => handlePage(newValue)}
      />
    </BoxFilters>
  );
}
