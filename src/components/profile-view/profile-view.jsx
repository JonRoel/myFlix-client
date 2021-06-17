import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    const { users, onBackClick } = this.props;
    return (
      <>
        <Row  className="text-white">
         <h2>Username: {`${users.Username}`}</h2>
         <p>Email: {users.Email}</p>
         <p>Birthday: {users.Birthday}</p>
         </Row>
      </>
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