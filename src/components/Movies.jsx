import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListGroup from "./common/ListGroup";
import MovieTable from "./MovieTable";
import {
  countMovie,
  deleteMovie,
  getAllMovies,
  getPFS,
  toggleLiked,
} from "../actions/movieAction";
import { getAllgenres } from "../actions/genreAction";
import { useEffect, useState } from "react";
import Pagination from "./common/Pagination";

const Movie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movieReducer.movies);
  const genres = useSelector((state) => state.genreReducer.genres);
  const totalNoOfMovies = useSelector((state) => state.movieReducer.count);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: 1 });
  useEffect(() => {
    dispatch(getAllgenres());
    dispatch(countMovie({ title, genre }));
    dispatch(getPFS({ currentPage, pageSize, title, genre, sortColumn }));
  }, [movies]);

  useEffect(() => {
    dispatch(countMovie({ title, genre }));
  }, [title, genre]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggle = (id) => {
    const movie = movies.find((movie) => movie._id === id);
    dispatch(toggleLiked(id, movie));
  };

  const handlePageChange = (currentPage) => {
    // console.log(currentPage);
    setCurrentPage(currentPage);
    const data = { currentPage, pageSize, title, genre, sortColumn };
    dispatch(getPFS(data));
    dispatch(countMovie({ title, genre }));
  };

  const handleChange = (e) => {
    let title = e.target.value.trim();
    if (title.length === 0) {
      setTitle("");
    }
    setCurrentPage(1);
    setTitle(title);
    dispatch(
      getPFS({
        currentPage: 1,
        pageSize,
        title: e.target.value,
        genre,
        sortColumn,
      })
    );
    dispatch(countMovie({ title, genre }));
  };

  const handleGenreChange = (genre) => {
    setGenre(genre);
    // console.log(genre);
    dispatch(getPFS({ currentPage: 1, pageSize, title, genre, sortColumn }));
    dispatch(countMovie({ title, genre }));
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    // console.log(sortColumn);
    dispatch(getPFS({ currentPage, pageSize, title, genre, sortColumn }));
  };
  return (
    <div className="row mt-4">
      <div className="col-3">
        <Link to="/movies/new">
          <button type="button" className="btn btn-primary m-5">
            Add Movie
          </button>{" "}
        </Link>
        <div className="m-4">
          <div className="mx-4">
            <label htmlFor="">
              <h4>Select Genre</h4>
            </label>
          </div>
          <ListGroup
            genres={genres}
            onItemChange={handleGenreChange}
            item={genre}
            // textProp={"name"}
            // valueProp={"_id"}
          />
        </div>
      </div>
      <div className="col pe-5">
        <div className="">
          <label htmlFor="">
            <h4>Enter Movie for Search</h4>
          </label>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={handleChange}
          />
        </div>
        <MovieTable
          movies={movies}
          onHandleToggle={handleToggle}
          onHandleDelete={handleDelete}
          onHandleSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={totalNoOfMovies}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Movie;
