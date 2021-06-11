import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';



export class DirectorView extends React.Component {
  
  render() {
    const { director, onBackClick } = this.props;
    return (
      <>
        <Row  className="text-white">
         <h1>{director.name}</h1>
         <p className="movie-description">Born: {director.birthyear}</p>
         <p>Biography: {director.bio} </p>
         <div>
           <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
         </div>
        </Row>
      </>
    );
  }
}

  DirectorView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
  };