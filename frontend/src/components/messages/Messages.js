import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import { getMessages } from '../../actions/message';

const Messages = ({ getMessages, message: { messages } }) => {
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <Fragment>
      <h1 className='page-header'>Messages</h1>
      <div className="messages">
        {messages.map(message => (
          <MessageItem key={message._id} message={message} />
        ))}
      </div>
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
