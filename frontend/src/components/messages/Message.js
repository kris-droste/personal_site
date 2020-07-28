import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageItem from './MessageItem';
import { getMessage } from '../../actions/message';

const Message = ({ getMessage, message: { message, loading }, match }) => {
  useEffect(() => {
    getMessage(match.params.id);
  }, [getMessage, match.params.id]);

  return loading || message === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/messages" className="btn btn-secondary">
        Back To All Messages
      </Link>
      <MessageItem message={message} showActions={true} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  message: state.message
});

export default connect(mapStateToProps, { getMessage })(Message);
