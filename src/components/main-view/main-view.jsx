import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import Button from 'react-bootstrap/Button';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  // src/components/main-view/main-view.jsx
  componentDidMount() {
    this._isMounted = true;
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
     this.setState({
       user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // src/components/main-view/mainview.jsx
  getMovies(token) {
    axios.get('https://myflix-jonathon.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAcc(token, user) {
    axios.get(`https://filmquarry.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('Success with getAcc');
      this.setState({
        users: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /*When a user logs in, this function updates the user property in state to that particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /* When a movie is clicked, this function is involed and updates the state of the selectedMovie property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  // Log out function
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user, directors } = this.state;
  
    return (
      <>
      <Router>
        <Row className="top-wrapper mt-4 mb-4 pl-4 pr-4"><Button variant="primary" className="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button></Row>
          <Row className="main-view justify-md-content-center">
            <Route exact path="/" render={() => {
              if (!user) return (
              <Row>
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              </Row>);

              if (movies.length === 0) return (
                <div className="main-view" />);
              
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to='/' />
              return <Row>
                <Col>
                  <RegistrationView />
                </Col>
              </Row>
            }} />
    
          <Route path="/movies/:Title" render={({ match, history }) => {
            if (!user) return <Row>
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              </Row>
            return <Col md={8}>
              <MovieView movie={movies.find(m => m.Title === match.params.Title)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
    
          <Route exact path="/genres/:name" render={({ match }) => {
            if (!user) return <Row>
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              </Row>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.genre.name === match .params.name).genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          
          <Route path="/directors/:name" render={({ match }) => {
            if (!user) return <Row>
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              </Row>
            if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.director.name === match.params.name).director} />
              </Col>
            }
          } />
    
          </Row>
        </Router>
      </>
    );
  }
  };

export default MainView;
