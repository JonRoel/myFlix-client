import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export class DirectorView extends React.Component {
  
  render() {
    const { director, onBackClick } = this.props;
    return (
      <>
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
      </>
    );
  }
}