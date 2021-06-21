import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
  
  render() {
    const { director, onBackClick, movies } = this.props;

    const directorsMovies = movies.filter(m => m.director.name === director.name);
    
    return (
      <Container className="director-container">
        <Row  className="text-white">
         <h1>{director.name}</h1>
         </Row>
         <Row className="text-white">
         <p className="director-description">Born: {director.birthyear}</p>
         <p>Biography: {director.bio} </p>
         </Row>
         <Row>
           <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
         </Row>
         <Row className="text-white mt-5">
           <h2>Related Movies</h2>
         </Row>
         <Row className="text-white">
           {directorsMovies.map((m, i) => <div className="directors-movies" key={i}>{m.Title}</div>)}
         </Row>
      </Container>
    );
  }
}


DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birthyear: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};