import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const notifyAdd = () => toast.info(this.props.movie.Title + " has been added to your favorites!");
    axios.post(`https://myflix-jonathon.herokuapp.com/users/addtofavs/${user}/` +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        notifyAdd();
      })
  }

  handleRemove() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const notifyRemove = () => toast.warning(this.props.movie.Title + " has been removed from your favorites!");
    axios.post(`https://myflix-jonathon.herokuapp.com/users/removefromfavs/${user}/` +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        notifyRemove();
      })
  }

  render() {
    const { movie, onBackClick } = this.props;
    
    if (!movie) return null;
    
    return (
      <>
        <div className="movie-view-wrapper ml-5 mt-3">
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
            <div className="back-btn">
              <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to Movies</Button>
            </div>
            <div className="favorite-buttons">
              <Link to={`/movies/${movie.Title}`}>
                <Button block type="button" variant="success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
              </Link>
              <ToastContainer />
            </div>
            <div className="favorite-buttons">
              <Link to={`/movies/${movie.Title}`}>
                <Button block type="button" variant="danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
              </Link>
            </div>
          </Row>
        </div>
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