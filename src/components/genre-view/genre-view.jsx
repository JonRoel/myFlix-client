import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';

import "./genre-view.scss"

export class GenreView extends React.Component {
  
  render() {
    const { genre, onBackClick, movies } = this.props;
    const genreMovies = movies.filter(m => m.genre.name === genre.name);
    return (
      <Container className="genre-wrapper">
        <Row  className="text-white">
         <h2>Genre: {genre.name}</h2>
         </Row><Row className="text-white">
         <p className="genre-description">Description: {genre.description}</p>
         </Row>
         <Row>
           <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
         </Row>
         <Row className="text-white mt-5">
           <h2>Related Movies</h2>
         </Row>
         <Row className="text-white">
           {genreMovies.map((m, i) => <div className="genre-movies" key={i}>{m.Title}</div>)}
         </Row>
      </Container>
    );
  }
}