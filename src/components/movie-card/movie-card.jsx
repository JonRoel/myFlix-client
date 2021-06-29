import React from "react";
import PropTypes from "prop-types";

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    
    return (

      <Card className="h-100 text-white bg-transparent">
        <Card.Img variant="top" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title><h3>{movie.Title}</h3></Card.Title>
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="link">View</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
