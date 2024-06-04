import ButtonWithModalWindow from "./ButtonWithModalWindow";
import Cookies from "js-cookie";

import { useSelector } from "react-redux";
import MainWindow from "./MainWindow";

function App() {
  const tokenCatalogFilms = useSelector(
    (state) => state.user.tokenCatalogFilms
  );

  Cookies.set(
    "tokenFilms",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzU5OWFhYmU3NDFmNmE2OGQ4YmQ4OWI1Zjc2YWM5MiIsInN1YiI6IjY1ZThlYTM1YzUwYWQyMDE3Y2E4OGU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3NImorH4C4cqq3jL-w7Gh9FfHmE9DdN0e_RWAA3zUQ"
  );

  return (
    <>
      {!tokenCatalogFilms && <ButtonWithModalWindow />}
      {tokenCatalogFilms && <MainWindow />}
      {/* <MainWindow /> */}
    </>
  );
}

export default App;
