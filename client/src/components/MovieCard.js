import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, description, image, rating }) {
  let navigate = useNavigate();

  const movie_id = id;

  return (
    <Col
      style={{
        marginTop: "10px",
      }}
    >
      <Card
        key={id}
        style={{
          padding: "20px",
          border: "2px solid black",
        }}
      >
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Img
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt={title}
          onClick={() => navigate(`/movie/${movie_id}`)}
        />
        <Card.Text className="text-center text-truncate">
          {description}
        </Card.Text>
      </Card>
    </Col>
  );
}

export default MovieCard;
