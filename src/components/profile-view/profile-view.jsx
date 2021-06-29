import React from 'react';
import PropTypes, { string } from 'prop-types';
import axios from 'axios';

import {Row, Col, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      Favorites: [],
    }
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    let url = 'https://myflix-jonathon.herokuapp.com/users/' +
      localStorage.getItem('user');
    axios
      .get(url, {
          headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favorites: response.data.Favorites,
        });
      });
  }
  /* Remove From Favorites */
  handleRemove(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://myflix-jonathon.herokuapp.com/users/removefromfavs/${user}/` +
      movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been removed from your favorites!");
        window.location.reload(false);
      })
  }

  handleDelete() {

    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        axios.delete( `https://myflix-jonathon.herokuapp.com/users/${user}`,
          { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert(user + " has been deleted.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          });
          } else {
            // Do Nothing
            console.log("That was a close one");
        }
      }

  render() {
    const { movies, user } = this.props;

    const favoritesList = movies.filter(m => {
      return this.state.Favorites.includes(m._id);
    });
    
    return (
      <Container className="profile-wrapper m-4">
        <Row  className="text-white">
          <Col>
            <h2>Username: {`${this.props.user}`}</h2>
            <p>Email: {`${this.state.Email}`}</p>
            <p>Birthday: {`${this.state.Birthday}`}</p>
            <h5 className="mt-5">Your Favorites</h5>
          </Col>
        </Row>
        <Row>
        {favoritesList.map((movie) => {
            return (
              <Col md={4} key={movie._id}>
                <div key={movie._id}>
                  <Card className='mb-4 h-100 text-white bg-transparent'>
                    <Card.Img variant="top" src={movie.ImageUrl} />
                    <Card.Body>
                      <Link to={`/movies/${movie.Title}`}>
                        <Card.Img variant="top" src={movie.imageUrl} />
                        <Card.Title as='h3'>{movie.Title}</Card.Title>
                      </Link>
                        <Button className='mb-4' variant="outline-secondary" size="sm" onClick={() => this.handleRemove(movie)}>Remove from Favorites</Button> 
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
            <Col className="acc-btns mt-1">
              <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.handleDelete()} >Delete Account</Button>
            </Col>
            <Col className="acc-btns mt-1">
              <Link to={`/userupdate/${this.props.user}`}><Button size="md" variant="warning">Edit Account</Button></Link>
            </Col>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Favorites: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,
};
