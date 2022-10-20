import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Genre from "./components/Genres";
import Customer from "./components/Customers";
import Movie from "./components/Movies";
import Rental from "./components/Rentals";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";

import GenreForm, { genreLoader } from "./components/GenreForm";
import MovieForm, { movieLoader } from "./components/MovieForm";
import CustomerForm, { customerLoader } from "./components/CustomerForm";

import store from "./store/store";
import RentalForm, { rentalLoader } from "./components/RentalForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <div>Hello</div> },
      {
        path: "genres",
        element: <Genre />,
      },
      {
        path: "genres/new",
        element: <GenreForm />,
      },
      {
        path: "genres/:genreId",
        element: <GenreForm />,
        loader: genreLoader,
      },
      {
        path: "customers",
        element: <Customer />,
      },
      {
        path: "customers/new",
        element: <CustomerForm />,
      },
      {
        path: "customers/:customerId",
        element: <CustomerForm />,
        loader: customerLoader,
      },

      {
        path: "movies",
        element: <Movie />,
      },
      ,
      {
        path: "movies/new",
        element: <MovieForm />,
      },
      {
        path: "movies/:movieId",
        element: <MovieForm />,
        loader: movieLoader,
      },
      {
        path: "rentals",
        element: <Rental />,
      },

      {
        path: "rentals/new",
        element: <RentalForm />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registers",
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
