import React from 'react';
import {Row, Col, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
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
            });
        });
  }

  handleDelete() {

    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
        .delete( `https://myflix-jonathon.herokuapp.com/users/${user}`,
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
        }}

  render() {
    const { movies, user, onBackClick } = this.props;
    // const favoriteMovieList = movies.filter((movie) => {
    //     return this.state.Favorites.includes(movie._id);
    // });
    return (
      <Container className="profile-wrapper">
        <Row  className="text-white">
          <Col>
            <h2>Username: {`${this.props.user}`}</h2>
            <p>Email: {`${this.state.Email}`}</p>
            <p>Birthday: {`${this.state.Birthday}`}</p>
            <p>Favorites List: {`${this.state.Favorites}`}</p>
          </Col>
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
  })
};

//////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Button, Row, Col, Form, FormControl, Card } from 'react-bootstrap';
// import { MovieCard } from '../movie-card/movie-card';

// import axios from 'axios';
// import { Link } from "react-router-dom";

// import '../../index.scss';
// import './profile-view.scss';

// export class ProfileView extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//             Username: null,
//             Password: null,
//             Email: null,
//             Birthday: null,
//             Favorites: [],
//             movies: []
//         };
//     }

//     componentDidMount() {
//         let accessToken = localStorage.getItem("token");
//         this.getUser(accessToken);
//     }

//     getUser(token) {
//         let url = 'https://myflix-jonathon.herokuapp.com/users/' +
//             localStorage.getItem('user');
//         axios
//             .get(url, {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then((response) => {
//                 this.setState({
//                     Username: response.data.Username,
//                     Password: response.data.Password,
//                     Email: response.data.Email,
//                     Birthday: response.data.BirthDate,
//                     Favorites: response.data.Favorites
//                 });
//             });
//     }

//     handleDelete() {
//         const token = localStorage.getItem("token");
//         const user = localStorage.getItem("user");
//         axios
//             .delete( `https://myflix-jonathon.herokuapp.com/users/${user}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//             )
//             .then(() => {
//                 alert(user + " has been deleted.");
//                 localStorage.removeItem("user");
//                 localStorage.removeItem("token");
//                 window.location.pathname = "/";
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     handleUpdate(e) {
//         let token = localStorage.getItem("token");
//         let user = localStorage.getItem("user");
//         console.log(this.state);
//         let setisValid = this.formValidation();
//         if (setisValid) {
//             console.log(this.props.setProfile(this.state));
//             axios
//                 .put( `https://myflix-jonathon.herokuapp.com/users/${user}`,
//                 { 
//                     Username: this.state.Username,
//                     Password: this.state.Password,
//                     Email: this.state.Email,
//                     BirthDate: this.state.BirthDate
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } } 
//                 )
//                 .then((response) => {
//                     const data = response.data;
//                     localStorage.setItem("user", data.Username);
//                     console.log(data);
//                     alert(user + " has been updated.");
//                     console.log(response);
//                 })
//                 .catch(function (error) {
//                     console.log(error.response.data);
//                 });
//         }
//     }

//     removeFavorite(movie) {
//         let token = localStorage.getItem('token');
//         let url = 'https://myflix-jonathon.herokuapp.com/users/' + localStorage.getItem('user')
//             + '/favorites/' + movie._id;
//         axios
//             .delete(url, {
//                 headers: { Authorization: `Bearer ${token}`},
//             })
//             .then((response) => {
//                 alert("Movie was removed");
//                 this.componentDidMount();
//             });
//     }

//     formValidation() {
//         let UsernameError = {};
//         let EmailError = {};
//         let PasswordError = {};
//         let BirthdayError = {};
//         let isValid = true;

//         if (this.state.Username.trim().length < 5) {
//             UsernameError.usernameShort = "Must be alphanumeric and contain more than 5 characters";
//             isValid = false;
//         }
//         if (this.state.Password.trim().length < 3) {
//             PasswordError.passwordMissing = "You must enter a current password, or new password must be longer than 3 characters.";
//             isValid = false;
//         }
//         if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
//             EmailError.emailNotEmail = "Must enter a valid email address.";
//             isValid = false;
//         }
//         if (this.state.birthDate === '') {
//             BirthDateError.birthDateEmpty = "Please enter your birthday.";
//             isValid = false;
//         }
//         this.setState({
//             UsernameError: UsernameError,
//             PasswordError: PasswordError,
//             EmailError: EmailError,
//             BirthDateError: BirthdayError,
//         })
//         return isValid;
//     };

//     handleChange(e) {
//         let { name, value } = e.target;
//         this.setState({
//             [name]: value
//         })
//     }

//     render() {
//         const { movies, user, onBackClick, PasswordError, UsernameError, EmailError, BirthdayError } = this.props;
//         const favoriteMovieList = movies.filter((movie) => {
//             return this.state.Favorites.includes(movie._id);
//         });

//         return (
//             <div className="userProfile" style={{ display: "flex" }}>
//                     <Row className="justify-content-md-center">
//                         <Col md={12}>
//                             <Form className="justify-content-md-center mb-30">
//                                 <h1 style={{ textAlign: "center" }}>{`${user}`}  Profile Details</h1>

//                                 <Form.Group controlId="formUsername">
//                                     <h3>Username:</h3>
//                                     <Form.Label>{this.state.Username}</Form.Label>

//                                 </Form.Group>
//                                 <Form.Group controlId="formBasicEmail">
//                                     <h3>Email:</h3>
//                                     <Form.Label>{this.state.Email}</Form.Label>
//                                 </Form.Group>

//                                 <Form.Group controlId="formBasicDate">
//                                     <h4>Birthday:</h4>
//                                     <Form.Label>{this.state.Birthday}</Form.Label>
//                                 </Form.Group>

//                                 <Link to={`/users/${this.state.Username}`}>
//                                     <Button className="mb-2" variant="dark"
//                                         type="link"
//                                         size="md"
//                                         block
//                                         onClick={(e) => this.handleUpdate(e)} >
//                                             Update Information
//                                     </Button>
//                                 </Link>

//                                 <Button className="mb-2" variant="danger"
//                                     size="md"
//                                     onClick={() => this.handleDelete()} >
//                                         Delete Account
//                                     </Button>
//                                 <Button variant="dark" onClick={() => { onBackClick() }}>Back</Button>
//                             </Form>
//                         </Col>

//                         <Col>
//                             <h5>Favorite Movies: </h5>
//                             {favoriteMovieList.map((movie) => {

//                                 if (favoriteMovieList.length === 0) {
//                                     <p>You have no favorites yet.</p>
//                                 }

//                                 return (
//                                     <div>
//                                         <Card>
//                                             <Card.Img variant="top" src={movie.ImageUrl} />
//                                             <Card.Body>
//                                                 <Link to={`/movies/${movie._id}`}>
//                                                     <Card.Title>{movie.Title}</Card.Title>
//                                                 </Link>
//                                             </Card.Body>
//                                         </Card>
//                                         <div>
//                                             <Button variant="dark" onClick={() => this.removeFavorite(movie)}>
//                                                 Remove
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
                            
//                         </Col>

//                     </Row>
                
//             </div>
//         )
//     }
// }

// ProfileView.propTypes = {
//     movies: PropTypes.array.isRequired
// };