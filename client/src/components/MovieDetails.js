import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

function MovieDetails({user}) {
  const [movieDetails, setMovieDetails] = useState([]);

  const { id } = useParams();

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    )
      .then((r) => r.json())
      .then((data) => setMovieDetails(data));
  }, [id]);

  const image = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;


  function handlePost(){
    fetch("/movies", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: movieDetails.original_title, 
            description: movieDetails.overview, 
            image: movieDetails.poster_path,
            rating: movieDetails.vote_average,
            user_id: user.id
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
  }

  return (
    <div
      className="text-center"
      style={{
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          margin: "80px auto 0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            padding: "20px",
          }}
        >
          <Card.Title className="text-center">
            
            {movieDetails.original_title}
          </Card.Title>
          <Card.Img
            src={image}
            alt={movieDetails?.original_title}
            className="text-center"
          />
          <Card.Text className="text-center">
            {movieDetails?.overview}
          </Card.Text>
          <Card.Text className="text-center">
            Rating:  
             {movieDetails?.vote_average}
          </Card.Text>
          <Button onClick={handlePost}  >Add to Favorites!</Button>
        </Card>
      </div>
    </div>
  );
}

export default MovieDetails;
