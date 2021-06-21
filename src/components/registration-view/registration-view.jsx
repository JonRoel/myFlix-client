import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import logo from 'url:../../../public/myflix-logo.png';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      axios.post('https://myflix-jonathon.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
    }
  }

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.length < 4) {
        usernameErr.UsernameToShort = "Username must be more than 4 characters.";
        isValid = false;
    }
    if (password.length < 6) {
        passwordErr.noPassword = "You must enter a password at least 6 characters long.";
        isValid = false;
    }
    if (!email || email.indexOf('@') === -1) {
        emailErr.notValidEmail = "Your email doesn't look quite right.";
        isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
};

  return (
    <div className="register-wrapper">
      <img className="myFlix-logo" width={400} src={logo} alt="logo" />
      <Form className="register-form"
        noValidate>
        <Form.Group>
          <Form.Label>
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        {Object.keys(usernameErr).map((key) => {
          return (
            <div className="form-validation-error" key={key}>
              {usernameErr[key]}
            </div>
          );
        })}
        <Form.Group>
          <Form.Label>
            Create Password:
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {Object.keys(passwordErr).map((key) => {
          return (
            <div className="form-validation-error" key={key}>
              {passwordErr[key]}
            </div>
          );
        })}
        <Form.Group>
          <Form.Label>
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {Object.keys(emailErr).map((key) => {
          return (
            <div className="form-validation-error" key={key}>
              {emailErr[key]}
            </div>
          );
        })}
        <Form.Group>
          <Form.Label>
            Birthday:
          </Form.Label>
          <Form.Control
              type="date"
              name="birthday"
              value={birthday}
              placeholder="YYYY-MM-DD"
              onChange={(e) => setBirthday(e.target.value)}
            />
        </Form.Group>
        <Row>
          <Col className="reg-btns mt-1">
            <Button variant="link" href="/" >Back to login</Button>
          </Col>
          <Col className="reg-btns mt-1">
            <Button size="md" variant="primary" type="submit" ml="4" onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      BirthDate: PropTypes.date
  }),
  onRegister: PropTypes.func,
}
