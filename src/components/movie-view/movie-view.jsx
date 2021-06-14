import React from "react";
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
        <Row>
          <div>
            <img src={movie.imageUrl} />
          </div>
        </Row>
        <Row>
          <span className="meta-text">Genre: <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link></span>
        </Row>
        <Row>
          <span className="meta-text">Directed by: <Link to={`/directors/${movie.director.name}`}>{movie.director.name}</Link></span>
        </Row>
        <Row  className="text-white">
         <h1>{movie.Title}</h1>
         <p className="movie-description">{movie.description}</p>
         <div>
           <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
         </div>
        </Row>
      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,}),
    director: PropTypes.shape({
      name: PropTypes.string
    })
  })
};