import React, { thisState } from 'react';
import {Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <>
        <Row  className="text-white">
          <Col>
            <h2>Username: {`${this.props.user}`}</h2>
            <p>Email: {`${this.props.user.Email}`}</p>
            <p>Birthday: {`${user.Username}`}</p>
          </Col>
         </Row>
         <Row>
           <Col>
            <div>
              <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
            </div>
           </Col>
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