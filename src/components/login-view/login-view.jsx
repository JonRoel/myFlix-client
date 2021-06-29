import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from 'url:../../../public/myflix-logo.png';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-jonathon.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      alert('Wrong Email or Password')
    });
  };

  return (
    <div className="login-wrapper">
      <img className="myFlix-logo" width={400} src={logo} alt="logo" />
      <Form className="login-form">
        <Form.Group controleid="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <div className="d-grid gap-2">
        <Button variant="primary" type="submit" size="lg" onClick={handleSubmit}>Sign In</Button>
        <hr data-content="Or" className="hr-text" />
        <Button href="/register" variant="secondary" size="lg">Register here</Button>
        </div>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
};
