import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions/message';

const MessageItem = ({
  deleteMessage,
  auth,
  message: { _id, subject, senderName, senderEmail, content, date },
  showActions
}) => (
  <div className='message bg-white p-1 my-1'>
      <div>
        {!showActions && (
          <Link to={`/messages/${_id}`}>
            <button className='btn btn-success'>
              Read Message
            </button>
          </Link>
        )}
        <button
          onClick={() => deleteMessage(_id)}
          className='btn btn-danger'
        >
          Delete Message
        </button>
    </div>
      <div>
      <p className='my-1'>Subject: {subject}</p>
      <p className='my-1'>Sender: {senderName}</p>
      <p className='my-1'>Sender's Email: {senderEmail}</p>
      <p className=''>Date Sent: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
      {showActions && (
        <Fragment>
          <p>{content}</p>
        </Fragment>
      )}
    </div>
  </div>
);

MessageItem.defaultProps = {
  showActions: false
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteMessage }
)(MessageItem);
