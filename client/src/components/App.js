import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "./MovieDetails";
import NavBar from "./NavBar";
import SignUpPage from "./SignUpPage";
import Login from "./Login"


function App() {

  const api_key = process.env.REACT_APP_API_KEY
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState('')
  

  useEffect(() => {
    fetch('/auth').then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
          setLoading(false)
        });
      }
    });
  }, []);


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false)
      });
  }, []);

  console.log(movies);

  useEffect(() => {
    fetch("/reviews")
      .then((res) => {
        if (res.ok) {
          res.json().then(data => {
            setReviews(data);
            setLoading(false);
          })
        } else {
          res.json().then(data => setErrors(data.error))
        }
      })
  }, []);

  function addReview(newRev) {
    setReviews([...reviews, newRev])
  }


  function handleLogin(user){
    setUser(user)
  }


  if (loading) return <h1>Loading...</h1>

  return (
    <div className="App">

      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route exact path="/" element={<MovieContainer movies={movies} />} />
        <Route exact path="/signup" element={<SignUpPage setUser={setUser} /> } />
        <Route exact path="/login" element={<Login onLogin={handleLogin} /> } />
        <Route exact path="/movie/:id" element={<MovieDetails user={user} addReview={addReview}/>} />
      </Routes>
    </div>
  );
}

export default App;
