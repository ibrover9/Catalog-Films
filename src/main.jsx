import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import MovieInformation from "./components/MovieInformation.jsx";
// import NotFoundPage from './NotFoundPage.jsx'
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
// import { TasksProvider } from "./components/FiltersReducer.jsx";
import { Provider } from "react-redux";

import { setupStore } from "./store/store.jsx";

const store = setupStore();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/information/:idFilm" element={<MovieInformation />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
