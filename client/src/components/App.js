import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "./MovieDetails";




function App() {


  const api_key = process.env.REACT_APP_API_KEY

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  console.log(movies);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MovieContainer movies={movies} />} />

        <Route exact path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
