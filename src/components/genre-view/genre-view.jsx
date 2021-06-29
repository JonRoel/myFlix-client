import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./genre-view.scss"

export class GenreView extends React.Component {
  
  render() {
    const { genre, onBackClick, movies } = this.props;
    const genreMovies = movies.filter(m => m.genre.name === genre.name);
    return (
      <Container className="genre-wrapper m-4">
        <Row  className="text-white">
          <h2>Genre: {genre.name}</h2>
        </Row>
        <Row className="text-white">
         <p className="genre-description">Description: {genre.description}</p>
        </Row>
        <Row>
          <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
        </Row>
        <Row className="text-white mt-5">
          <h2>Related Movies</h2>
        </Row>
        <Row className="text-white">
          {genreMovies.map((m, i) => <Link to={`/movies/${m.Title}`} className="genre-movies" key={i}>{m.Title}</Link>)}
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
  }).isRequired
};