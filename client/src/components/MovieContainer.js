import MovieCard from "./MovieCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function MovieContainer({ movies }) {
  const movieDiv = movies.results?.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.original_title}
        description={movie.overview}
        image={movie.poster_path}
        rating={movie.vote_average}
      />
    );
  });

  return (
    <div
      style={{
        marginTop: "80px",
        marginBottom: "50px",
        width: "100%",
      }}
    >
      <Container style={{}}>
        <Row xs={4}>{movieDiv}</Row>
      </Container>
    </div>
  );
}

export default MovieContainer;
