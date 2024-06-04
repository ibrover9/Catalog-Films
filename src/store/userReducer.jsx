import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tokenCatalogFilms: Cookies.get("tokenFilms"),
  accountId: false,
  favoriteCards: null,
};

export const userReduce = createSlice({
  name: "user",
  initialState,
  reducers: {
    CHANGE_TOKEN_CATALOG_FILMS(state, action) {
      const newToken = action.payload;
      newToken === null
        ? Cookies.remove("tokenFilms")
        : Cookies.set("tokenFilms", newToken);
      state.tokenCatalogFilms = Cookies.get("tokenFilms");
    },
    CHANGE_ACCOUNT_ID(state, action) {
      console.log(action.payload);
      const accountId = action.payload;
      console.log(accountId);
      state.accountId = accountId;
    },
    GET_FAVORITE_CARDS(state, action) {
      return { ...state, favoriteCards: action.payload };
    },
  },
});

// default: {
//   // throw Error("Unknown action: " + action.type);
//   return state;
// }

export default userReduce.reducer;
