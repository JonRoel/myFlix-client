import React from 'react';
import {Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import './update-view.scss';

export class UpdateView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
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
                BirthDate: response.data.Birthday,
                Favorties: response.data.Favorites
            });
        });
  }

  handleUpdate(e) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    console.log.apply(Username, Password, Email, Birthday)
      axios.put( `https://myflix-jonathon.herokuapp.com/userupdate/${user}`,
          { 
              //Username: this.state.Username,
              Password: this.state.Password,
              Email: this.state.Email,
              Birthday: this.state.Birthday
          },
          { headers: { Authorization: `Bearer ${token}` } } 
        )
          .then((response) => {
              const data = response.data;
              localStorage.setItem("user", data.Username);
              console.log(data);
              alert(user + " has been updated.");
              console.log(response);
          })
          .catch(function (error) {
              alert(error.response.data);
          });
    
}

  render() {
    return (
      <Container className="profile-wrapper text-light">
        <Row className="ml-1">
          <h4>Update info for: {`${this.props.user}`}</h4>
          <p className="note">Username cannot be updated</p>
        </Row>
        <Form>
        <Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="Email" placeholder={`${this.state.Email}`}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" name="Birthday" placeholder={`${this.state.Birthday}`}></Form.Control>
          </Form.Group>
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="Password" placeholder="New password"></Form.Control>
          </Form.Group>
        </Form>
         <Row>
          <Col className="reg-btns mt-1">
            <Link to={`/users/${this.props.user}`}><Button variant="link">Cancel</Button></Link>
          </Col>
          <Col className="reg-btns mt-1">
            <Button size="md" variant="primary" type="submit" ml="4" onClick={() => this.handleUpdate()} >Submit</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

UpdateView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  })
};
