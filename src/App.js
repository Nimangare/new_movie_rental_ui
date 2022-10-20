import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { getAllMovies } from "./actions/movieAction";
import { getAllRentals } from "./actions/rentalAction";
import { getAllCustomers } from "./actions/customerAction";
import { loadLogin } from "./actions/logInAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
