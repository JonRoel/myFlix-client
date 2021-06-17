import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')
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

  getAcc(token) {
    axios.get(`https://filmquarry.herokuapp.com/users/:Username`, {
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
      users: authData.user.Username,
      //token: authData.token
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


  render() {
    const { movies, user, users } = this.state;
  
    return (
      <>
      <Router>
          {/* Start of Main View*/}
          <Row className="main-view justify-md-content-center">

            <Route exact path="/" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
              

              if (movies.length === 0) return (<div className="main-view" />);
              

              if (user) return (
              <>
                <Row className="mb-3 navigation-main"><NavBar user={user} /></Row>
                <Row>
                {movies.map(m => (
                  <Col xs={12} sm={6} md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))}
                </Row>
              </>
            )
          }} />

          {/* Show Movies by genre */}
          <Route exact path="/movielist/genre/:genre" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
              

              if (movies.length === 0) return (<div className="main-view" />);
              

              if (user) return (
              <>
                <Row className="mb-3 navigation-main"><NavBar user={user} /></Row>
                <Row>
                {movies.map(mg => (
                  <Col xs={12} sm={6} md={3} key={mg._id}>
                    <MovieCard movie={mg} movie={movies.find(mg => mg.genre.name === require.params.name)} />
                  </Col>
                ))}
                </Row>
              </>
            )
          }} />

            {/* Start of register View */}
            <Route path="/register" render={() => {
              if (user) return <Redirect to='/' />
              return <Row>
                <Col>
                  <RegistrationView />
                </Col>
              </Row>
            }} />

            {/* Start of Single Movie View */}
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

          {/* 
          
            Path to genre 
          
          */}
    
            <Route exact path="/genres/:name" render={({ match, history }) => {
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
          
          {/* 
            
            Path to single director info

          */}
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
              if (movies.length === 0) return <div className="main-view" />;
                return (
                  <>
                    <Col md={8}>
                      <DirectorView director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
                    </Col>
                  </>
                )
            }
          } />

          {/* Profile View */}
          <Route path="/users/:Username" render={({ match, history }) => {
            {/* if(!user) return <Redirect to="/" /> */}
            if (movies.length === 0) return <div className="main-view" />
            if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
            return (
              <>
                <Row>
                    <Col>
                      <NavBar />
                    </Col>
                  </Row>
                <Row>
                  <Col>
                    <ProfileView user={users.find(p => p.Username === match.params.Username)} onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
              </>
            )
          }
        } />

    
          </Row>
        </Router>
      </>
    );
  }
  };

export default MainView;