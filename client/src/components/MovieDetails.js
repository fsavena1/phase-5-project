import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function MovieDetails({ user, addReview }) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [newReview, setNewReview] = useState(false);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0)
  const [reviewError, setReviewError] = useState("");

  const { id } = useParams();

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    )
      .then((r) => r.json())
      .then((data) => setMovieDetails(data));
  }, [id]);

  const image = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  function handlePost() {
    fetch("/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: movieDetails.original_title,
        description: movieDetails.overview,
        image: movieDetails.poster_path,
        rating: movieDetails.vote_average,
        user_id: user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  console.log(movieDetails.id)

  function handleNewReview(e) {
    e.preventDefault()
    fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: body,
        user_id: user.id,
        rating: rating,
        movie_id: movieDetails.id
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          addReview(data);
          setNewReview(false);
        });
      } else {
        r.json().then((data) => setReviewError(data.error));
      }
    });
  }

  function handleReviewToggle() {
    setNewReview(!newReview);
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
          <Button onClick={handlePost}>Add to Favorites!</Button>
        </Card>
      </div>

      <div>
        {newReview ? (
          <Form
            className="text-center"
            style={{ width: "60%", margin: "20px auto 0 auto" }}
            onSubmit={handleNewReview}
          >
            <Form.Group className="mb-3" controlId="formBasicReview">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Review"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
                <Form.Control
                type="number "
                placeholder="Enter Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <button>Submit</button>
          </Form>
        ) : null}

        {user ? (
          <Button style={{ marginTop: "10px" }} onClick={handleReviewToggle}>
            Add a Review!
          </Button>
        ) : null}

        {reviewError && (
          <div>
            <h1
              style={{
                margin: "100px auto 0 auto",
                textAlign: "center",
                color: "red",
              }}
            >
              {reviewError}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
