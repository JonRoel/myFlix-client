export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }
getUsers(token) {
        axios.get('http://filmopedia.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                users: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
(…)
render() {
        const { movies, user, users } = this.state;
        return (
            <Router>
                <Row className="main-view justify-content-md-center" key="main-view">
(…)
<Route path="/users/:username" render={({match, history}) => {
                        if (movies.length === 0) return <div className="main-view" />
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <ProfileView profiles={users.find(p => p.username === match.params.username)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
—————
-profile-view.jsx
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile-view.scss';
export class ProfileView extends React.Component {
(…)
render () {
        const { profiles, onBackClick } = this.props;
        return (
            < >
            <Row className="justify-content-center">
                <Col sm={12} md={10} lg={8} xl={6}>
                    <div>
                        <ul className="profile-view list-group">
                        <li className="profile-username list-group-item">
                            <span className="value profile-title">{ profiles.username }</span>
                        </li>
                        <li className="profile-email list-group-item">
                            <span className="label">eMail: </span>
                            <span className="value">{ profiles.email }</span>
                        </li>
                        <li className="profile-birthday list-group-item">
                            <span className="label">Birthday: </span>
                            <span className="value">{ profiles.birthday }</span>
                        </li>
                        <li className="profile-favoritemovies list-group-item">
                            <span className="label">Favorite Movies: </span>
                            <span className="value">{ profiles.favoritemovies }</span>
                        </li>
                        <li className="list-group-item">
                            <Button className="button-float-right" variant="outline-danger" onClick={() => onBackClick()}>Back</Button>
                        </li>
                        </ul>
                    </div>
                </Col>
            </Row>