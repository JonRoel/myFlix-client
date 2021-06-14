import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <>
        <Row  className="text-white">
         <h2>Username: {user.Username}</h2>
         <p>Email: {user.Email}</p>
         <p>Birthday: {user.Birthday}</p>
         </Row>
      </>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  })
};