import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions/message';

const MessageItem = ({
  deleteMessage,
  auth,
  message: { _id, subject, message, user, date, },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <p className='my-1'>{subject}</p>
      <p className='my-1'>{message}</p>
      <p className='post-date'>
        Messageed on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteMessage(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

MessageItem.defaultProps = {
  showActions: true
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
