import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageItem from '../messages/MessageItem';
import { getMessage } from '../../actions/message';

const Message = ({ getMessage, message: { message, loading }, match }) => {
  useEffect(() => {
    getMessage(match.params.id);
  }, [getMessage, match.params.id]);

  return loading || message === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/messages" className="btn">
        Back To Messages
      </Link>
      <MessageItem message={message} showActions={false} />
    </Fragment>
  );
};

Message.propTypes = {
  getMessage: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  message: state.message
});

export default connect(mapStateToProps, { getMessage })(Message);
