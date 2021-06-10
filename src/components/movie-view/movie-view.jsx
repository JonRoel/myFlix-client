import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
//import moviePoster from 'url:../../../public/images/matrix.png';
import Figure from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/FigureImage'



export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
      <Row>
      <Figure>
        <Figure.Image 
          width={268}
          height={370}
          src={movie.imageUrl}
          />
        </Figure>
        </Row>
        <Row  className="text-white">
        <h1>{movie.Title}</h1>
        <p>{movie.description}</p>
        <Button variant="primary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back to list
        </Button>
      </Row>
      </>
    );
  }
}

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }
}
