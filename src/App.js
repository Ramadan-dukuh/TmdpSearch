import './App.css';
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";
// import logo from './logo.png'; // Tambahkan file logo di folder src

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rate">Rating: {movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log({ popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        {/* Tambahkan logo */}
        {/* <img src={logo} alt="KiMovie Logo" className="app-logo" /> */}
        <h1>Welcome To KiMovie</h1>
        <p>Your ultimate guide to the world of cinema</p>
        <input
          placeholder="Cari film yang kamu suka"
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
      {/* Tambahkan footer */}
      <footer className="App-footer">
        <p>© 2025 KiMovie. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
