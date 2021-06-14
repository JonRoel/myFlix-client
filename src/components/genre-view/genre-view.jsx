import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import "./genre-view.scss"

export class GenreView extends React.Component {
  
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <>
        <Row  className="text-white">
         <h2>Genre: {genre.name}</h2>
         </Row><Row className="text-white">
         <p className="genre-description">Description: {genre.description}</p>
         </Row>
         <Row>
           <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
         </Row>
      </>
    );
  }
}