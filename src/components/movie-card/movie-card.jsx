import React from "react";
import './movie-card.scss';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Col md={3} sm={6}>
      <Card className="h-100 text-white bg-transparent">
        <Card.Img variant="top" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title><h3>{movie.Title}</h3></Card.Title>
          <Button onClick={() => onMovieClick(movie)} variant="link">View</Button>
        </Card.Body>
      </Card>
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
