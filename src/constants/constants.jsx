export const IMAGE = {
  FILM: {
    CARD_COVER: `https://image.tmdb.org/t/p/w342`,
    POSTER: `https://image.tmdb.org/t/p/w342`,
  },
};

export const API = {
  CATALOG_FILMS: {
    FILTER: {
      TOP_RATED:
        "https://api.themoviedb.org/3/movie/top_rated?language=en&page=",
      POPULAR: "https://api.themoviedb.org/3/movie/popular?language=en&page=",
      GENRES: "https://api.themoviedb.org/3/genre/movie/list?language=ru",
    },
    MOVIE_INFORMATION: {
      DETAILS: "https://api.themoviedb.org/3/movie/",
    },
    FAVORITE: {
      ADD: "https://api.themoviedb.org/3/account/21068829/favorite",
    },
    ACCOUNT: "https://api.themoviedb.org/3/account",
    SEARCH_BY_NAME: "https://api.themoviedb.org/3/search",
    ACCOUNT_ID: "https://api.themoviedb.org/3/account/account_id",
  },
};
