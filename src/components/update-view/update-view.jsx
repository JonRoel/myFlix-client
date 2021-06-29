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
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      PasswordError: "",
      EmailError: "",
      BirthdayError: "",
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    let url = 'https://myflix-jonathon.herokuapp.com/users/' +
        localStorage.getItem('user');
    axios.get(url, {
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

/* Handle form update */
  handleUpdate(e) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let validated = this.formValidation();
    if (validated) {
      axios.put( `https://myflix-jonathon.herokuapp.com/userupdate/${user}`,
        { 
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        { headers: { Authorization: `Bearer ${token}` } } 
      )
        .then((response) => {
            const data = response.data;
            console.log(data);
            alert(user + " has been updated.");
            console.log(response);
            window.open('{`/users/${this.props.user}`}', '_self');
        })
        .catch(function (error) {
            alert(error.response.data);
        });
    }}

/* Form Validation Start */
    
  formValidation() {
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValid = true;
    if (this.state.Password.trim().length < 5 || this.state.Password === '') {
      PasswordError.passwordMissing = "You must enter a password at least 6 characters long.";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "Your email doesn't look quite right.";
      isValid = false;
    }
    if (this.state.Birthday === '' || !this.state.Birthday ) {
      BirthdayError.BirthdayEmpty = "Please enter your date of birth.";
      isValid = false;
    }
    this.setState({
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  };

  setField(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

      

  render() {
    const { user } = this.props;
    const { PasswordError, EmailError, BirthdayError } = this.state;
    return (
      <Container className="profile-wrapper text-light">
        <Row className="ml-1">
          <h4>Update info for: {`${this.props.user}`}</h4>
          <p className="note">Username cannot be updated</p>
        </Row>
        <Form>
          <Form.Group controlId="updateEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="Email" placeholder={`${this.state.Email}`} onChange={(e) => this.setField(e)} required ></Form.Control>
            {Object.keys(EmailError).map((key) => {
              return (
                <div className="updateform-validation-error" key={key}>
                  {EmailError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="updateBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" name="Birthday" onChange={(e) => this.setField(e)} required></Form.Control>
            {Object.keys(BirthdayError).map((key) => {
              return (
                <div className="updateform-validation-error" key={key}>
                  {BirthdayError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="updatePassword">
          <Form.Label>New Password</Form.Label>
            <Form.Control type="password" name="Password" placeholder="" onChange={(e) => this.setField(e)} required ></Form.Control>
            {Object.keys(PasswordError).map((key) => {
              return (
                <div className="updateform-validation-error" key={key}>
                  {PasswordError[key]}
                </div>
              );
            })}
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
    Username: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  })
};
