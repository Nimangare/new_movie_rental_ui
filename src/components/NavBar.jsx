import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand btn btn-link" to="/">
            Movie Rental
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/genres">
                  Genre
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  " to="/customers">
                  Customer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  " to="/movies">
                  Movie
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link   " to="/rentals">
                  Rental
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link   " to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  " to="/registers">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
