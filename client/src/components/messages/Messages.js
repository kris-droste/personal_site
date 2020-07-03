import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/message';

const Messages = ({ getMessages, message: { messages } }) => {
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <Fragment>
      <h1 className="large text-primary">Messages</h1>
      <p className="lead">
        Work in Progress ...
      </p>
    </Fragment>
  );
};

Messages.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  message: state.message
});

export default connect(mapStateToProps, { getMessages })(Messages);
