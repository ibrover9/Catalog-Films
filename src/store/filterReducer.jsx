import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  sortBy: "Популярности",
  releaseYear: [1900, 2000],
  genres: [],
  change: 1,
  searchByName: "",
};

export const filtersReduce = createSlice({
  name: "filter",
  initialState,
  reducers: {
    CHANGE_SORT_BY(state, action) {
      const newTextSortBy = action.payload;
      state.sortBy = newTextSortBy;
    },
    CHANGE_RELEASE_YEAR(state, action) {
      const newTextReleaseYear = action.payload;
      state.releaseYear = newTextReleaseYear;
    },
    CHANGE_GENRES(state, action) {
      const newTextgenres = action.payload;
      state.genres = newTextgenres;
    },
    CLEAR_FILTER(state) {
      return {
        ...state,
        sortBy: null,
        releaseYear: [1900, 2000],
        genres: [],
        change: 1,
      };
    },
    CHANGE_PAGE(state, action) {
      const numberPage = action.payload;
      state.change = numberPage;
    },
    CHANGE_SEARCH_BY_NAME(state, action) {
      const newSearch = action.payload;
      state.searchByName = newSearch;
    },
  },
});

export default filtersReduce.reducer;
// default: {
//   // throw Error("Unknown action: " + action.type);
//   return state;
// }
