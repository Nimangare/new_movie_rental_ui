import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "./TableHeader";
const MovieTable = ({
  movies,
  onHandleToggle,
  onHandleDelete,
  onHandleSort,
  sortColumn,
}) => {
  const dispatch = useDispatch();
  const columns = [
    { path: "title", header: "Title" },
    { path: "genre.name", header: "Genre" },
    { path: "numberInStock", header: "Stock" },
    { path: "dailyRentalRate", header: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];
  return (
    <table className="table table-bordered">
      <TableHeader
        columns={columns}
        onSort={onHandleSort}
        sortColumn={sortColumn}
      />
      <tbody className="text-center">
        {movies.map((movie, index) => {
          return (
            <tr key={index}>
              <td>
                <Link
                  to={{
                    pathname: `/movies/${movie._id}`,
                  }}
                >
                  <button className="btn">{movie.title}</button>
                </Link>
              </td>
              <td>{movie.genre?.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                {movie.liked ? (
                  <FontAwesomeIcon
                    className="badge rounded-pill text-bg-success"
                    icon={faHeart}
                    onClick={() => onHandleToggle(movie._id)}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="badge rounded-pill text-bg-warning"
                    icon={faHeart}
                    onClick={() => onHandleToggle(movie._id)}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onHandleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
